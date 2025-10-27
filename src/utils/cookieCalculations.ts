import { buildings, Building } from "../constants/buildings";
import { upgrades, Upgrade } from "../constants/upgrades";
import { User } from "../types/user";

/**
 * Calculates the cost of a building based on how many the user owns
 * Formula: baseCost * (1.15 ^ owned)
 */
export const calculateBuildingCost = (building: Building, owned: number): number => {
  return Math.floor(building.baseCost * Math.pow(1.15, owned));
};

/**
 * Calculates the cookies per second (CpS) for a specific building
 */
export const calculateBuildingCps = (buildingId: string, owned: number, userUpgrades: string[]): number => {
  const building = buildings[buildingId];
  if (!building || owned === 0) return 0;

  let cps = building.baseCps * owned;
  
  // Apply building-specific upgrades
  const buildingUpgrades = userUpgrades
    .map(upgradeId => upgrades[upgradeId])
    .filter(upgrade => upgrade && upgrade.type === 'building' && upgrade.target === buildingId);
  
  for (const upgrade of buildingUpgrades) {
    if (upgrade.multiplier) {
      cps *= upgrade.multiplier;
    }
  }
  
  return cps;
};

/**
 * Calculates total cookies per second from all buildings
 */
export const calculateTotalCps = (userBuildings: { [key: string]: number }, userUpgrades: string[]): number => {
  let totalCps = 0;
  
  for (const [buildingId, owned] of Object.entries(userBuildings)) {
    totalCps += calculateBuildingCps(buildingId, owned, userUpgrades);
  }
  
  // Apply global multipliers
  const globalUpgrades = userUpgrades
    .map(upgradeId => upgrades[upgradeId])
    .filter(upgrade => upgrade && upgrade.type === 'global');
  
  for (const upgrade of globalUpgrades) {
    if (upgrade.multiplier) {
      totalCps *= upgrade.multiplier;
    }
  }
  
  return totalCps;
};

/**
 * Calculates cookies per click based on upgrades and CpS
 */
export const calculateCookiesPerClick = (
  baseCookiesPerClick: number, 
  cps: number, 
  userUpgrades: string[],
  userBuildings: { [key: string]: number }
): number => {
  let cookiesPerClick = baseCookiesPerClick;
  
  // Apply clicking upgrades that give % of CpS
  const clickingUpgrades = userUpgrades
    .map(upgradeId => upgrades[upgradeId])
    .filter(upgrade => upgrade && upgrade.type === 'clicking' && upgrade.clickMultiplier);
  
  for (const upgrade of clickingUpgrades) {
    if (upgrade.clickMultiplier) {
      cookiesPerClick += cps * upgrade.clickMultiplier;
    }
  }
  
  // Special finger upgrades (Thousand Fingers, Million Fingers)
  if (userUpgrades.includes('thousandFingers')) {
    const nonCursorBuildings = Object.entries(userBuildings)
      .filter(([buildingId]) => buildingId !== 'cursor')
      .reduce((sum, [, amount]) => sum + amount, 0);
    cookiesPerClick += nonCursorBuildings * 0.1;
  }
  
  if (userUpgrades.includes('millionFingers')) {
    const nonCursorBuildings = Object.entries(userBuildings)
      .filter(([buildingId]) => buildingId !== 'cursor')
      .reduce((sum, [, amount]) => sum + amount, 0);
    cookiesPerClick += nonCursorBuildings * 0.5;
  }
  
  return cookiesPerClick;
};

/**
 * Checks if an upgrade is available for purchase
 */
export const isUpgradeAvailable = (upgrade: Upgrade, user: User): boolean => {
  if (!upgrade.requirement) return true;
  
  const req = upgrade.requirement;
  
  // Check building requirement
  if (req.building && req.amount) {
    const owned = user.buildings[req.building] || 0;
    if (owned < req.amount) return false;
  }
  
  // Check cookies requirement
  if (req.cookies && user.totalCookies < req.cookies) {
    return false;
  }
  
  return true;
};

/**
 * Gets all available upgrades that haven't been purchased
 */
export const getAvailableUpgrades = (user: User): Upgrade[] => {
  return Object.values(upgrades)
    .filter(upgrade => 
      !user.upgrades.includes(upgrade.id) && 
      isUpgradeAvailable(upgrade, user)
    )
    .sort((a, b) => a.cost - b.cost);
};

/**
 * Updates user stats based on new cookie clicker mechanics
 */
export const updateUserStats = (user: User): User => {
  try {
    const buildings = user.buildings || {};
    const upgrades = user.upgrades || [];
    
    const cps = calculateTotalCps(buildings, upgrades);
    const cookiesPerClick = calculateCookiesPerClick(
      user.cookiesPerClick || 1, 
      cps, 
      upgrades, 
      buildings
    );
    
    return {
      ...user,
      cookiesPerSecond: cps,
      cookiesPerClick: cookiesPerClick,
      buildings: buildings,
      upgrades: upgrades,
      // Update legacy fields for compatibility
      perSecond: cps,
      multiplier: cookiesPerClick,
      points: user.cookies || user.points || 0,
      maxPoints: Math.max(user.totalCookies || 0, user.maxPoints || 0)
    };
  } catch (error) {
    console.error("Error updating user stats:", error);
    // Return user with safe defaults
    return {
      ...user,
      cookiesPerSecond: 0,
      cookiesPerClick: 1,
      buildings: user.buildings || {},
      upgrades: user.upgrades || [],
      perSecond: 0,
      multiplier: 1
    };
  }
};
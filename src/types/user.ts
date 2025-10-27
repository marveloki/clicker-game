/**
Represents the user profile data structure.
@interface
@property {string | null} name - The user's name.
@property {number} cookies - The user's total cookies (was points).
@property {number} totalCookies - Total cookies baked all time.
@property {number} clicks - The number of clicks the user has made.
@property {number} cookiesPerSecond - Base cookies per second from buildings.
@property {number} cookiesPerClick - Cookies gained per click.
@property {Object.<string, number>} buildings - Buildings owned by the user.
@property {string[]} upgrades - Purchased upgrades.
@property {string[]} achievements - The user's list of achieved achievements.
@property {number} newAchievements - The number of unread achievements.
@property {number} audioVolume - The user's audio volume level.
@property {Object.<string, Date>} dateAchievements - The dates when the user achieved each achievement.
*/

export interface User {
  name: string | null;
  profilePicture: string | null;
  createdAt: Date;
  cookies: number; // Current cookies (was points)
  totalCookies: number; // Total cookies baked all time
  clicks: number;
  cookiesPerSecond: number; // CpS from buildings
  cookiesPerClick: number; // Base cookies per click (usually 1)
  buildings: {
    [buildingId: string]: number;
  };
  upgrades: string[]; // Array of purchased upgrade IDs
  // Legacy fields for compatibility
  points: number; // Keep for backwards compatibility, will equal cookies
  maxPoints: number; // Keep for backwards compatibility
  multiplier: number; // Keep for backwards compatibility  
  perSecond: number; // Keep for backwards compatibility
  inventory: {
    [itemName: string]: number;
  }; // Keep old inventory for now
  achievements: string[];
  newAchievements: number;
  audioVolume: number;
  dateAchievements: {
    [achievementName: string]: Date;
  };
  quests: {
    daysCounter: number;
  };
}

/**
 * Represents an upgrade that can be purchased to improve buildings or clicking
 */
export interface Upgrade {
  id: string;
  name: string;
  cost: number;
  description: string;
  flavor: string;
  emoji: string;
  type: 'building' | 'clicking' | 'global';
  target?: string; // For building upgrades, which building it affects
  multiplier?: number; // Multiplier for building efficiency
  clickMultiplier?: number; // For clicking upgrades
  requirement?: {
    building?: string;
    amount?: number;
    cookies?: number;
  };
}

/**
 * Upgrades system inspired by Cookie Clicker
 */
export const upgrades: { [key: string]: Upgrade } = {
  // Cursor upgrades
  reinforcedIndex: {
    id: "reinforcedIndex",
    name: "Reinforced Index Finger",
    cost: 100,
    description: "The mouse and cursors are twice as efficient.",
    flavor: "prod prod",
    emoji: "👆",
    type: "building",
    target: "cursor",
    multiplier: 2,
    requirement: { building: "cursor", amount: 1 }
  },
  
  carpalTunnelPrevention: {
    id: "carpalTunnelPrevention",
    name: "Carpal Tunnel Prevention Cream",
    cost: 500,
    description: "The mouse and cursors are twice as efficient.",
    flavor: "it... it hurts to click...",
    emoji: "🧴",
    type: "building",
    target: "cursor",
    multiplier: 2,
    requirement: { building: "cursor", amount: 1 }
  },
  
  ambidextrous: {
    id: "ambidextrous",
    name: "Ambidextrous",
    cost: 10000,
    description: "The mouse and cursors are twice as efficient.",
    flavor: "Look ma, both hands!",
    emoji: "🙌",
    type: "building",
    target: "cursor",
    multiplier: 2,
    requirement: { building: "cursor", amount: 10 }
  },

  // Grandma upgrades
  forwardsFromGrandma: {
    id: "forwardsFromGrandma",
    name: "Forwards from Grandma",
    cost: 1000,
    description: "Grandmas are twice as efficient.",
    flavor: "RE:RE:RE: recipe for chocolate chips",
    emoji: "📧",
    type: "building",
    target: "grandma",
    multiplier: 2,
    requirement: { building: "grandma", amount: 1 }
  },
  
  steelPlatedRollingPins: {
    id: "steelPlatedRollingPins",
    name: "Steel-plated Rolling Pins",
    cost: 5000,
    description: "Grandmas are twice as efficient.",
    flavor: "Just what the doctor ordered.",
    emoji: "🔨",
    type: "building",
    target: "grandma",
    multiplier: 2,
    requirement: { building: "grandma", amount: 5 }
  },

  // Farm upgrades
  cheapHoes: {
    id: "cheapHoes",
    name: "Cheap Hoes",
    cost: 11000,
    description: "Farms are twice as efficient.",
    flavor: "Rake in the dough!",
    emoji: "🔨",
    type: "building",
    target: "farm",
    multiplier: 2,
    requirement: { building: "farm", amount: 1 }
  },
  
  fertilizer: {
    id: "fertilizer",
    name: "Fertilizer",
    cost: 55000,
    description: "Farms are twice as efficient.",
    flavor: "It's chocolate, we swear.",
    emoji: "💩",
    type: "building",
    target: "farm",
    multiplier: 2,
    requirement: { building: "farm", amount: 5 }
  },

  // Mine upgrades
  sugarGas: {
    id: "sugarGas",
    name: "Sugar Gas",
    cost: 120000,
    description: "Mines are twice as efficient.",
    flavor: "A pink, volatile gas, made of sweet, sweet sugar.",
    emoji: "💨",
    type: "building",
    target: "mine",
    multiplier: 2,
    requirement: { building: "mine", amount: 1 }
  },

  // Factory upgrades  
  sturdierConveyorBelts: {
    id: "sturdierConveyorBelts",
    name: "Sturdier Conveyor Belts",
    cost: 1300000,
    description: "Factories are twice as efficient.",
    flavor: "You're going places.",
    emoji: "⚙️",
    type: "building",
    target: "factory",
    multiplier: 2,
    requirement: { building: "factory", amount: 1 }
  },

  // Clicking upgrades
  plasticMouse: {
    id: "plasticMouse",
    name: "Plastic Mouse",
    cost: 50000,
    description: "Clicking gains +1% of your CpS.",
    flavor: "Slightly squeaky.",
    emoji: "🖱️",
    type: "clicking",
    clickMultiplier: 0.01,
    requirement: { cookies: 1000 }
  },
  
  ironMouse: {
    id: "ironMouse",
    name: "Iron Mouse",
    cost: 5000000,
    description: "Clicking gains +1% of your CpS.",
    flavor: "Click like it's 1349!",
    emoji: "⚒️",
    type: "clicking",
    clickMultiplier: 0.01,
    requirement: { cookies: 100000 }
  },
  
  titaniumMouse: {
    id: "titaniumMouse",
    name: "Titanium Mouse",
    cost: 500000000,
    description: "Clicking gains +1% of your CpS.",
    flavor: "Heavy, but powerful.",
    emoji: "⚡",
    type: "clicking",
    clickMultiplier: 0.01,
    requirement: { cookies: 10000000 }
  },

  // Global upgrades
  thousandFingers: {
    id: "thousandFingers",
    name: "Thousand Fingers",
    cost: 100000,
    description: "The mouse gains +0.1 cookies for each non-cursor object owned.",
    flavor: "clickety",
    emoji: "✋",
    type: "clicking",
    requirement: { building: "cursor", amount: 25 }
  },
  
  millionFingers: {
    id: "millionFingers",
    name: "Million Fingers", 
    cost: 10000000,
    description: "The mouse gains +0.5 cookies for each non-cursor object owned.",
    flavor: "clickety",
    emoji: "🙌",
    type: "clicking",
    requirement: { building: "cursor", amount: 50 }
  },

  // Cookie themed upgrades
  vanillaNebulaeCookies: {
    id: "vanillaNebulaeCookies",
    name: "Vanilla Nebulae",
    cost: 999999999,
    description: "Cookie production multiplier +10%.",
    flavor: "Vanilla light-years away.",
    emoji: "🌌",
    type: "global",
    multiplier: 1.1,
    requirement: { cookies: 100000000 }
  }
};

export default upgrades;
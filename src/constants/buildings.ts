/**
 * Represents a building that can be purchased in the Cookie on Base game.
 * Similar to Cookie Clicker's building system
 */
export interface Building {
  id: string;
  name: string;
  baseCost: number;
  baseCps: number; // Base cookies per second
  description: string;
  emoji: string;
  flavor: string; // Flavor text like original Cookie Clicker
}

/**
 * Buildings inspired by Cookie Clicker but with blockchain theme
 */
export const buildings: { [key: string]: Building } = {
  cursor: {
    id: "cursor",
    name: "Auto-Clicker",
    baseCost: 15,
    baseCps: 0.1,
    description: "Automatically clicks the cookie for you.",
    emoji: "👆",
    flavor: "A simple automated clicking device. Clicks once every 10 seconds."
  },
  
  grandma: {
    id: "grandma",
    name: "Cookie Grandma",
    baseCost: 100,
    baseCps: 1,
    description: "A nice grandma to bake more cookies.",
    emoji: "👵",
    flavor: "A kindly old lady who bakes cookies with love and blockchain technology."
  },
  
  farm: {
    id: "farm",
    name: "Cookie Farm",
    baseCost: 1100,
    baseCps: 8,
    description: "Grows cookie plants from cookie seeds.",
    emoji: "🚜",
    flavor: "Cookie plants are a wonder of nature. They grow in perfect blockchain formations."
  },
  
  mine: {
    id: "mine",
    name: "Cookie Mine",
    baseCost: 12000,
    baseCps: 47,
    description: "Mines out cookie dough and chocolate chips.",
    emoji: "⛏️",
    flavor: "Cookie mines go deep underground to find the rarest cookie ingredients."
  },
  
  factory: {
    id: "factory",
    name: "Cookie Factory",
    baseCost: 130000,
    baseCps: 260,
    description: "Produces large quantities of cookies.",
    emoji: "🏭",
    flavor: "Industrial-scale cookie production with blockchain-verified quality control."
  },
  
  bank: {
    id: "bank",
    name: "Cookie Bank",
    baseCost: 1400000,
    baseCps: 1400,
    description: "Generates cookies from cookie investments.",
    emoji: "🏦",
    flavor: "Cookies are a valuable currency. This bank generates cookies through interest."
  },
  
  temple: {
    id: "temple",
    name: "Cookie Temple",
    baseCost: 20000000,
    baseCps: 7800,
    description: "Full of precious, ancient chocolate.",
    emoji: "🏛️",
    flavor: "A temple dedicated to the Great Cookie God. Generates divine cookies."
  },
  
  wizardTower: {
    id: "wizardTower",
    name: "Wizard Tower",
    baseCost: 330000000,
    baseCps: 44000,
    description: "Summons cookies with magic spells.",
    emoji: "🔮",
    flavor: "Wizard towers use arcane blockchain magic to materialize cookies from thin air."
  },
  
  shipment: {
    id: "shipment",
    name: "Shipment",
    baseCost: 5100000000,
    baseCps: 260000,
    description: "Brings in fresh cookies from the cookie planet.",
    emoji: "🚀",
    flavor: "Ships travel to distant cookie planets to harvest exotic cookie varieties."
  },
  
  alchemyLab: {
    id: "alchemyLab",
    name: "Alchemy Lab",
    baseCost: 75000000000,
    baseCps: 1600000,
    description: "Turns gold into cookies!",
    emoji: "🧪",
    flavor: "Through ancient blockchain alchemy, base metals are transmuted into pure cookie gold."
  },
  
  portal: {
    id: "portal",
    name: "Cookie Portal",
    baseCost: 1000000000000,
    baseCps: 10000000,
    description: "Opens portals to the Cookie dimension.",
    emoji: "🌀",
    flavor: "Portals connect to parallel universes where cookies grow on trees."
  },
  
  timeMachine: {
    id: "timeMachine",
    name: "Time Machine",
    baseCost: 14000000000000,
    baseCps: 65000000,
    description: "Brings cookies from the past, before they were even eaten.",
    emoji: "⏰",
    flavor: "Time machines harvest cookies from the past using blockchain time-travel technology."
  },
  
  antimatterCondenser: {
    id: "antimatterCondenser",
    name: "Antimatter Condenser",
    baseCost: 170000000000000,
    baseCps: 430000000,
    description: "Condenses the antimatter in the universe into cookies.",
    emoji: "⚛️",
    flavor: "Antimatter condensers convert pure energy into delicious cookie matter."
  },
  
  prism: {
    id: "prism",
    name: "Prism",
    baseCost: 2100000000000000,
    baseCps: 2900000000,
    description: "Converts light itself into cookies.",
    emoji: "🔺",
    flavor: "Prisms split light into its component cookie wavelengths."
  },
  
  chancemaker: {
    id: "chancemaker",
    name: "Chancemaker",
    baseCost: 26000000000000000,
    baseCps: 21000000000,
    description: "Generates cookies from lucky accidents and serendipity.",
    emoji: "🎲",
    flavor: "Chancemakers harness the power of probability to manifest cookies from pure luck."
  },
  
  fractalEngine: {
    id: "fractalEngine",
    name: "Fractal Engine",
    baseCost: 310000000000000000,
    baseCps: 150000000000,
    description: "Turns cookies into more cookies through recursive mathematics.",
    emoji: "🔄",
    flavor: "Fractal engines use blockchain mathematics to create infinite cookie recursion."
  }
};
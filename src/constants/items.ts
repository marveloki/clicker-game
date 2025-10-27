/**
 * Represents an item that can be purchased in the Cookie on Base game.
 * @interface
 * @property {string} name - The name of the item.
 * @property {number} cost - The cost of the item in cookies.
 * @property {number} multiplier - The multiplier that the item applies to cookie production.
 * @property {number} perSecond - The amount of cookies produced per second by the item.
 * @property {string} description - A description of the item.
 * @property {string} [emoji] - An optional emoji representing the item.
 */
export interface Item {
  name: string;
  cost: number;
  multiplier: number;
  perSecond: number;
  description: string;
  emoji?: string;
}

/**
 * An object containing all the items that can be purchased in the game.
 * @constant
 * @type {Object<string, Item>}
 */
export const items: { [key: string]: Item } = {
  basicNode: {
    name: "Basic Node",
    cost: 20,
    multiplier: 0.5,
    perSecond: 2,
    description:
      "A basic blockchain node that doesn't mine many cookies, but is a good starting point for your network.",
    emoji: "💎",
  },

  validatorNode: {
    name: "Validator Node",
    cost: 100,
    multiplier: 1,
    perSecond: 5,
    description:
      "The backbone of any blockchain network, this validator works tirelessly to process transactions and secure the network.",
    emoji: "⚡",
  },

  smartContract: {
    name: "Smart Contract",
    cost: 200,
    multiplier: 2,
    perSecond: 10,
    description:
      "A self-executing contract that automatically processes cookie transactions and rewards.",
    emoji: "📜",
  },

  hardwareWallet: {
    name: "Hardware Wallet",
    cost: 1000,
    multiplier: 10,
    perSecond: 30,
    description:
      "A secure device that protects your cookies from hackers and malicious attacks.",
    emoji: "🔐",
  },

  masterNode: {
    name: "Master Node",
    cost: 2500,
    multiplier: 25,
    perSecond: 50,
    description:
      "The ruler of the network, the master node is responsible for coordinating all mining operations and maintaining network security.",
    emoji: "👑",
  },

  miningRig: {
    name: "Mining Rig",
    cost: 5000,
    multiplier: 50,
    perSecond: 100,
    description:
      "A powerful mining setup designed to generate cookies through computational power. Essential for network growth.",
    emoji: "⛏️",
  },

  cryptoExchange: {
    name: "Crypto Exchange",
    cost: 12500,
    multiplier: 75,
    perSecond: 180,
    description:
      "A digital marketplace that automatically trades cookies for maximum profit and liquidity.",
    emoji: "💱",
  },

  treasuryVault: {
    name: "Treasury Vault",
    cost: 20000,
    multiplier: 100,
    perSecond: 250,
    description:
      "A secure vault filled with cookies ready for staking and yield generation.",
    emoji: "🏛️",
  },

  quantumProcessor: {
    name: "Quantum Processor",
    cost: 100000,
    multiplier: 500,
    perSecond: 1000,
    description:
      "A quantum computing system that processes cookie transactions at unprecedented speeds.",
    emoji: "⚛️",
  },

  dataCenter: {
    name: "Data Center",
    cost: 500000,
    multiplier: 1000,
    perSecond: 2000,
    description:
      "A massive facility that houses hundreds of mining servers and network infrastructure.",
    emoji: "�",
  },

  liquidityPool: {
    name: "Liquidity Pool",
    cost: 1000000,
    multiplier: 2000,
    perSecond: 5000,
    description:
      "A special pool of cookies that provides liquidity and generates automatic yield through DeFi protocols.",
    emoji: "🌊",
  },

  satelliteNode: {
    name: "Satellite Node",
    cost: 2500000,
    multiplier: 3000,
    perSecond: 7500,
    description:
      "A space-based mining node that operates 24/7 with unlimited solar power, significantly boosting network efficiency.",
    emoji: "�️",
  },

  blockchainFortress: {
    name: "Blockchain Fortress",
    cost: 5000000,
    multiplier: 5000,
    perSecond: 10000,
    description:
      "A luxurious fortress with the most advanced security protocols, protecting the network from any attacks.",
    emoji: "🏰",
  },

  miningFarm: {
    name: "Mining Farm",
    cost: 10000000,
    multiplier: 7500,
    perSecond: 15000,
    description:
      "A massive collection of mining rigs used for industrial-scale cookie production.",
    emoji: "🏭",
  },

  aiOptimizer: {
    name: "AI Optimizer",
    cost: 25000000,
    multiplier: 10000,
    perSecond: 20000,
    description:
      "An AI system that automatically optimizes mining operations and network efficiency.",
    emoji: "🤖",
  },

  superNode: {
    name: "Super Node",
    cost: 50000000,
    multiplier: 15000,
    perSecond: 30000,
    description:
      "A majestic node with ultimate processing power, known for its superior transaction throughput and golden connectivity.",
    emoji: "⚡",
  },

  diamondVault: {
    name: "Diamond Vault",
    cost: 100000000,
    multiplier: 25000,
    perSecond: 50000,
    description:
      "A vault made entirely of diamond-grade security, the ultimate symbol of cookie wealth and prestige.",
    emoji: "💎",
  },

  tokenExtractor: {
    name: "Token Extractor",
    cost: 500000000,
    multiplier: 50000,
    perSecond: 100000,
    description:
      "A device that extracts maximum value from the blockchain using advanced DeFi protocols.",
    emoji: "🔄",
  },
  blockchainObservatory: {
    name: "Blockchain Observatory",
    cost: 1000000000,
    multiplier: 150000,
    perSecond: 350000,
    description:
      "An advanced blockchain observatory with AI analytics and real-time monitoring for optimal network performance.",
    emoji: "🔭",
  },
  cryptoMuseum: {
    name: "Crypto Museum",
    cost: 5000000000,
    multiplier: 750000,
    perSecond: 1500000,
    description:
      "A place that showcases the history, culture, and evolution of blockchain technology and cookies.",
    emoji: "🏛️",
  },
  baseStatue: {
    name: "Base Monument",
    cost: 10000000000,
    multiplier: 2000000,
    perSecond: 4000000,
    description:
      "A monument made of pure digital gold that represents the ultimate achievement in Base blockchain mastery.",
    emoji: "🗽",
  },
  developerNode: {
    name: "Developer Node",
    cost: 50000000000,
    multiplier: 10000000,
    perSecond: 250000000,
    description:
      "A highly skilled development node that codes smart contracts in Solidity, JavaScript, React, TypeScript, and more. It has a strong background in Web3 development.",
    emoji: "�‍💻",
  },
};

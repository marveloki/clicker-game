import { User } from "../types/user";
/**
 * The default user profile object.
 * @type {User}
 */
export const defaultUserProfile: User = {
  name: null,
  createdAt: new Date(),
  profilePicture: null,
  cookies: 0,
  totalCookies: 0,
  clicks: 0,
  cookiesPerSecond: 0,
  cookiesPerClick: 1,
  buildings: {},
  upgrades: [],
  // Legacy compatibility fields
  points: 0,
  maxPoints: 0,
  multiplier: 1,
  perSecond: 1,
  inventory: {},
  achievements: [],
  newAchievements: 0,
  audioVolume: 0.5,
  dateAchievements: {},
  quests: {
    daysCounter: 0,
  },
};

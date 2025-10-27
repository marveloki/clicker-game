import { useEffect } from "react";
import { User } from "../types/user";
import { updateUserStats } from "../utils/cookieCalculations";

/**
 * Hook to migrate old save data to new Cookie Clicker system
 */
export const useMigrateSaveData = (
  userProfile: User,
  setUserProfile: React.Dispatch<React.SetStateAction<User>>
) => {
  useEffect(() => {
    try {
      // Ensure all required fields exist
      if (userProfile.name && (!userProfile.cookies && userProfile.cookies !== 0)) {
        console.log("Migrating save data to new Cookie Clicker system...");
        
        const migratedUser: User = {
          ...userProfile,
          cookies: userProfile.points || 0,
          totalCookies: userProfile.maxPoints || userProfile.points || 0,
          cookiesPerSecond: userProfile.perSecond || 0,
          cookiesPerClick: userProfile.multiplier || 1,
          buildings: userProfile.buildings || {},
          upgrades: userProfile.upgrades || [],
          // Keep legacy fields for compatibility
          points: userProfile.points || 0,
          maxPoints: userProfile.maxPoints || 0,
          multiplier: userProfile.multiplier || 1,
          perSecond: userProfile.perSecond || 0,
        };
        
        const finalUser = updateUserStats(migratedUser);
        setUserProfile(finalUser);
        
        console.log("Migration complete!");
      }
      // Just ensure stats are up to date for existing users
      else if (userProfile.name && userProfile.cookies !== undefined) {
        const updatedUser = updateUserStats(userProfile);
        // Only update if there are actual changes to prevent infinite loops
        if (updatedUser.cookiesPerSecond !== userProfile.cookiesPerSecond || 
            updatedUser.cookiesPerClick !== userProfile.cookiesPerClick) {
          setUserProfile(updatedUser);
        }
      }
    } catch (error) {
      console.error("Error in migration:", error);
      // If migration fails, ensure user has minimum required fields
      if (userProfile.name && !userProfile.cookies) {
        setUserProfile({
          ...userProfile,
          cookies: userProfile.points || 0,
          totalCookies: userProfile.maxPoints || 0,
          cookiesPerSecond: 0,
          cookiesPerClick: 1,
          buildings: {},
          upgrades: []
        });
      }
    }
  }, [userProfile.name]); // Only run when user logs in/out
};
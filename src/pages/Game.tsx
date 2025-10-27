import {
  CreateProfile,
  CookieClickerGame,
  VolumeSlider,
  Web3UserMenu,
  DonationFooter,
} from "../components";
import {
  Offline,
  ShareButton,
} from "../styles";
import { UserProfileProps } from "../types/userProfileProps";
import { Share, WifiOff } from "@mui/icons-material";
import { useOnlineStatus, useAutoSave, useWeb3GameData } from "../hooks";
import { useAppKitAccount } from '@reown/appkit/react';
import { useEffect } from 'react';

export const Game = ({ userProfile, setUserProfile }: UserProfileProps) => {
  const userProfileProps = { userProfile, setUserProfile };
  const isOnline = useOnlineStatus();
  const { isConnected } = useAppKitAccount();
  const { loadGameData } = useWeb3GameData();
  
  // Auto-save configurado
  useAutoSave({ userProfile, isConnected });

  // Auto-load quando conecta carteira
  useEffect(() => {
    if (isConnected) {
      const savedData = loadGameData();
      if (savedData) {
        setUserProfile({
          ...userProfile,
          cookies: savedData.cookies,
          totalCookies: savedData.totalCookies,
          clicks: savedData.clicks,
          cookiesPerSecond: savedData.cookiesPerSecond,
          cookiesPerClick: savedData.cookiesPerClick,
          buildings: savedData.buildings,
          upgrades: savedData.upgrades,
          achievements: savedData.achievements
        });
        console.log('🎮 Game progress auto-loaded from Base Sepolia');
      }
    }
  }, [isConnected]);

  const handleShareClick = async () => {
    try {
      await navigator.share({
        title: "Cookie on Base",
        text: "Blockchain-themed clicker game where you can earn cookies by clicking on the Base logo. Use your cookies to buy mining nodes and upgrade your network power.",
        url: window.location.href,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <>
      {userProfile.name === null ? (
        <CreateProfile {...userProfileProps} />
      ) : (
        <>
          <Web3UserMenu {...userProfileProps} />
          <VolumeSlider {...userProfileProps} />

          <ShareButton onClick={handleShareClick}>
            <Share /> &nbsp; Share
          </ShareButton>

          <CookieClickerGame {...userProfileProps} />
          <DonationFooter />
          {!isOnline && (
            <Offline>
              <WifiOff /> &nbsp; You're <span> offline </span> but you can still
              play the game!
            </Offline>
          )}
        </>
      )}
    </>
  );
};
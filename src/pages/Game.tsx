import {
  CreateProfile,
  CookieClickerGame,
  VolumeSlider,
} from "../components";
import {
  Offline,
  ShareButton,
} from "../styles";
import { UserProfileProps } from "../types/userProfileProps";
import { Share, WifiOff } from "@mui/icons-material";
import { useOnlineStatus } from "../hooks";

export const Game = ({ userProfile, setUserProfile }: UserProfileProps) => {
  const userProfileProps = { userProfile, setUserProfile };
  const isOnline = useOnlineStatus();

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
          <VolumeSlider {...userProfileProps} />

          <ShareButton onClick={handleShareClick}>
            <Share /> &nbsp; Share
          </ShareButton>

          <CookieClickerGame {...userProfileProps} />
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
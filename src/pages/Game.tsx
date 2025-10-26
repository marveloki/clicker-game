import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  CreateProfile,
  StatsInfo,
  Shop,
  BackToTop,
  VolumeSlider,
  Quests,
} from "../components";
import {
  ClickButton,
  ClickContainer,
  ClickImg,
  Offline,
  Points,
  ShareButton,
} from "../styles";
import { compactFormat, playSound, showToast } from "../utils";
import { achievements } from "../constants";
import "react-toastify/dist/ReactToastify.css";
import BaseLogo from "../assets/Logo-base.png";
import ClickSound from "../assets/sounds/click.mp3";
import { UserProfileProps } from "../types/userProfileProps";
import { Share, WifiOff } from "@mui/icons-material";
import { useOnlineStatus } from "../hooks";

// FloatingNumber component
const floatUp = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0px) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: translateY(-30px) scale(1.1);
  }
  100% {
    opacity: 0;
    transform: translateY(-60px) scale(0.9);
  }
`;

const FloatingNumberContainer = styled.div<{ x: number; y: number }>`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  pointer-events: none;
  z-index: 1000;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: ${floatUp} 2s ease-out forwards;
  user-select: none;
`;

const FloatingNumber = ({ value, x, y }: { value: number; x: number; y: number }) => (
  <FloatingNumberContainer x={x} y={y}>
    +{value}
  </FloatingNumberContainer>
);

export const Game = ({ userProfile, setUserProfile }: UserProfileProps) => {
  const userProfileProps = { userProfile, setUserProfile };
  const [clicks, setClicks] = useState<number>(userProfile.clicks);
  const [addedPoints, setAddedPoints] = useState<number>(0);
  const [showAddedPoints, setShowAddedPoints] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [floatingNumbers, setFloatingNumbers] = useState<Array<{
    id: number;
    value: number;
    x: number;
    y: number;
  }>>([]);
  const isOnline = useOnlineStatus();
  // Function to handle clicking on the logo
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Play click sound
    playSound(ClickSound, userProfile.audioVolume);
    // Add points based on user's multiplier
    handleAddPoints(userProfile.points + userProfile.multiplier);
    setAddedPoints(userProfile.multiplier);
    !showAddedPoints && setShowAddedPoints(true);

    // Calculate position for floating number relative to the container
    const target = event.currentTarget;
    const container = target.parentElement; // ClickContainer
    
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const x = event.clientX - containerRect.left + (Math.random() - 0.5) * 20;
      const y = event.clientY - containerRect.top + (Math.random() - 0.5) * 20;
      
      // Create floating number
      const newFloatingNumber = {
        id: Date.now() + Math.random(),
        value: userProfile.multiplier,
        x,
        y,
      };
      
      setFloatingNumbers(prev => [...prev, newFloatingNumber]);
      
      // Remove floating number after animation
      setTimeout(() => {
        setFloatingNumbers(prev => prev.filter(num => num.id !== newFloatingNumber.id));
      }, 2000);
    }

    // Increment click count
    setClicks(clicks + 1);
    //animation

    if (!isClicked) {
      setIsClicked(true);
      setTimeout(() => {
        setIsClicked(false);
      }, 150);
    }
    // Check for unlocked click achievements
    const unlockedClickAchievements = Object.values(achievements).filter(
      (achievement) =>
        achievement.clicksRequired !== undefined &&
        clicks + 1 >= achievement.clicksRequired &&
        !userProfile.achievements.includes(achievement.name)
    );
    // If there are unlocked click achievements, show toast notifications and update user profile
    if (unlockedClickAchievements.length > 0) {
      unlockedClickAchievements.forEach((achievement) => {
        showToast({
          header: `${achievement.name} unlocked!`,
          text: achievement.description,
          emoji: achievement.emoji,
          volume: userProfile.audioVolume,
        });
      });

      const newAchievements = userProfile.newAchievements + 1;
      // Add unlocked click achievements to user profile
      setUserProfile({
        ...userProfile,
        achievements: [
          ...userProfile.achievements,
          ...unlockedClickAchievements.map((achievement) => achievement.name),
        ],
        dateAchievements: {
          ...userProfile.dateAchievements,
          ...userProfile.dateAchievements,
          [unlockedClickAchievements[0].name]: new Date(),
        },
        newAchievements: newAchievements,
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShowAddedPoints(false);
    }, 250);
  }, [showAddedPoints]);

  // Function to add points to user's profile
  const handleAddPoints = (points: number) => {
    const newPoints = points;
    const newMaxPoints = Math.max(newPoints, userProfile.maxPoints);

    // Check for unlocked achievements
    const unlockedAchievements = Object.values(achievements).filter(
      (achievement) =>
        achievement.requirement !== undefined &&
        newMaxPoints >= achievement.requirement &&
        userProfile.maxPoints < achievement.requirement &&
        !userProfile.achievements.includes(achievement.name)
    );
    // If there are unlocked achievements, show toast notifications and update user profile
    if (unlockedAchievements.length > 0) {
      // Show toast notification for each unlocked achievement
      unlockedAchievements.forEach((achievement) => {
        showToast({
          header: `${achievement.name} unlocked!`,
          text: achievement.description,
          emoji: achievement.emoji,
          volume: userProfile.audioVolume,
        });
      });
      const newAchievements = userProfile.newAchievements + 1;
      // Add unlocked achievements to user profile
      setUserProfile({
        ...userProfile,
        points: newPoints,
        maxPoints: newMaxPoints,
        clicks: clicks,
        achievements: [
          ...userProfile.achievements,
          ...unlockedAchievements.map((achievement) => achievement.name),
        ],
        newAchievements: newAchievements,
        dateAchievements: {
          ...userProfile.dateAchievements,
          ...userProfile.dateAchievements,
          [unlockedAchievements[0].name]: new Date(),
        },
      });
    } else {
      setUserProfile({
        ...userProfile,
        points: newPoints,
        maxPoints: newMaxPoints,
        clicks: clicks,
      });
    }
  };

  useEffect(() => {
    if (userProfile.name !== null) {
      //Points per second interval
      const intervalId = setInterval(() => {
        const pointsPerSecond = (
          userProfile.points +
          userProfile.perSecond / 100
        ).toFixed(3);
        handleAddPoints(Number(pointsPerSecond));
      }, 10);

      return () => {
        clearInterval(intervalId);
      };
    }
  });

  useEffect(() => {
    document.title = `Base Clicker - ${compactFormat(userProfile.points)} $BClick`;
  }, [userProfile.points]);

  useEffect(() => {
    if (userProfile.name === null) {
      setClicks(0);
    }
  }, [userProfile]);

  const handleShareClick = async () => {
    //unlock share achievement
    const shareAchievementName = "ShareGameEnthusiast";
    const shareAchievement = achievements[shareAchievementName];
    const newAchievements = userProfile.newAchievements + 1;
    if (!userProfile.achievements.includes(shareAchievement.name)) {
      const updatedAchievements = [
        ...userProfile.achievements,
        shareAchievement.name,
      ];
      const updatedPoints =
        userProfile.points +
        (shareAchievement.reward ? shareAchievement.reward : 0);

      setUserProfile({
        ...userProfile,
        achievements: updatedAchievements,
        points: updatedPoints,
        newAchievements: newAchievements,

        dateAchievements: {
          ...userProfile.dateAchievements,
          ...userProfile.dateAchievements,
          [shareAchievement.name]: new Date(),
        },
      });
      showToast({
        header: `${shareAchievement.name} unlocked!`,
        text: (
          <span>
            {shareAchievement.description}{" "}
            {shareAchievement.reward && (
              <b>Reward: 🍯{shareAchievement.reward}</b>
            )}
          </span>
        ),
        emoji: shareAchievement.emoji,
        volume: userProfile.audioVolume,
      });
    }
    //share
    try {
      await navigator.share({
        title: "Base Clicker",
        text: "Blockchain-themed clicker game where you can earn $BClick tokens by clicking on the Base logo. Use your tokens to buy mining nodes and upgrade your network power.",
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

          <ClickContainer onTouchStart={(e) => e.preventDefault()}>
            <ClickButton
              aria-label="Base Logo"
              className={isClicked ? "clicked" : ""}
              onClick={handleClick}
              onTouchStart={(e) => e.preventDefault()}
            >
              <ClickImg
                draggable="false"
                src={BaseLogo}
                alt="Base Logo"
              />
            </ClickButton>
            {/* Floating Numbers */}
            {floatingNumbers.map((floatingNumber) => (
              <FloatingNumber
                key={floatingNumber.id}
                value={floatingNumber.value}
                x={floatingNumber.x}
                y={floatingNumber.y}
              />
            ))}
          </ClickContainer>

          {/* TODO: improve the animation of added points  */}
          {/* <Points show={showAddedPoints}>+{addedPoints}</Points> */}
          <StatsInfo userProfile={userProfile} />
          {/*TODO: Implement the quests component as it is not done yet. */}
          {/* <Quests {...userProfileProps} /> */}
          <Shop {...userProfileProps} />
          {!isOnline && (
            <Offline>
              <WifiOff /> &nbsp; You're <span> offline </span> but you can still
              play the game!
            </Offline>
          )}
          <BackToTop />
        </>
      )}
    </>
  );
};

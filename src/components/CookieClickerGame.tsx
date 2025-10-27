import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { UserProfileProps } from "../types/userProfileProps";
import { formatNumber, compactFormat } from "../utils";
import { buildings } from "../constants/buildings";
import { playSound } from "../utils";
import BuySound from "../assets/sounds/buy.mp3";
import BaseLogo from "../assets/Logo-base.png";

const GameContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: 
    radial-gradient(ellipse at top, #0052FF 0%, #001F8A 100%),
    linear-gradient(135deg, #000814 0%, #001D3D 50%, #003566 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(0, 82, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 70%);
    pointer-events: none;
    animation: pulse 4s ease-in-out infinite alternate;
  }
  
  @keyframes pulse {
    0% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const LeftPanel = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
`;

const RightPanel = styled.div`
  width: 320px;
  background: 
    linear-gradient(135deg, 
      rgba(255, 255, 255, 0.1) 0%, 
      rgba(255, 255, 255, 0.05) 100%
    );
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  padding: 24px;
  overflow-y: auto;
  max-height: 100vh;
  position: relative;
  z-index: 2;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(180deg, 
        rgba(0, 82, 255, 0.1) 0%, 
        transparent 50%, 
        rgba(255, 215, 0, 0.05) 100%
      );
    pointer-events: none;
  }
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 82, 255, 0.5);
    border-radius: 3px;
    
    &:hover {
      background: rgba(0, 82, 255, 0.7);
    }
  }
`;

const CookieButton = styled.button`
  width: 256px;
  height: 256px;
  border-radius: 50%;
  border: none;
  background: transparent;
  position: relative;
  cursor: pointer;
  transition: transform 0.1s;
  box-shadow: 0 8px 16px rgba(0,0,0,0.3);
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const Stats = styled.div`
  text-align: center;
  color: white;
  margin-top: 40px;
  background: 
    linear-gradient(135deg, 
      rgba(255, 255, 255, 0.15) 0%, 
      rgba(255, 255, 255, 0.05) 100%
    );
  backdrop-filter: blur(20px);
  padding: 24px 32px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  min-width: 280px;
  
  h2 {
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 16px 0;
    background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.5px;
  }
  
  p {
    font-size: 16px;
    margin: 8px 0;
    opacity: 0.9;
    font-weight: 500;
    
    &:first-of-type {
      font-size: 18px;
      color: #0052FF;
      font-weight: 600;
    }
    
    &:last-child {
      font-size: 14px;
      opacity: 0.7;
    }
  }
`;

const ShopTitle = styled.h3`
  color: white;
  text-align: center;
  margin: 0 0 24px 0;
  font-size: 24px;
  font-weight: 700;
  background: 
    linear-gradient(135deg, 
      rgba(255, 255, 255, 0.2) 0%, 
      rgba(255, 255, 255, 0.1) 100%
    );
  backdrop-filter: blur(15px);
  padding: 16px 20px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  position: relative;
  z-index: 1;
  letter-spacing: -0.5px;
  
  &::before {
    content: '🏪';
    margin-right: 8px;
    font-size: 20px;
  }
`;

const BuildingItem = styled.div<{ canAfford: boolean }>`
  background: ${props => props.canAfford ? 
    'linear-gradient(135deg, rgba(0, 82, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)' : 
    'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)'
  };
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.canAfford ? 'rgba(0, 82, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 12px;
  cursor: ${props => props.canAfford ? 'pointer' : 'not-allowed'};
  opacity: ${props => props.canAfford ? 1 : 0.6};
  transition: all 0.3s ease;
  box-shadow: ${props => props.canAfford ? 
    '0 4px 16px rgba(0, 82, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)' : 
    '0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
  };
  position: relative;
  z-index: 1;
  
  &:hover {
    background: ${props => props.canAfford ? 
      'linear-gradient(135deg, rgba(0, 82, 255, 0.3) 0%, rgba(255, 255, 255, 0.15) 100%)' : 
      'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)'
    };
    transform: ${props => props.canAfford ? 'translateY(-2px) scale(1.02)' : 'none'};
    box-shadow: ${props => props.canAfford ? 
      '0 8px 24px rgba(0, 82, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)' : 
      '0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    };
    border-color: ${props => props.canAfford ? 'rgba(0, 82, 255, 0.7)' : 'rgba(255, 255, 255, 0.2)'};
  }
  
  &:active {
    transform: ${props => props.canAfford ? 'translateY(0px) scale(0.98)' : 'none'};
  }
`;

const BuildingName = styled.div`
  color: white;
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BuildingInfo = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
`;

const BuildingPrice = styled.span`
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  font-size: 14px;
`;

const BuildingOwned = styled.span`
  background: 
    linear-gradient(135deg, 
      rgba(0, 82, 255, 0.8) 0%, 
      rgba(0, 82, 255, 0.6) 100%
    );
  backdrop-filter: blur(10px);
  padding: 4px 10px;
  border-radius: 20px;
  min-width: 28px;
  text-align: center;
  border: 1px solid rgba(0, 82, 255, 0.5);
  box-shadow: 
    0 2px 8px rgba(0, 82, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  font-weight: 700;
  color: white;
  font-size: 12px;
`;

export const CookieClickerGame = ({ userProfile, setUserProfile }: UserProfileProps) => {
  const [cookies, setCookies] = useState(0);
  const [totalCookies, setTotalCookies] = useState(0);
  const [cookiesPerSecond, setCookiesPerSecond] = useState(0);
  const [buildingsOwned, setBuildingsOwned] = useState<{[key: string]: number}>({});

  // Calculate cookies per second based on buildings
  useEffect(() => {
    let cps = 0;
    Object.entries(buildingsOwned).forEach(([buildingId, count]) => {
      const building = buildings[buildingId];
      if (building) {
        cps += building.baseCps * count;
      }
    });
    setCookiesPerSecond(cps);
  }, [buildingsOwned]);

  // Auto-generate cookies per second
  useEffect(() => {
    if (cookiesPerSecond > 0) {
      const interval = setInterval(() => {
        setCookies(prev => {
          const newCookies = prev + cookiesPerSecond / 10; // Update 10 times per second
          setTotalCookies(total => Math.max(total, newCookies));
          return newCookies;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [cookiesPerSecond]);

  const handleCookieClick = () => {
    playSound(BuySound, userProfile.audioVolume);
    setCookies(prev => {
      const newCookies = prev + 1;
      setTotalCookies(total => Math.max(total, newCookies));
      return newCookies;
    });
  };

  const buyBuilding = (buildingId: string) => {
    const building = buildings[buildingId];
    const owned = buildingsOwned[buildingId] || 0;
    const cost = Math.floor(building.baseCost * Math.pow(1.15, owned));
    
    if (cookies >= cost) {
      playSound(BuySound, userProfile.audioVolume);
      setCookies(prev => prev - cost);
      setBuildingsOwned(prev => ({
        ...prev,
        [buildingId]: (prev[buildingId] || 0) + 1
      }));
    }
  };

  const getBuildingCost = (buildingId: string) => {
    const building = buildings[buildingId];
    const owned = buildingsOwned[buildingId] || 0;
    return Math.floor(building.baseCost * Math.pow(1.15, owned));
  };

  return (
    <GameContainer>
      <LeftPanel>
        <CookieButton onClick={handleCookieClick}>
          <LogoImage src={BaseLogo} alt="Base Logo" draggable="false" />
        </CookieButton>
        <Stats>
          <h2>{compactFormat(Math.floor(cookies))} cookies</h2>
          <p>per second: {compactFormat(cookiesPerSecond)}</p>
          <p>Cookies earned (all time): {compactFormat(Math.floor(totalCookies))}</p>
        </Stats>
      </LeftPanel>
      
      <RightPanel>
        <ShopTitle>🏪 Store</ShopTitle>
        {Object.entries(buildings).slice(0, 8).map(([buildingId, building]) => {
          const cost = getBuildingCost(buildingId);
          const owned = buildingsOwned[buildingId] || 0;
          const canAfford = cookies >= cost;
          
          return (
            <BuildingItem
              key={buildingId}
              canAfford={canAfford}
              onClick={() => canAfford && buyBuilding(buildingId)}
            >
              <BuildingName>
                {building.emoji} {building.name}
              </BuildingName>
              <BuildingInfo>
                <div>
                  <div>🍪 {compactFormat(building.baseCps)}/sec</div>
                  <BuildingPrice>{compactFormat(cost)}</BuildingPrice>
                </div>
                <BuildingOwned>{owned}</BuildingOwned>
              </BuildingInfo>
            </BuildingItem>
          );
        })}
      </RightPanel>
    </GameContainer>
  );
};
import { useMemo } from "react";
import { UserProfileProps } from "../types/userProfileProps";
import {
  BuyButton,
  Container,
  Cost,
  Description,
  Header,
  ItemName,
  ItemWrapper,
} from "../styles";
import { buildings } from "../constants/buildings";
import BuySound from "../assets/sounds/buy.mp3";
import { formatNumber, playSound, showToast } from "../utils";
import { calculateBuildingCost, updateUserStats } from "../utils/cookieCalculations";
import { Tooltip } from "@mui/material";

export const BuildingShop = ({ userProfile, setUserProfile }: UserProfileProps) => {
  const descriptionMaxLength = 169;

  const handleBuyBuilding = (buildingId: string) => {
    playSound(BuySound, userProfile.audioVolume);
    const building = buildings[buildingId];
    const owned = userProfile.buildings[buildingId] || 0;
    const cost = calculateBuildingCost(building, owned);
    
    if (userProfile.cookies < cost) return;

    const newBuildings = { ...userProfile.buildings };
    newBuildings[buildingId] = owned + 1;
    
    const updatedUser = {
      ...userProfile,
      cookies: userProfile.cookies - cost,
      buildings: newBuildings,
      totalCookies: Math.max(userProfile.totalCookies, userProfile.cookies)
    };

    const finalUser = updateUserStats(updatedUser);
    setUserProfile(finalUser);

    if (owned === 0) {
      showToast({
        header: "New building unlocked!",
        text: `${building.name} ${building.emoji}`,
        emoji: "🔓",
        volume: userProfile.audioVolume,
      });
    }
  };

  const buildingEntries = useMemo(() => {
    return Object.entries(buildings).map(([buildingId, building]) => {
      const owned = userProfile.buildings[buildingId] || 0;
      const cost = calculateBuildingCost(building, owned);
      const canAfford = userProfile.cookies >= cost;
      
      return {
        buildingId,
        building,
        owned,
        cost,
        canAfford
      };
    });
  }, [userProfile.buildings, userProfile.cookies]);

  return (
    <div>
      <Header>🏪 Buildings</Header>
      <Container>
        {buildingEntries.map(({ buildingId, building, owned, cost, canAfford }) => (
          <ItemWrapper key={buildingId}>
            <ItemName>
              {building.emoji} {building.name}
            </ItemName>
            
            <Tooltip
              title={
                building.description.length > descriptionMaxLength
                  ? building.description
                  : building.flavor
              }
            >
              <Description>
                "{building.description}"
                <br />
                <em style={{ fontSize: '12px', opacity: 0.8 }}>
                  {building.flavor}
                </em>
              </Description>
            </Tooltip>

            <Cost enoughtPoints={canAfford}>
              Cost: 🍪{formatNumber(cost, 0)}
            </Cost>
            
            <p>Each produces: 🍪{formatNumber(building.baseCps, 1)}/sec</p>
            <p>You own: {formatNumber(owned, 0)}</p>
            {owned > 0 && (
              <p>Total production: 🍪{formatNumber(building.baseCps * owned, 1)}/sec</p>
            )}

            <BuyButton
              disabled={!canAfford}
              onClick={() => handleBuyBuilding(buildingId)}
            >
              {canAfford ? "Buy" : "Not Enough Cookies"}
            </BuyButton>
          </ItemWrapper>
        ))}
      </Container>
    </div>
  );
};
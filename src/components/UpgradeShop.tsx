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
import { formatNumber, playSound, showToast } from "../utils";
import { getAvailableUpgrades, updateUserStats } from "../utils/cookieCalculations";
import BuySound from "../assets/sounds/buy.mp3";
import { Tooltip } from "@mui/material";

export const UpgradeShop = ({ userProfile, setUserProfile }: UserProfileProps) => {
  const descriptionMaxLength = 169;

  const handleBuyUpgrade = (upgradeId: string) => {
    playSound(BuySound, userProfile.audioVolume);
    const availableUpgrades = getAvailableUpgrades(userProfile);
    const upgrade = availableUpgrades.find(u => u.id === upgradeId);
    
    if (!upgrade || userProfile.cookies < upgrade.cost) return;

    const updatedUser = {
      ...userProfile,
      cookies: userProfile.cookies - upgrade.cost,
      upgrades: [...userProfile.upgrades, upgradeId],
      totalCookies: Math.max(userProfile.totalCookies, userProfile.cookies)
    };

    const finalUser = updateUserStats(updatedUser);
    setUserProfile(finalUser);

    showToast({
      header: "Upgrade purchased!",
      text: `${upgrade.name} ${upgrade.emoji}`,
      emoji: "⬆️",
      volume: userProfile.audioVolume,
    });
  };

  const availableUpgrades = useMemo(() => {
    return getAvailableUpgrades(userProfile);
  }, [userProfile.buildings, userProfile.upgrades, userProfile.cookies, userProfile.totalCookies]);

  if (availableUpgrades.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Header>⬆️ Upgrades</Header>
        <p style={{ opacity: 0.7, fontSize: '18px' }}>
          No upgrades available right now. Keep playing to unlock more!
        </p>
      </div>
    );
  }

  return (
    <div>
      <Header>⬆️ Upgrades</Header>
      <Container>
        {availableUpgrades.slice(0, 6).map((upgrade) => { // Show max 6 upgrades at a time
          const canAfford = userProfile.cookies >= upgrade.cost;
          
          return (
            <ItemWrapper key={upgrade.id}>
              <ItemName>
                {upgrade.emoji} {upgrade.name}
              </ItemName>
              
              <Tooltip
                title={
                  upgrade.description.length > descriptionMaxLength
                    ? upgrade.description
                    : upgrade.flavor
                }
              >
                <Description>
                  "{upgrade.description}"
                  <br />
                  <em style={{ fontSize: '12px', opacity: 0.8 }}>
                    {upgrade.flavor}
                  </em>
                </Description>
              </Tooltip>

              <Cost enoughtPoints={canAfford}>
                Cost: 🍪{formatNumber(upgrade.cost, 0)}
              </Cost>
              
              <div style={{ fontSize: '14px', marginTop: '8px' }}>
                {upgrade.type === 'building' && upgrade.target && (
                  <p>Doubles {upgrade.target} efficiency</p>
                )}
                {upgrade.type === 'clicking' && upgrade.clickMultiplier && (
                  <p>Clicking gains +{(upgrade.clickMultiplier * 100).toFixed(1)}% of your CpS</p>
                )}
                {upgrade.type === 'global' && upgrade.multiplier && (
                  <p>+{((upgrade.multiplier - 1) * 100).toFixed(0)}% cookie production</p>
                )}
                {upgrade.id === 'thousandFingers' && (
                  <p>Mouse gains +0.1 cookies per non-cursor building</p>
                )}
                {upgrade.id === 'millionFingers' && (
                  <p>Mouse gains +0.5 cookies per non-cursor building</p>
                )}
              </div>

              <BuyButton
                disabled={!canAfford}
                onClick={() => handleBuyUpgrade(upgrade.id)}
              >
                {canAfford ? "Buy" : "Not Enough Cookies"}
              </BuyButton>
            </ItemWrapper>
          );
        })}
      </Container>
    </div>
  );
};
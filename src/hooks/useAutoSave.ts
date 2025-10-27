import { useEffect } from 'react';
import { useWeb3GameData } from './useWeb3GameData';
import { User } from '../types/user';

interface UseAutoSaveProps {
  userProfile: User;
  isConnected: boolean;
}

export const useAutoSave = ({ userProfile, isConnected }: UseAutoSaveProps) => {
  const { autoSaveGameData, loadGameData, enableAutoSave } = useWeb3GameData();

  // Auto-load quando conecta a carteira
  useEffect(() => {
    if (isConnected) {
      const savedData = loadGameData();
      if (savedData) {
        // Auto-load será implementado no componente pai
        console.log('Auto-load: Game data found for wallet');
      }
    }
  }, [isConnected, loadGameData]);

  // Configura auto-save
  useEffect(() => {
    if (!isConnected) return;

    const getGameState = () => ({
      cookies: userProfile.cookies,
      totalCookies: userProfile.totalCookies,
      clicks: userProfile.clicks,
      cookiesPerSecond: userProfile.cookiesPerSecond,
      cookiesPerClick: userProfile.cookiesPerClick,
      buildings: userProfile.buildings,
      upgrades: userProfile.upgrades,
      achievements: userProfile.achievements
    });

    // Configura auto-save automático
    const cleanup = enableAutoSave(getGameState);

    return cleanup;
  }, [isConnected, userProfile, enableAutoSave]);

  // Save imediato quando há mudanças significativas
  useEffect(() => {
    if (!isConnected) return;

    const saveImmediately = async () => {
      const gameState = {
        cookies: userProfile.cookies,
        totalCookies: userProfile.totalCookies,
        clicks: userProfile.clicks,
        cookiesPerSecond: userProfile.cookiesPerSecond,
        cookiesPerClick: userProfile.cookiesPerClick,
        buildings: userProfile.buildings,
        upgrades: userProfile.upgrades,
        achievements: userProfile.achievements
      };

      await autoSaveGameData(gameState);
    };

    // Debounce para evitar saves excessivos
    const timeoutId = setTimeout(saveImmediately, 2000);
    
    return () => clearTimeout(timeoutId);
  }, [
    userProfile.cookies,
    userProfile.totalCookies,
    userProfile.clicks,
    userProfile.buildings,
    userProfile.upgrades,
    userProfile.achievements,
    isConnected,
    autoSaveGameData
  ]);

  return {
    loadGameData,
    autoSaveGameData
  };
};
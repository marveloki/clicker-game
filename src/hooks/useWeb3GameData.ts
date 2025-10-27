import { useAppKitAccount } from '@reown/appkit/react';
import { toast } from 'react-toastify';
import { useState, useEffect, useCallback } from 'react';
import { createPublicClient, webSocket } from 'viem';
import { baseSepolia } from 'viem/chains';

interface GameData {
  address: string;
  cookies: number;
  totalCookies: number;
  clicks: number;
  cookiesPerSecond: number;
  cookiesPerClick: number;
  buildings: Record<string, number>;
  upgrades: string[];
  achievements: string[];
  lastSaved: number;
  signature?: string;
}

// Cliente RPC da Base Sepolia
const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: webSocket('wss://base-sepolia-rpc.publicnode.com')
});

export const useWeb3GameData = () => {
  const { address, isConnected } = useAppKitAccount();
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(0);

  // Gera a chave única para o usuário
  const getStorageKey = (userAddress: string) => `cookieGame_${userAddress.toLowerCase()}`;

  // Auto-save automático (sem assinatura)
  const autoSaveGameData = useCallback(async (gameData: Omit<GameData, 'address' | 'signature' | 'lastSaved'>) => {
    if (!address || !isConnected) return false;

    try {
      // Verifica se precisa salvar (evita saves desnecessários)
      const now = Date.now();
      if (now - lastSaveTime < 10000) return true; // Min 10s entre saves

      setIsSaving(true);
      
      // Verifica conexão com Base Sepolia via RPC
      const blockNumber = await publicClient.getBlockNumber();
      
      const finalData: GameData = {
        ...gameData,
        address: address.toLowerCase(),
        lastSaved: now,
        signature: `block_${blockNumber}` // Usa block number como timestamp de validação
      };

      // Salva no localStorage
      localStorage.setItem(getStorageKey(address), JSON.stringify(finalData));
      setLastSaveTime(now);
      
      return true;
    } catch (error) {
      console.error('Auto-save error:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [address, isConnected, lastSaveTime]);

  // Carrega dados do localStorage
  const loadGameData = (): GameData | null => {
    if (!address || !isConnected) return null;

    try {
      const storageKey = getStorageKey(address);
      const savedData = localStorage.getItem(storageKey);
      
      if (!savedData) return null;

      const gameData: GameData = JSON.parse(savedData);
      
      // Verifica se os dados são do endereço correto
      if (gameData.address?.toLowerCase() !== address.toLowerCase()) {
        return null;
      }

      return gameData;
    } catch (error) {
      console.error('Error loading game data:', error);
      return null;
    }
  };

  // Auto-save automático baseado em mudanças
  const enableAutoSave = useCallback((getGameState: () => Omit<GameData, 'address' | 'signature' | 'lastSaved'>) => {
    if (!isConnected) return;

    const interval = setInterval(async () => {
      if (isConnected && address) {
        const currentState = getGameState();
        await autoSaveGameData(currentState);
      }
    }, 15000); // Save a cada 15 segundos

    return () => clearInterval(interval);
  }, [isConnected, address, autoSaveGameData]);

  // Limpa dados salvos
  const clearGameData = () => {
    if (!address) return;
    
    localStorage.removeItem(getStorageKey(address));
    toast.info('Game data cleared');
  };

  // Migra dados do sistema antigo para Web3
  const migrateFromLegacyData = (legacyData: any) => {
    if (!address || !isConnected) return;

    const migratedData: Omit<GameData, 'address' | 'signature' | 'lastSaved'> = {
      cookies: legacyData.cookies || 0,
      totalCookies: legacyData.totalCookies || 0,
      clicks: legacyData.clicks || 0,
      cookiesPerSecond: legacyData.cookiesPerSecond || 0,
      cookiesPerClick: legacyData.cookiesPerClick || 1,
      buildings: legacyData.buildings || {},
      upgrades: legacyData.upgrades || [],
      achievements: legacyData.achievements || []
    };

    // Salva os dados migrados
    const dataWithTimestamp = {
      ...migratedData,
      address: address.toLowerCase(),
      lastSaved: Date.now()
    };

    localStorage.setItem(getStorageKey(address), JSON.stringify(dataWithTimestamp));
    toast.success('Game data migrated to Web3! 🚀');
  };

  return {
    autoSaveGameData,
    loadGameData,
    enableAutoSave,
    clearGameData,
    migrateFromLegacyData,
    isConnected,
    address,
    isSaving
  };
};
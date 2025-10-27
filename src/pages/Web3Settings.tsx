import React, { useEffect } from "react";
import { useAppKit, useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { useDisconnect, useBalance, useChainId } from 'wagmi';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
} from "@mui/material";
import {
  ArrowBack,
  AccountBalanceWallet,
  Language,
  Logout,
  ContentCopy,
  OpenInNew,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import { UserProfileProps } from "../types/userProfileProps";

const SettingsContainer = styled(Box)`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  color: white;
  padding: 2rem;
`;

const Header = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const BackButton = styled(IconButton)`
  background: rgba(0, 82, 255, 0.1);
  color: #0052ff;
  &:hover {
    background: rgba(0, 82, 255, 0.2);
  }
`;

const SettingsCard = styled(Card)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  margin-bottom: 1.5rem;
  
  .MuiCardContent-root {
    color: white;
  }
`;

const AddressBox = styled(Box)`
  background: rgba(0, 82, 255, 0.1);
  border: 1px solid rgba(0, 82, 255, 0.3);
  border-radius: 8px;
  padding: 12px;
  font-family: 'Courier New', monospace;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0;
`;

const LogoutDialog = styled(Dialog)`
  .MuiDialog-paper {
    background: #1a1a1a;
    color: white;
  }
`;

export const Settings: React.FC<UserProfileProps> = ({ userProfile, setUserProfile }) => {
  const navigate = useNavigate();
  const { isConnected, address } = useAppKitAccount();
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const [logoutDialog, setLogoutDialog] = React.useState(false);

  const { data: balance } = useBalance({
    address: address as `0x${string}`,
  });

  useEffect(() => {
    document.title = "Settings - Cookie on Base";
    if (!isConnected) {
      navigate("/");
    }
  }, [isConnected, navigate]);

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
  };

  const copyAddress = async () => {
    if (address) {
      try {
        await navigator.clipboard.writeText(address);
        toast.success('Address copied to clipboard!');
      } catch (error) {
        toast.error('Failed to copy address');
      }
    }
  };

  const openExplorer = () => {
    if (address) {
      let baseUrl = 'https://etherscan.io';
      
      switch (chainId) {
        case 8453: baseUrl = 'https://basescan.org'; break;
        case 84532: baseUrl = 'https://sepolia-explorer.base.org'; break;
        case 1: baseUrl = 'https://etherscan.io'; break;
        case 137: baseUrl = 'https://polygonscan.com'; break;
        case 42161: baseUrl = 'https://arbiscan.io'; break;
        case 10: baseUrl = 'https://optimistic.etherscan.io'; break;
        case 56: baseUrl = 'https://bscscan.com'; break;
        case 43114: baseUrl = 'https://snowtrace.io'; break;
        case 100: baseUrl = 'https://gnosisscan.io'; break;
        case 42220: baseUrl = 'https://celoscan.io'; break;
        case 534352: baseUrl = 'https://scrollscan.com'; break;
        default: baseUrl = 'https://etherscan.io';
      }
      
      window.open(`${baseUrl}/address/${address}`, '_blank');
    }
  };

  const handleLogout = () => {
    disconnect();
    setLogoutDialog(false);
    navigate("/");
    toast.info('Wallet disconnected');
  };

  const openWalletModal = () => {
    open();
  };

  const getNetworkName = () => {
    switch (chainId) {
      case 8453: return 'Base';
      case 84532: return 'Base Sepolia';
      case 1: return 'Ethereum';
      case 137: return 'Polygon';
      case 42161: return 'Arbitrum One';
      case 10: return 'Optimism';
      case 56: return 'BNB Smart Chain';
      case 43114: return 'Avalanche';
      case 100: return 'Gnosis Chain';
      case 42220: return 'Celo';
      case 534352: return 'Scroll';
      default: return `Chain ${chainId}`;
    }
  };

  if (!isConnected || !address) {
    return null;
  }

  return (
    <SettingsContainer>
      <Header>
        <BackButton onClick={() => navigate('/')}>
          <ArrowBack />
        </BackButton>
        <Typography variant="h4" fontWeight="bold">
          Web3 Settings
        </Typography>
      </Header>

      {/* Wallet Info */}
      <SettingsCard>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <AccountBalanceWallet color="primary" />
            <Typography variant="h6">Wallet Information</Typography>
          </Box>
          
          <Typography variant="body2" color="grey.400" gutterBottom>
            Connected Address
          </Typography>
          <AddressBox>
            <Typography variant="body1">
              {formatAddress(address)}
            </Typography>
            <Box display="flex" gap={1}>
              <IconButton size="small" onClick={copyAddress} sx={{ color: '#0052ff' }}>
                <ContentCopy fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={openExplorer} sx={{ color: '#0052ff' }}>
                <OpenInNew fontSize="small" />
              </IconButton>
            </Box>
          </AddressBox>

          {balance && (
            <>
              <Typography variant="body2" color="grey.400" gutterBottom mt={2}>
                Balance
              </Typography>
              <Typography variant="h6" color="#0052ff">
                {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
              </Typography>
            </>
          )}
        </CardContent>
      </SettingsCard>

      {/* Network Info */}
      <SettingsCard>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Language color="primary" />
            <Typography variant="h6">Network</Typography>
          </Box>
          
          <Box display="flex" alignItems="center" gap={2}>
            <Chip 
              label={getNetworkName()}
              color={chainId === 84532 ? "warning" : "primary"}
              variant="outlined"
            />
            {chainId === 84532 && (
              <Chip 
                label="TESTNET"
                color="warning"
                size="small"
                sx={{ fontSize: '0.7rem' }}
              />
            )}
            <Typography variant="body2" color="grey.400">
              Chain ID: {chainId}
            </Typography>
          </Box>
        </CardContent>
      </SettingsCard>



      {/* Actions */}
      <SettingsCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Actions
          </Typography>
          
          <Box display="flex" flexDirection="column" gap={2}>
            <Button
              variant="outlined"
              startIcon={<AccountBalanceWallet />}
              onClick={openWalletModal}
              fullWidth
              sx={{ 
                borderColor: '#0052ff', 
                color: '#0052ff',
                '&:hover': { 
                  borderColor: '#0041cc',
                  backgroundColor: 'rgba(0, 82, 255, 0.1)'
                }
              }}
            >
              Wallet Details
            </Button>
            
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
            
            <Button
              variant="outlined"
              color="error"
              startIcon={<Logout />}
              onClick={() => setLogoutDialog(true)}
              fullWidth
            >
              Disconnect Wallet
            </Button>
          </Box>
        </CardContent>
      </SettingsCard>

      <LogoutDialog
        open={logoutDialog}
        onClose={() => setLogoutDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Disconnect Wallet
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to disconnect your wallet? You'll be redirected to the landing page and will need to reconnect to continue playing.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setLogoutDialog(false)}
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            color="error"
            variant="contained"
          >
            Disconnect
          </Button>
        </DialogActions>
      </LogoutDialog>
    </SettingsContainer>
  );
};
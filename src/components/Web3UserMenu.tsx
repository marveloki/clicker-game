import React, { useState } from 'react';
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useDisconnect } from 'wagmi';
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import {
  AccountBalanceWallet,
  Logout,
  ContentCopy,
  Settings as SettingsIcon,
  EmojiEvents,
  Person,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import { UserProfileProps } from "../types/userProfileProps";
import { useWeb3GameData } from "../hooks";

const Web3AvatarContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
`;

const AddressContainer = styled(Box)`
  padding: 12px 16px;
  background: rgba(0, 82, 255, 0.1);
  border-radius: 8px;
  margin: 8px 0;
`;

const AddressText = styled(Typography)`
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  color: #0052ff;
  font-weight: 500;
`;

const LogoutDialog = styled(Dialog)`
  .MuiDialog-paper {
    background: #1a1a1a;
    color: white;
  }
`;

interface Web3UserMenuProps extends UserProfileProps {}

export const Web3UserMenu: React.FC<Web3UserMenuProps> = ({ userProfile, setUserProfile }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [logoutDialog, setLogoutDialog] = useState(false);
  const { isConnected, address } = useAppKitAccount();
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();
  const { loadGameData } = useWeb3GameData();

  const menuOpen = Boolean(anchorEl);

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
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
    setAnchorEl(null);
  };

  const handleLogout = () => {
    disconnect();
    setLogoutDialog(false);
    setAnchorEl(null);
    toast.info('Wallet disconnected');
  };

  const openWalletModal = () => {
    open();
    setAnchorEl(null);
  };



  if (!isConnected || !address) {
    return null;
  }

  return (
    <>
      <Web3AvatarContainer>
        <Avatar
          onClick={(event) => setAnchorEl(event.currentTarget)}
          sx={{
            width: 48,
            height: 48,
            backgroundColor: '#0052ff',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#0041cc',
              transform: 'scale(1.05)',
              boxShadow: '0 4px 20px rgba(0, 82, 255, 0.4)',
            }
          }}
        >
          <Person sx={{ fontSize: '1.5rem' }} />
        </Avatar>
      </Web3AvatarContainer>

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            backgroundColor: '#1a1a1a',
            color: 'white',
            border: '1px solid #333',
            minWidth: 280,
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ padding: 2 }}>
          <Typography variant="subtitle2" color="grey.400" gutterBottom>
            Connected Wallet
          </Typography>
          <AddressContainer>
            <AddressText>
              {formatAddress(address)}
            </AddressText>
          </AddressContainer>
        </Box>

        <Divider sx={{ borderColor: '#333' }} />

        <MenuItem onClick={copyAddress}>
          <ListItemIcon>
            <ContentCopy sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Copy Address" />
        </MenuItem>

        <MenuItem onClick={openWalletModal}>
          <ListItemIcon>
            <AccountBalanceWallet sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Wallet Details" />
        </MenuItem>

        <MenuItem onClick={() => navigate('/settings')}>
          <ListItemIcon>
            <SettingsIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>

        <Divider sx={{ borderColor: '#333' }} />

        <MenuItem 
          onClick={() => setLogoutDialog(true)}
          sx={{ color: '#ff4444' }}
        >
          <ListItemIcon>
            <Logout sx={{ color: '#ff4444' }} />
          </ListItemIcon>
          <ListItemText primary="Disconnect" />
        </MenuItem>
      </Menu>

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
            Are you sure you want to disconnect your wallet? You'll need to reconnect to continue playing.
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
    </>
  );
};
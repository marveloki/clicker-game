import React from 'react';
import styled from '@emotion/styled';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { ContentCopy, FavoriteRounded } from '@mui/icons-material';
import { toast } from 'react-toastify';

const DonationContainer = styled(Box)`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: rgba(0, 82, 255, 0.9);
  border: 1px solid rgba(0, 82, 255, 0.5);
  border-radius: 12px;
  padding: 12px;
  backdrop-filter: blur(10px);
  max-width: 280px;
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(0, 82, 255, 0.3);
  
  @media (max-width: 768px) {
    bottom: 10px;
    left: 10px;
    right: 10px;
    max-width: none;
    padding: 10px;
  }
`;

const DonationHeader = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const AddressContainer = styled(Box)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 6px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const AddressText = styled(Typography)`
  font-family: 'Courier New', monospace;
  color: white;
  font-size: 0.75rem;
  word-break: break-all;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const DonationAddress = "0x9310c837c24df470c1df55cc3af7cd161669bfba";

export const DonationFooter: React.FC = () => {
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(DonationAddress);
      toast.success('Donation address copied! 💙', {
        position: "bottom-left",
      });
    } catch (error) {
      toast.error('Failed to copy address');
    }
  };

  const formatAddress = (addr: string) => {
    if (window.innerWidth < 768) {
      return `${addr.slice(0, 10)}...${addr.slice(-8)}`;
    }
    return addr;
  };

  return (
    <DonationContainer>
      <DonationHeader>
        <FavoriteRounded sx={{ color: 'white', fontSize: '1rem' }} />
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'white', 
            fontWeight: 600,
            fontSize: '0.8rem'
          }}
        >
          Support Development
        </Typography>
      </DonationHeader>
      
      <AddressContainer>
        <AddressText>
          {formatAddress(DonationAddress)}
        </AddressText>
        <Tooltip title="Copy donation address">
          <IconButton 
            size="small" 
            onClick={copyAddress}
            sx={{ 
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <ContentCopy fontSize="small" />
          </IconButton>
        </Tooltip>
      </AddressContainer>
      
      <Typography 
        variant="caption" 
        sx={{ 
          color: 'rgba(255, 255, 255, 0.8)', 
          marginTop: '4px',
          display: 'block',
          fontSize: '0.65rem'
        }}
      >
        ETH/Base donations appreciated ✨
      </Typography>
    </DonationContainer>
  );
};
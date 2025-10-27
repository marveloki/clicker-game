import React from 'react';
import styled from 'styled-components';
import LogoBase from '../assets/Logo-base.png';

const LandingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #0a0a0a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  margin: 0;
  padding: 0;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const LogoImage = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 1rem;
  object-fit: contain;
`;

const BrandName = styled.h1`
  color: #0052ff;
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Subtitle = styled.h2`
  color: white;
  font-size: 1.8rem;
  font-weight: 400;
  margin: 2rem 0;
  text-align: center;
  max-width: 600px;
  line-height: 1.4;
`;

const ConnectButton = styled.button`
  background: #0052ff;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  min-width: 200px;

  &:hover {
    background: #0041cc;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 82, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

interface LandingPageProps {
  onConnect: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onConnect }) => {
  return (
    <LandingContainer>
      <LogoContainer>
        <LogoImage src={LogoBase} alt="Base Logo" />
        <BrandName>Cookie on Base</BrandName>
      </LogoContainer>
      
      <Subtitle>
        Build your cookie empire on Base
      </Subtitle>
      
      <ConnectButton onClick={onConnect}>
        Connect To Start
      </ConnectButton>
    </LandingContainer>
  );
};
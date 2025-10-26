import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

interface FloatingNumberProps {
  value: number;
  x: number;
  y: number;
  id: number;
  onAnimationComplete: (id: number) => void;
}

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

const FloatingNumberElement = styled.div<{ x: number; y: number }>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  color: #ffffff;
  font-size: 28px;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  pointer-events: none;
  z-index: 1000;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  animation: ${floatUp} 1.5s ease-out forwards;
  user-select: none;
  white-space: nowrap;
`;

export const FloatingNumber: React.FC<FloatingNumberProps> = ({
  value,
  x,
  y,
  id,
  onAnimationComplete
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationComplete(id);
    }, 1500);

    return () => clearTimeout(timer);
  }, [id, onAnimationComplete]);

  return (
    <FloatingNumberElement x={x} y={y}>
      +{value}
    </FloatingNumberElement>
  );
};
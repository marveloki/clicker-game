import { ReactNode } from "react";
import BaseLogo from "../assets/Logo-base.png";
import styled from "styled-components";
import { colorPalette } from "../styles";
import { Link } from "react-router-dom";

interface Props {
  children?: ReactNode;
}

/* FIXME: Some strange lines appear when hovering on other cards idk why 🙄 */

export const Navbar = ({ children }: Props) => {
  return (
    <>
      <Nav>
        <Link to="/">
          <LogoContainer>
            <LogoImage alt="logo" src={BaseLogo} />
            <LogoTxt>Cookie on Base</LogoTxt>
          </LogoContainer>
        </Link>
        {children}
      </Nav>
      <div style={{ paddingTop: "110px" }} />
    </>
  );
};

export const Nav = styled.nav`
  position: fixed;
  top: 0;

  width: 100%;
  background: #ffffffed;
  /* -webkit-backdrop-filter: blur(6px); */
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: "center";
  z-index: 2;
  user-select: none;
`;
const LogoContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LogoImage = styled.img`
  width: 72px;
  height: 72px;
  margin-left: 8vw;
  flex-shrink: 0;
  transition: 0.3s filter;
  @media (max-width: 768px) {
    margin-left: 8px;
  }
  ${LogoContainer}:hover > & {
    filter: drop-shadow(0px 0px 16px #1714dbff);
  }
`;

const LogoTxt = styled.p`
  font-size: 26px;
  color: ${colorPalette.baseBlue};
  font-weight: bold;
  text-shadow: 0px 0px 4px ${colorPalette.baseBlue};
  transition: 0.3s text-shadow;
  ${LogoContainer}:hover > & {
    text-shadow: 0px 0px 12px ${colorPalette.baseBlue};
  }
`;

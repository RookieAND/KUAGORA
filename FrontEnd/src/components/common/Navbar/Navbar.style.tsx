import styled, { css } from "styled-components";
import LogoSvg from "@/assets/icons/Logo.svg";

export const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      width: 1440px;
      height: 96px;

      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 32px 64px;

      position: sticky;
      top: 0px;
      z-index: 99;

      background-color: ${colors.mono.white};
    `;
  }}
`;

export const Logo = styled(LogoSvg)`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      color: ${colors.mono.black};
      font-weight: ${fonts.weight.bold};
      font-size: ${fonts.size.xxl};
      line-height: 48px;
    `;
  }}
`;

export const NavItemList = styled.ul`
  height: 24px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;

  list-style: none;
  padding: 0px;
  column-gap: 32px;
`;

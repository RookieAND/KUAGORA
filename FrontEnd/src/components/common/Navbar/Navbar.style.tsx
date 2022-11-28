import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      width: 100vw;
      height: 96px;

      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 32px 96px;

      background-color: ${colors.mono.white};
    `;
  }}
`;

export const Navigation = styled.ul`
  width: 1248px;
  height: 48px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  list-style: none;
  padding: 0px;
  gap: 16px;
`;

export const Logo = styled.li`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      height: 48px;

      color: ${colors.mono.black};
      font-weight: ${fonts.weight.bold};
      font-size: ${fonts.size.xxl};
      line-height: 48px;
    `;
  }}
`;

export const NavItemList = styled.ul`
  width: 200px;
  height: 32px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;

  list-style: none;
  padding: 0px;
  gap: 24px;
`;

export const NavItem = styled.li`
  width: 24px;
  height: 24px;
`;

import styled, { css } from "styled-components";
import { toolbarShow } from "@/constants/styles/animation";

interface StyledToolbarTempWrapper {
  theme: any;
  showTime: string;
}

export const Wrapper = styled.div<StyledToolbarTempWrapper>`
  ${({ theme, showTime }) => {
    const { colors } = theme;
    return css`
      width: 412px;
      margin: 0 0 0 auto;

      position: fixed;
      top: 128px;
      right: 96px;

      background-color: ${colors.mono.white};
      box-shadow: 0px 4px 3px ${colors.mono.gray4};
      border-radius: 8px;

      display: flex;
      justify-content: space-between;

      cursor: pointer;
      z-index: 1000;
      animation: ${showTime} ${toolbarShow};
    `;
  }}
`;

export const SideDecoration = styled.div`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      width: 24px;
      height: 100px;

      background-color: ${colors.main.pressed};
      border-radius: 8px 0px 0px 8px;
    `;
  }}
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;

  margin: auto;
`;

export const Title = styled.h5`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      margin: 0;

      color: ${colors.mono.gray7};
      font-size: ${fonts.size.lg};
      font-weight: ${fonts.weight.bold};
      text-align: left;
    `;
  }}
`;

export const SubTitle = styled.p`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      margin: 4px 0px 0px 0px;

      color: ${colors.mono.gray5};
      font-size: ${fonts.size.base};
      font-weight: ${fonts.weight.light};
      text-align: left;
    `;
  }}
`;

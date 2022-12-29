import styled, { css } from "styled-components";
import type { theme } from "@/constants/styles/theme";

interface StyledSocialButtonWrapperProps {
  backgroundColor: string;
}

interface StyledSocialButtonTextProps {
  textColor: string;
  theme: typeof theme;
}

export const Wrapper = styled.button<StyledSocialButtonWrapperProps>`
  ${({ backgroundColor }) => {
    return css`
      width: 360px;
      padding: 12px 64px;

      display: flex;

      background-color: ${backgroundColor};
      border-radius: 8px;
      margin: 7px;
      cursor: pointer;
    `;
  }}
`;

export const Icon = styled.div`
  margin: 0px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.div<StyledSocialButtonTextProps>`
  ${({ theme, textColor }) => {
    const { fonts } = theme;
    return css`
      margin: 0px auto;
      font-size: ${fonts.size.base};
      font-weight: ${fonts.weight.bold};
      color: ${textColor};
    `;
  }}
`;

import styled, { css } from "styled-components";

interface StyledAddedIsShowingProps {
  theme: any;
  isShowing: boolean;
}

export const Wrapper = styled.div<StyledAddedIsShowingProps>`
  ${({ theme, isShowing }) => {
    const { colors, fonts } = theme;
    return css`
      width: 120px;
      padding: 12px;
      margin: 0px;

      position: relative;

      border-radius: ${isShowing ? "12px 12px 0px 0px" : "12px"};
      background-color: #ffffff;
      align-self: center;

      border: 1px solid ${colors.mono.gray3};
      cursor: pointer;

      &::before {
        content: "⌵";
        position: relative;
        top: -1px;
        color: ${colors.main.pressed};
        font-size: ${fonts.size.base};
      }
    `;
  }}
`;

export const SelectedLabel = styled.label`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      margin-left: 8px;
      color: ${colors.mono.gray7};
      font-size: ${fonts.size.base};
      text-align: center;
    `;
  }}
`;

export const SelectList = styled.ul<StyledAddedIsShowingProps>`
  ${({ theme, isShowing }) => {
    return css`
      width: 120px;
      max-height: ${isShowing ? "none" : "0"};
      padding: 0;
      margin: 0;

      display: ${isShowing ? "block" : "none"};
      position: absolute;
      top: 45px;
      right: -1px;

      list-style: none;
      overflow: hidden;

      border: 1px solid ${theme.colors.mono.gray3};
      border-radius: 0px 0px 8px 8px;
      background-color: ${theme.colors.mono.white};
      color: ${theme.colors.mono.white};
    `;
  }}
`;

export const SelectOption = styled.li`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      color: ${colors.mono.gray7};
      font-size: ${fonts.size.base};
      text-align: center;

      color: ${colors.mono.gray7};
      font-size: ${fonts.size.base};
      padding: 6px 8px;
      transition: background-color 0.1s ease-in;

      &:hover {
        background-color: ${colors.mono.gray7}22;
      }
    `;
  }}
`;

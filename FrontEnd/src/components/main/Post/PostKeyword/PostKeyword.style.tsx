import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      height: 64px;
      margin: 16px 32px;
      padding: 0px 32px;

      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      gap: 8px;

      background-color: ${colors.mono.gray1};
    `;
  }}
`;

export const KeywordInput = styled.input`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      width: 27.5%;
      height: 36px;
      margin: auto 4px;

      background-color: transparent;
      border: none;

      color: ${colors.mono.gray7};
      font-weight: ${fonts.weight.normal};
      font-size: ${fonts.size.lg};
      text-align: left;
    `;
  }}
`;

export const Keyword = styled.span`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      padding: 6px 12px;
      margin: auto 0px;

      background-color: ${colors.main.opacity30};
      cursor: pointer;

      color: ${colors.main.pressed};
      font-size: ${fonts.size.lg};
      font-weight: ${fonts.weight.normal};
    `;
  }}
`;

import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      width: 800px;
      height: 48px;
      margin: 0px auto;

      display: flex;
      justify-content: space-between;

      background-color: ${colors.mono.white};
      border-radius: 16px;
    `;
  }}
`;

export const IconWrap = styled.div`
  width: 24px;
  height: 24px;
  margin: auto;
`;

export const SearchInput = styled.input`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      width: 732px;
      height: 36px;
      margin: auto;

      background-color: transparent;
      border: none;

      color: ${colors.mono.black};
      font-weight: ${fonts.weight.normal};
      font-size: ${fonts.size.base};
      text-align: center;
    `;
  }}
`;

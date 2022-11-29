import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 24px 96px;
      width: 100%;

      background-color: ${colors.main.pressed};
    `;
  }}
`;

export const AuthInfo = styled.h5`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      margin: 0;
      font-size: ${fonts.size.base};
      font-weight: ${fonts.weight.normal};
      color: ${colors.mono.white};
    `;
  }}
`;

export const AuthDetail = styled.p`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      margin: 4px 0px 0px 0px;
      font-size: ${fonts.size.sm};
      font-weight: ${fonts.weight.light};
      color: ${colors.mono.white};
    `;
  }}
`;

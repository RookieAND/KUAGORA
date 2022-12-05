import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      width: 1440px;
      padding: 48px 32px;
      margin: 0px auto;

      display: flex;
      flex-wrap: wrap;
      gap: 32px;

      background-color: ${colors.mono.gray2};
    `;
  }}
`;

export const NoticeEmpty = styled.div`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      padding: 48px 0px;
      margin: auto;
      text-align: center;

      h5 {
        margin: 0;
        color: ${colors.mono.gray7};
        font-size: ${fonts.size.xxl};
        font-weight: ${fonts.weight.bold};
      }

      p {
        margin: 0;
        color: ${colors.mono.gray5};
        font-size: ${fonts.size.lg};
        font-weight: ${fonts.weight.normal};
      }
    `;
  }}
`;

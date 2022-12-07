import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      gap: 32px;

      width: 100%;
      height: 100%;
      border-radius: 8px;

      background: ${colors.mono.white};
    `;
  }}
`;

export const Title = styled.h5`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      width: 100%;
      padding: 24px;
      margin: 0px 0px 8px 0px;

      color: ${colors.mono.black};
      font-weight: ${fonts.weight.normal};
      font-size: ${fonts.size.lg};
      text-align: left;
    `;
  }}
`;

export const BottomBox = styled.div`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      width: 100%;
      padding: 12px 24px;

      border-radius: 0px 0px 8px 8px;

      display: flex;
      justify-content: space-between;
      background-color: ${colors.mono.gray4};

      &.completed {
        background-color: ${colors.main.opacity60};
      }
    `;
  }}
`;

export const BottomContent = styled.div`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      display: flex;
      justify-content: space-between;

      svg {
        fill: ${colors.main.opacity60};
      }

      p {
        margin: 0px 0px 0px 4px;
        color: ${colors.mono.black};
        font-weight: ${fonts.weight.lg};
        font-size: ${fonts.size.base};
        line-height: 24px;
      }
    `;
  }}
`;

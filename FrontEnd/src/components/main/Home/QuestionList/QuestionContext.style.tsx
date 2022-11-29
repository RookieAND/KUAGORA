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
      padding: 24px;

      background: ${colors.mono.white};
      border-radius: 4px;
    `;
  }}
`;

export const Title = styled.h5`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      margin: 0px 0px 8px 0px;
      color: ${colors.mono.black};
      font-weight: ${fonts.weight.normal};
      font-size: ${fonts.size.base};
    `;
  }}
`;

export const BottomBox = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
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

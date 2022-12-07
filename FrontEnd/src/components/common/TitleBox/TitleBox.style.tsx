import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 64px 0px;
  margin: auto;
`;

export const Title = styled.h5`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      margin: 0px auto;

      font-weight: ${fonts.weight.bold};
      font-size: ${fonts.size.xxl};
      color: ${colors.main.pressed};
    `;
  }}
`;

export const SubTitle = styled.p`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      margin: 0px auto;

      font-weight: ${fonts.weight.light};
      font-size: ${fonts.size.lg};
      color: ${colors.main.normal};
    `;
  }}
`;

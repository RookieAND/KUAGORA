import styled, { css } from "styled-components";

export const Wrapper = styled.div`
    width: 100%,
    height: 864px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 64px 0px;
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

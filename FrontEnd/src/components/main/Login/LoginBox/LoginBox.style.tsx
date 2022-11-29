import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      width: 50%;
      padding: 96px 128px;

      display: flex;
      flex-direction: column;

      border: 32px solid ${colors.main.opacity30};
    `;
  }}
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
      margin: 0px auto 4px auto;

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

export const ButtonBox = styled.div`
  height: 196px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  width: 640px;
  padding: 64px 128px;

  display: flex;
  flex-direction: column;

  background-color: rgba(0, 0, 0, 0.5);
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 32px 0px;
`;

export const Title = styled.h5`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      margin: 0px auto 4px auto;

      font-weight: ${fonts.weight.bold};
      font-size: ${fonts.size.xxl};
      color: ${colors.mono.white};
    `;
  }}
`;

export const SubTitle = styled.p`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      margin: 0px auto;

      font-weight: ${fonts.weight.light};
      font-size: ${fonts.size.base};
      color: ${colors.mono.white};
    `;
  }}
`;

export const ButtonBox = styled.div`
  height: 256px;
  padding: 32px 0px 64px 0px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const BackMsg = styled.p`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      margin: 0px auto;
      cursor: pointer;

      font-weight: ${fonts.weight.light};
      font-size: ${fonts.size.base};
      color: ${colors.mono.white};
    `;
  }}
`;

import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 100%;
  margin: 0px auto;
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

export const QuestionBox = styled.div`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      display: grid;
      align-items: center;
      gap: 32px;
      padding: 64px;

      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(2, 1fr);

      width: 100%;
      height: 480px;

      background: ${colors.main.opacity30};
    `;
  }}
`;

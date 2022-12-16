import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 100%;
  margin: 0px auto;
`;

export const QuestionBox = styled.div`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      display: grid;
      align-items: center;
      gap: 32px;
      padding: 64px;

      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(2, 1fr);

      width: 100%;

      background: ${colors.mono.gray1}99;
    `;
  }}
`;

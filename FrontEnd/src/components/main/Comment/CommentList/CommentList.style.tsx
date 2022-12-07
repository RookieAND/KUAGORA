import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  padding: 16px 32px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
`;

export const TitleBox = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const AnswerMark = styled.span`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      color: ${colors.main.pressed};
      font-size: ${fonts.size.title};
      font-weight: ${fonts.weight.bold};
    `;
  }}
`;

export const Title = styled.h5`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      margin: 0px 0px 10px 0px;
      color: ${colors.mono.gray7};
      font-size: ${fonts.size.xxl};
      font-weight: ${fonts.weight.bold};
    `;
  }}
`;

export const Desc = styled.p`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      margin: 0;
      color: ${colors.mono.gray5};
      font-size: ${fonts.size.lg};
      font-weight: ${fonts.weight.light};
    `;
  }}
`;

export const CommentInfoBox = styled.div`
  width: 75%;
  margin: 0px;
  padding: 6px 4px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

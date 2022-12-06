import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  margin: auto 0px;
  padding: 64px 32px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const TitleBox = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const QuestionMark = styled.span`
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
      margin: 0;
      color: ${colors.mono.gray7};
      font-size: ${fonts.size.xxl};
      font-weight: ${fonts.weight.bold};
    `;
  }}
`;

export const AuthorBox = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const StateBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StateText = styled.span`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      margin-bottom: 4px;
      text-align: left;
      color: ${colors.mono.gray7};
      font-size: ${fonts.size.lg};
      font-weight: ${fonts.weight.normal};
    `;
  }}
`;

export const LikeButton = styled.button`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      margin: 32px 0px 0px 0px;
      padding: 8px;

      border: 0px;
      border-radius: 4px;
      background-color: ${colors.main.normal};
      box-shadow: 0px 4px 0px ${colors.main.pressed};

      text-align: center;
      color: ${colors.mono.white};
      font-size: ${fonts.size.lg};
      font-weight: ${fonts.weight.normal};
    `;
  }}
`;

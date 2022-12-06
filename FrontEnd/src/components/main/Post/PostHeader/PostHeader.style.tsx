import styled, { css, DefaultTheme } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  margin: auto 0px;
  padding: 16px 32px;

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

export const TitleInput = styled.input`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      width: 1000px;
      padding: 4px 32px;
      margin: 0px;

      background-color: ${colors.mono.gray1};
      border: none;

      color: ${colors.mono.gray7};
      font-size: ${fonts.size.xxl};
      font-weight: ${fonts.weight.bold};
    `;
  }}
`;

export const SubmitBox = styled.div`
  margin-top: auto;
`;

export const SubmitBtn = styled.button`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      width: 100%;
      padding: 10px 24px;
      margin: 0px auto 6px auto;

      border: 0px;
      border-radius: 12px;
      box-shadow: 0px 6px 1px ${colors.main.pressed};
      background-color: ${colors.main.normal};
      color: ${colors.mono.white};
      font-size: ${fonts.size.lg};
      font-weight: ${fonts.weight.bold};
      text-align: center;

      &:hover {
        margin: 0px auto 3px auto;
        box-shadow: 0px 3px 1px ${colors.main.pressed};
      }
    `;
  }}
`;

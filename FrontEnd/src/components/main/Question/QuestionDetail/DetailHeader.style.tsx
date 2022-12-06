import styled, { css, DefaultTheme } from "styled-components";

interface StyledIsCompletedProps {
  theme: any; // CHECK : 해결할 수 있는 방법 찾아야 함.
  state: "progressed" | "completed";
}

export const Wrapper = styled.div`
  width: 100%;
  margin: auto 0px;
  padding: 64px 32px 32px 32px;

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
  justify-content: space-between;
`;

export const StateBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StateText = styled.span`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      margin-bottom: 4px;
      text-align: left;
      color: ${colors.mono.gray7};
      font-size: ${fonts.size.base};
      font-weight: ${fonts.weight.normal};
    `;
  }}
`;

export const IsCompleteBox = styled.h5`
  ${({ theme, state }: StyledIsCompletedProps) => {
    const { colors, fonts } = theme;
    return css`
      padding: 10px 24px;
      margin: 0px auto;
      background-color: ${state == "progressed" ? theme.colors.mono.gray2 : theme.colors.main.opacity30};
      font-size: ${fonts.size.xl};
      color: ${state == "progressed" ? theme.colors.mono.gray6 : theme.colors.main.normal};
    `;
  }}
`;

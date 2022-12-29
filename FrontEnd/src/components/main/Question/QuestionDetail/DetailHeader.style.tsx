import styled, { css } from "styled-components";

interface StyledIsCompletedProps {
  theme: any; // CHECK : 해결할 수 있는 방법 찾아야 함.
  state: "progressed" | "completed";
}

interface StyledIsLikeProps {
  theme: any;
  isLike: boolean;
}

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

export const LikeBox = styled.div<StyledIsLikeProps>`
  ${({ theme, isLike }) => {
    const { colors } = theme;
    return css`
      width: 100%;
      padding: 4px 44px;
      margin: 8px auto;

      display: flex;
      justify-content: space-between;

      background-color: ${isLike ? colors.red.rose : colors.main.opacity30};
      color: ${isLike ? colors.mono.white : colors.main.normal};
      border-radius: 8px;
      cursor: pointer;

      svg,
      path {
        fill: ${isLike ? colors.mono.white : colors.main.normal};
        margin: auto 0px;
      }
    `;
  }}
`;

export const LikeText = styled.p`
  ${({ theme }) => {
    const { fonts } = theme;
    return css`
      margin: 4px 0px;
      font-size: ${fonts.size.lg};
      font-weight: ${fonts.weight.normal};
    `;
  }}
`;

export const IsCompleteBox = styled.h5`
  ${({ theme, state }: StyledIsCompletedProps) => {
    const { colors, fonts } = theme;
    return css`
      width: 100%;
      padding: 10px 0px;
      margin: 0px auto;

      background-color: ${state == "progressed" ? colors.mono.gray2 : colors.main.opacity30};
      font-size: ${fonts.size.xl};
      text-align: center;
      color: ${state == "progressed" ? colors.mono.gray6 : colors.main.normal};
    `;
  }}
`;

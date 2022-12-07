import styled, { css } from "styled-components";

interface StyledQuestionStateProps {
  theme: any;
  state: "progressed" | "completed";
}

export const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      width: 324px;
      height: 256px;

      background-color: ${colors.mono.white};
      border-radius: 8px;
      cursor: pointer;
    `;
  }}
`;

export const TopSection = styled.div`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      height: 75%;
      padding: 36px 28px 18px 28px;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      background-color: ${colors.mono.white};
      border-radius: 8px 8px 0px 0px;
    `;
  }}
`;

export const Title = styled.h5`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      margin: 0px;

      color: ${colors.mono.gray7};
      font-size: ${fonts.size.lg};
      font-weight: ${fonts.weight.bold};
    `;
  }}
`;

export const KeywordBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 8px;
`;

export const Keyword = styled.span<StyledQuestionStateProps>`
  ${({ theme, state }) => {
    const { colors, fonts } = theme;
    return css`
      padding: 2px 4px;
      margin: 0px;

      background-color: ${state == "completed" ? colors.main.opacity30 : colors.mono.gray2};

      color: ${state == "completed" ? colors.main.pressed : colors.mono.gray6};
      font-size: ${fonts.size.base};
      font-weight: ${fonts.weight.normal};
    `;
  }}
`;

export const StateText = styled.span<StyledQuestionStateProps>`
  ${({ theme, state }) => {
    const { colors, fonts } = theme;
    return css`
      width: 164px;
      padding: 2px;

      text-align: left;
      color: ${state == "completed" ? colors.main.pressed : colors.mono.gray6};
      font-size: ${fonts.size.base};
      font-weight: ${fonts.weight.bold};
    `;
  }}
`;

export const BottomSection = styled.div<StyledQuestionStateProps>`
  ${({ theme, state }) => {
    const { colors } = theme;
    return css`
      width: 100%;
      height: 25%;
      padding: 20px 28px;

      display: flex;
      justify-content: space-between;

      background-color: ${state == "progressed" ? colors.mono.gray4 : colors.main.opacity60};
      border-radius: 0px 0px 8px 8px;
    `;
  }}
`;

export const IconWrap = styled.div`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      width: 15%;
      display: flex;
      justify-content: space-between;

      p {
        margin: 0px 0px 0px 4px;
        color: ${colors.mono.black};
        font-weight: ${fonts.weight.lg};
        font-size: ${fonts.size.base};
        line-height: 24px;
      }
    `;
  }}
`;

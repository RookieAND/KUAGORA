import styled, { css } from "styled-components";

interface QuestionCardButtomProps {
  state: "progressed" | "completed";
}

export const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      width: 320px;
      height: 256px;

      background-color: ${colors.mono.white};
      border-radius: 8px;
    `;
  }}
`;

export const TopSection = styled.div`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      width: 100%;
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

export const StateText = styled.span`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      margin: auto 0px 0px auto;
      padding: 2px;

      text-align: right;
      color: ${colors.mono.gray7};
      font-size: ${fonts.size.base};
      font-weight: ${fonts.weight.normal};
    `;
  }}
`;

export const BottomSection = styled.div<QuestionCardButtomProps>`
  ${({ theme, state }) => {
    return css`
      width: 100%;
      height: 25%;
      padding: 20px 28px;

      display: flex;
      justify-content: space-between;

      background-color: ${state == "progressed"
        ? theme.colors.mono.gray4
        : theme.colors.main.opacity60};
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

      svg {
        fill: ${colors.mono.white};
      }

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

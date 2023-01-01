import styled, { css } from "styled-components";

interface StyledQuestionStateProps {
  theme: any;
  state: "progressed" | "completed";
}

export const Wrapper = styled.div`
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

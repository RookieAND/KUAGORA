import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  padding: 16px 32px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Content = styled.textarea`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      width: 100%;
      min-height: 330px;
      margin: 0px auto;
      padding: 32px;

      background-color: ${colors.mono.gray1}99;
      border: 0;

      color: ${colors.mono.gray7};
      font-size: ${fonts.size.lg};
      font-weight: ${fonts.weight.normal};
    `;
  }}
`;

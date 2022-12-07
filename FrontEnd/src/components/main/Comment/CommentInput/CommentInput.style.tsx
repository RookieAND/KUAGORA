import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      width: 75%;
      margin: 32px auto 32px 0px;
      padding: 6px 36px;

      display: flex;
      justify-content: space-between;

      background-color: ${colors.mono.gray3};
      border-radius: 24px;
    `;
  }}
`;

export const IconWrap = styled.div`
  width: 24px;
  height: 24px;

  svg {
    width: 24px;
    height: 24px;
  }

  margin: auto;
`;

export const CommentInput = styled.input`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      width: 98.5%;
      height: 48px;
      padding: 12px 36px;
      margin: auto;

      background-color: transparent;
      border: none;

      color: ${colors.mono.black};
      font-weight: ${fonts.weight.normal};
      font-size: ${fonts.size.base};
      text-align: left;
    `;
  }}
`;

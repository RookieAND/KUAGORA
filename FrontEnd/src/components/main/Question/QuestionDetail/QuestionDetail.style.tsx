import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  padding: 16px 32px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const KeywordBox = styled.div`
  margin: 0px 0px 32px 0px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 8px;
`;

export const Keyword = styled.span`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      padding: 4px 12px;
      margin: 0px;

      background-color: ${colors.main.opacity30};

      color: ${colors.main.pressed};
      font-size: ${fonts.size.lg};
      font-weight: ${fonts.weight.normal};
    `;
  }}
`;

export const Content = styled.pre`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      width: 100%;
      min-height: 330px;
      margin: 0px auto 96px auto;
      padding: 32px;

      background-color: ${colors.mono.gray1}99;

      color: ${colors.mono.gray7};
      font-size: ${fonts.size.lg};
      font-weight: ${fonts.weight.normal};
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

export const CommentBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      width: 836px;
      margin: 0px auto;
      padding: 6px 36px;

      display: flex;
      justify-content: space-between;

      background-color: ${colors.mono.gray3};
      border-radius: 24px;
    `;
  }}
`;

export const CommentInput = styled.input`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      width: 800px;
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

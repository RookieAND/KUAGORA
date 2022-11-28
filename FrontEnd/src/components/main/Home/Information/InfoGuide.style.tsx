import styled, { css } from "styled-components";
import { StaticImageData } from "next/image";

interface StyledInfoGuideImageProps {
  src: StaticImageData;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  width: 100%;
  height: 400px;
`;

export const Image = styled.div<StyledInfoGuideImageProps>`
  ${({ src }) => {
    return css`
      width: 50%;
      height: 400px;

      background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.25)),
        url(${src.src});
      background-size: cover;
    `;
  }}
`;

export const Text = styled.div`
  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

export const Title = styled.h5`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      margin: 0px 0px 16px 0px;
      color: ${colors.mono.black};
      font-weight: ${fonts.weight.bold};
      font-size: ${fonts.size.xxl};
    `;
  }}
`;

export const Desc = styled.pre`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      margin: 0;
      color: ${colors.mono.gray7};
      font-weight: ${fonts.weight.normal};
      font-size: ${fonts.size.lg};
      line-height: 32px;
    `;
  }}
`;

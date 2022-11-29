import { StaticImageData } from "next/image";
import styled, { css } from "styled-components";

interface StyledHeadlineWrapperProps {
  image: StaticImageData;
}

export const Wrapper = styled.div<StyledHeadlineWrapperProps>`
  ${({ image }) => {
    return css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 260px 80px;

      width: 50%;
      height: 720px;

      background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.45)),
        url(${image.src});
      background-size: cover;
    `;
  }}
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;

  margin: auto;
  text-align: left;
`;

export const MainText = styled.h5`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 0px 0px 8px 0px;
      padding: 0px;
      gap: 4px;

      color: ${colors.mono.white};
      font-weight: ${fonts.weight.bold};
      font-size: ${fonts.size.xxl};
    `;
  }}
`;

export const SubText = styled.p`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      margin: auto;
      padding: 0px;

      font-weight: ${fonts.weight.light};
      font-size: ${fonts.size.lg};

      color: ${colors.mono.white};
    `;
  }}
`;

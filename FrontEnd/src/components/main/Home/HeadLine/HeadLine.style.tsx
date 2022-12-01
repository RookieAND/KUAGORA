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
      gap: 48px;

      width: 100%;
      height: 700px;

      background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.25)),
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
`;

export const MainText = styled.h5`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 0px;
      padding: 0px;
      gap: 4px;

      color: ${colors.mono.white};
      font-weight: ${fonts.weight.bold};
      font-size: ${fonts.size.xxl};
      text-align: center;
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
      text-align: center;

      color: ${colors.mono.white};
    `;
  }}
`;

export const SubmitButton = styled.button`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      padding: 16px 16px;
      margin: auto;
      gap: 8px;

      width: 256px;
      height: 64px;

      color: ${colors.mono.white};
      background-color: ${colors.main.pressed};
      border-radius: 32px;

      text-align: center;
      font-size: 20px;
      font-weight: ${fonts.weight.bold};
    `;
  }}
`;

import styled, { css } from "styled-components";
import { modalShow } from "@/constants/styles/animation";

export const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      width: 480px;
      height: 256px;

      padding: 64px;
      margin: auto;

      background-color: ${colors.mono.white};
      border-radius: 16px;

      display: flex;
      flex-direction: column;
      animation: 0.3s ${modalShow};
    `;
  }}
`;

export const Title = styled.h5`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      margin: 0;

      color: ${colors.mono.gray7};
      font-size: ${fonts.size.lg};
      font-weight: ${fonts.weight.bold};
      text-align: center;
    `;
  }}
`;

export const SubTitle = styled.p`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      margin: 4px 0px 36px 0px;

      color: ${colors.mono.gray5};
      font-size: ${fonts.size.base};
      font-weight: ${fonts.weight.light};
      text-align: center;
    `;
  }}
`;

export const SubmitBtn = styled.button`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      width: 82.5%;
      padding: 8px;
      margin: 0px auto 6px auto;

      border: 0px;
      border-radius: 12px;
      box-shadow: 0px 6px 1px ${colors.main.pressed};
      background-color: ${colors.main.normal};
      color: ${colors.mono.white};
      font-size: ${fonts.size.lg};
      font-weight: ${fonts.weight.bold};
      text-align: center;

      &:hover {
        position: relative;
        top: 3px;
        box-shadow: 0px 3px 1px ${colors.main.pressed};
      }
    `;
  }}
`;

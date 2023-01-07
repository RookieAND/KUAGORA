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

      display: flex;
      flex-direction: column;
      justify-content: space-between;
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
      font-weight: ${fonts.weight.normal};
      text-align: center;
    `;
  }}
`;

export const SubmitBtn = styled.button`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      width: 90%;
      padding: 10px 24px;
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
        margin: 0px auto 3px auto;
        box-shadow: 0px 3px 1px ${colors.main.pressed};
      }
    `;
  }}
`;

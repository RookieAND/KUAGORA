import styled, { css } from "styled-components";

export const Wrapper = styled.div`
    width: 100%,
    height: 864px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Title = styled.h5`
  ${({ theme }) => {
    const { colors, fonts } = theme;
    return css`
      padding: 48px 0px;
      margin: 0px auto;

      font-weight: ${fonts.weight.bold};
      font-size: ${fonts.size.xxl};
      color: ${colors.main.normal};
    `;
  }}
`;

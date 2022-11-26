import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => {
    const { color, font } = theme;
    return css`
      display: flex;
      flex-direction: column;
    `;
  }}
`;

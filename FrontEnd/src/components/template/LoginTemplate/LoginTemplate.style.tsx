import styled, { css } from "styled-components";
import { StaticImageData } from "next/image";

interface StyledWrapperProps {
  image: StaticImageData;
}

export const Wrapper = styled.div`
  ${({ image }: StyledWrapperProps) => {
    return css`
      width: 100vw;
      height: 100vh;

      position: absolute;
      top: 0;
      left: 0;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.25)),
        url(${image.src});
      background-size: cover;
    `;
  }}
`;

export const Section = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

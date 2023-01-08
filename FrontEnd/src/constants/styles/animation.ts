import { keyframes } from "styled-components";

export const modalShow = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 10%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const modalBgShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  } 
`;

export const toolbarShow = keyframes`
  from {
    opacity: 0.25;
    transform: translate3d(20%, 0, 0);
  }
  80% {
    transform: translate3d(-10%, 0, 0);
  }
  90% {
    transform: translate3d(5%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const toolbarFinish = keyframes`
  from {
    opacity: 0.25;
    transform: translate3d(0%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(20%, 0, 0);
  }
`;

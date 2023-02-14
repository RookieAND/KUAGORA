import styled from "styled-components";
import { modalBgShow } from "@/constants/styles/animation";

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;

  overflow-y: scroll;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);
  animation: 0.25s ${modalBgShow};
`;

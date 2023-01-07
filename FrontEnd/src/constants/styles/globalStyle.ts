import { createGlobalStyle } from "styled-components";
import { modalBgShow } from "./animation";

export const GlobalStyle = createGlobalStyle`
    html,
    body {
    width: 1440px;
    padding: 0;
    margin: 0px auto;
    font-size: 62.5%;
    -webkit-text-size-adjust: none;
    min-width: 425px;
    }

    a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    }

    *,
    *:before,
    *:after {
    font-family: Pretendard;
    box-sizing: border-box;
    }

    :focus {
        outline: none;
        border: none;
    }
    ::-webkit-scrollbar {
        display: none;
    }

    button {
        background: none;
        padding: 0;
        border: none;
        cursor: pointer;
    }

    #modal_overlay {
        width: 100vw;
        height: 100vh;

        position: fixed;
        top: 0;
        left: 0;

        display: flex;
        flex-direction: column;
        justify-content: center;

        overflow-y: scroll;
        z-index: 99;
        background-color: rgba(0, 0, 0, 0.4);
        animation: 0.25s ${modalBgShow};
    }

`;

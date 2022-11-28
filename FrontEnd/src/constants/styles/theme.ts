import { DefaultTheme } from "styled-components";

export type ColorType = typeof colors;
export type FontType = typeof fonts;
export type DeviceType = typeof devices;

const colors = {
  mono: {
    white: "#FFFFFF",
    gray1: "#F5F5F5",
    gray2: "#EDEDED",
    gray3: "#E0E0E0",
    gray4: "#C2C2C2",
    gray5: "#9E9E9E",
    gray6: "#757575",
    gray7: "#616161",
    gray8: "#424242",
    black: "#1D1D1D"
  },
  main: {
    normal: "#036B29",
    pressed: "#044E1F"
  }
};

const fontWeight = {
  light: 100,
  normal: 400,
  bold: 700
};

const fontSize = {
  sm: "14px",
  base: "16px",
  lg: "18px",
  xl: "24px",
  xxl: "32px",
  title: "48px"
};

const fonts = {
  weight: fontWeight,
  size: fontSize
};

const devices = {
  mobile: `@media only screen and (max-width: 425px)`,
  tablet: `@media only screen and (max-width: 768px)`,
  desktop: `@media only screen and (max-width: 1440px)`
};

export const theme: DefaultTheme = {
  colors,
  fonts,
  devices
};

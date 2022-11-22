import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  fonts: {
    size: {
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "22px",
      xxl: "28px",
      title: "36px"
    },
    weight: {
      light: 100,
      normal: 400,
      bold: 700
    }
  },

  colors: {
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
    }
  },

  device: {
    mobile: `@media only screen and (max-width: 425px)`,
    tablet: `@media only screen and (max-width: 768px)`,
    desktop: `@media only screen and (max-width: 1440px)`
  }
};

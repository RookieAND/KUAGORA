import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fonts: {
      size: {
        sm: string;
        base: string;
        lg: string;
        xl: string;
        xxl: string;
        title: string;
      };
      weight: {
        light: number;
        normal: number;
        bold: number;
      };
    };

    colors: {
      white: string;
      mono: {
        white: string;
        gray1: string;
        gray2: string;
        gray3: string;
        gray4: string;
        gray5: string;
        gray6: string;
        gray7: string;
        gray8: string;
        black: string;
      };
    };

    device: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }
}

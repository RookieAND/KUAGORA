import "styled-components";
import { ColorType, DeviceType, FontType } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    fonts: FontType;
    colors: ColorType;
    device: DeviceType;
  }
}

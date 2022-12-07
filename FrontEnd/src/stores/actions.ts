import { atom } from "jotai";
import {
  userDataAtom,
  IUserData,
  IAccessToken,
  jwtTokenAtom,
  ITokenData
} from "./atoms";

export const accessTokenAtom = atom(
  get => {
    const curTokenAtom = get(jwtTokenAtom);
    return curTokenAtom.access_token;
  },
  (get, set, newAccessToken: IAccessToken) => {
    const prevTokenData = get(jwtTokenAtom);
    set(jwtTokenAtom, { ...prevTokenData, access_token: newAccessToken });
  }
);

export const refreshTokenAtom = atom(
  get => {
    const curTokenAtom = get(jwtTokenAtom);
    return curTokenAtom.refresh_token;
  },
  (get, set, newRefreshToken: IAccessToken) => {
    const prevTokenData = get(jwtTokenAtom);
    set(jwtTokenAtom, { ...prevTokenData, access_token: newRefreshToken });
  }
);

export const setJWTAtom = atom(
  get => get(jwtTokenAtom),
  (get, set, newJWTData: ITokenData) => {
    set(jwtTokenAtom, newJWTData);
  }
);

export const setUserDataAtom = atom(
  get => get(userDataAtom),
  (get, set, newUserData: IUserData) => {
    set(userDataAtom, newUserData);
  }
);

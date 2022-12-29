import { atom } from "jotai";
import type { IUserData, IAccessToken, ITokenData } from "./atoms";
import { userDataAtom, jwtTokenAtom } from "./atoms";

export const accessTokenAtom = atom(
  get => {
    const curTokenAtom = get(jwtTokenAtom);
    return curTokenAtom.accessToken;
  },
  (get, set, newAccessToken: IAccessToken) => {
    const prevTokenData = get(jwtTokenAtom);
    set(jwtTokenAtom, { ...prevTokenData, accessToken: newAccessToken });
  }
);

export const refreshTokenAtom = atom(
  get => {
    const curTokenAtom = get(jwtTokenAtom);
    return curTokenAtom.refreshToken;
  },
  (get, set, newRefreshToken: IAccessToken) => {
    const prevTokenData = get(jwtTokenAtom);
    set(jwtTokenAtom, { ...prevTokenData, accessToken: newRefreshToken });
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

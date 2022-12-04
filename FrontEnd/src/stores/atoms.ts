import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export interface IUserData {
  uuid: string | null;
  nickname: string | null;
  email: string | null;
}

export interface ITokenData {
  access_token: IAccessToken;
  refresh_token: IAccessToken;
}

export type IAccessToken = string | null;

export const userDataAtom = atom<IUserData>({
  uuid: null,
  nickname: null,
  email: null
});

export const jwtTokenAtom = atomWithStorage<ITokenData>("jwt_token", {
  access_token: null,
  refresh_token: null
});

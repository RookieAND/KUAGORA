import { atomWithStorage } from "jotai/utils";

export interface IUserData {
  uuid: string | null;
  nickname: string | null;
  email: string | null;
}

export interface ITokenData {
  accessToken: IAccessToken;
  refreshToken: IAccessToken;
}

export type IAccessToken = string | null;

export const userDataAtom = atomWithStorage<IUserData>("user_data", {
  uuid: null,
  nickname: null,
  email: null
});

export const jwtTokenAtom = atomWithStorage<ITokenData>("jwt_token", {
  accessToken: null,
  refreshToken: null
});

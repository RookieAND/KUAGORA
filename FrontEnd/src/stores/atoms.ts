import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export interface IUserData {
  uuid: string | null;
  nickname: string | null;
  email: string | null;
}

export type IAccessToken = string | null;

export const userDataAtom = atom<IUserData>({
  uuid: null,
  nickname: null,
  email: null
});

export const accessTokenAtom = atomWithStorage<IAccessToken>(
  "access_token",
  null
);

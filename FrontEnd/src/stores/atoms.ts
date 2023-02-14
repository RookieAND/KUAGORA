import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { ReactNode } from "react";

export interface IUserData {
  uuid: string | null;
  nickname: string | null;
  email: string | null;
}

export interface ITokenData {
  accessToken: IAccessToken;
  refreshToken: IAccessToken;
}

export interface ModalStateType {
  isOpen: boolean;
  content: ReactNode | null;
}

export interface ToolbarStateType {
  isOpen: boolean;
  timeOut: NodeJS.Timeout | null;
  content: ReactNode | null;
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

export const modalStateAtom = atom<ModalStateType>({
  isOpen: false,
  content: null
});

export const toolbarStateAtom = atom<ToolbarStateType>({
  isOpen: false,
  timeOut: null,
  content: null
});

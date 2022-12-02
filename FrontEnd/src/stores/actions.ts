import { atom } from "jotai";
import {
  userDataAtom,
  IUserData,
  IAccessToken,
  accessTokenAtom
} from "./atoms";

export const getAccessTokenAtom = atom(
  get => get(accessTokenAtom),
  (get, set, newToken: IAccessToken) => {
    set(accessTokenAtom, newToken);
  }
);

export const setUserDataAtom = atom(
  get => get(userDataAtom),
  (get, set, newUserData: IUserData) => {
    set(userDataAtom, newUserData);
  }
);

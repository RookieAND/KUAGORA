import { atom, AtomEffect, selector } from "recoil";

export interface IAccessTokenAtom {
  token: string | null;
}

export type IAccessToken = string | null;

/**
 * 로컬 스토리지에 저장된 토큰을 즉시 Atom에 업데이트하는 함수.
 * @param key 로컬 스토리지에 토큰을 저장한 key
 */
function localStorageEffect<T>(key: string): AtomEffect<T> {
  return ({ setSelf, onSet }) => {
    if (typeof window !== "undefined") {
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
      onSet((newValue: T, _, isReset: boolean) => {
        isReset
          ? localStorage.removeItem(key)
          : localStorage.setItem(key, JSON.stringify(newValue));
      });
    }
  };
}

export const accessTokenAtom = atom<IAccessTokenAtom>({
  key: "user/access_token",
  default: {
    token: null
  },
  effects: [localStorageEffect<IAccessTokenAtom>("token")]
});

export const accessTokenSelector = selector<string | null>({
  key: "user/get_access_token",
  get: async ({ get }) => {
    const accessToken = get(accessTokenAtom);
    return accessToken?.token;
  }
});

import { atom, AtomEffect, selector } from "recoil";

export interface IAuthState {
  token: string | null;
}

/**
 * 로컬 스토리지에 저장된 토큰을 즉시 Atom에 업데이트하는 함수.
 * @param key 로컬 스토리지에 토큰을 저장한 key
 */
function localStorageEffect<T>(key: string): AtomEffect<T> {
  return ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue: T, _, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
}

export const authStateAtom = atom<IAuthState>({
  key: "user/auth",
  default: {
    token: null
  },
  effects: [localStorageEffect<IAuthState>("token")]
});

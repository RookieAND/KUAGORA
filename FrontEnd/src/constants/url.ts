export const PATH_INFO = {
  main: "/",
  question: "/questions",
  write: "/write",
  login: "/login",
  logout: "/logout"
} as const;

export type PathNameType = typeof PATH_INFO[keyof typeof PATH_INFO];

export const PATH_INFO = {
  main: "/",
  question: "/question",
  profile: "/profile",
  login: "/login"
} as const;

export type PathNameType = typeof PATH_INFO[keyof typeof PATH_INFO];

const SEARCH_OPTION: SelectInfoType[] = [
  {
    option: "title",
    display: "제목 별"
  },
  {
    option: "keyword",
    display: "키워드 별"
  }
];

const SORT_OPTION: SelectInfoType[] = [
  {
    option: "recent",
    display: "최신 순"
  },
  {
    option: "popular",
    display: "인기 순"
  }
];

const ANSWERED_OPTION: SelectInfoType[] = [
  {
    option: "both",
    display: "전체"
  },
  {
    option: "progressed",
    display: "미채택"
  },
  {
    option: "completed",
    display: "채택됨"
  }
];

export const SELECT_INFO = {
  search: SEARCH_OPTION,
  sort: SORT_OPTION,
  answered: ANSWERED_OPTION
};

export type SelectType = keyof typeof SELECT_INFO;
export type SelectOptionsType = typeof SELECT_INFO[keyof typeof SELECT_INFO];

export interface SelectInfoType {
  option: string;
  display: string;
}

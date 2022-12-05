import * as style from "./QuestionSearch.style";

import SearchSvg from "@/assets/icons/Search.svg";

const QuestionSearch = () => {
  return (
    <style.Wrapper>
      <style.IconWrap>
        <SearchSvg />
      </style.IconWrap>
      <style.SearchInput
        placeholder="검색어를 입력해주세요."
        maxLength={30}
        minLength={1}
      />
    </style.Wrapper>
  );
};

export default QuestionSearch;

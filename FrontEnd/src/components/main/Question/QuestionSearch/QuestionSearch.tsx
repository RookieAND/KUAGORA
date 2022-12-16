import { useRouter } from "next/router";
import { useState } from "react";
import { SelectType } from "@/constants/search";

import * as style from "./QuestionSearch.style";
import SearchSvg from "@/assets/icons/Search.svg";

import SearchOptionSelect from "@/components/main/Question/QuestionSearch/SearchOptionSelect";

interface QuestionSearchProps {
  searchedQuery: string;
}

const QuestionSearch = ({ searchedQuery }: QuestionSearchProps) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(searchedQuery);

  // 검색 Input 내의 Value를 새롭게 업데이트 하는 함수
  const changeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.trim());
  };

  // Input에 입력된 query를 통해 검색된 결과 페이지로 이동하는 함수
  const searchQuestions = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter" && searchQuery.length > 1) {
      // query 맨 앞에 # 가 있다면, 키워드 검색을 의미하므로 이를 적용해야 함.
      const searchOption = searchQuery.charAt(0) === "#" ? "keyword" : "title";

      // 검색 결과 페이지로 이동 (키워드의 경우 맨 앞의 # 를 제거하고 쿼리로 넘김)
      router.push({
        pathname: "/search",
        query: { query: searchQuery.slice(searchOption === "keyword" ? 1 : 0), search: searchOption }
      });
    }
  };

  // 특정 정렬 옵션이 변경되었을 경우, 이를 filter state에 업데이트 하는 함수
  const changeSearchFilter = (option: SelectType, value: string) => {
    router.push({
      query: { ...router.query, [option]: value }
    });
  };

  return (
    <style.Wrapper>
      <SearchOptionSelect selectType="sort" changeSearchFilter={changeSearchFilter} />
      <SearchOptionSelect selectType="answered" changeSearchFilter={changeSearchFilter} />
      <style.SearchBar>
        <style.IconWrap>
          <SearchSvg />
        </style.IconWrap>
        <style.SearchInput
          value={searchQuery}
          onChange={changeSearchInput}
          onKeyDown={searchQuestions}
          placeholder="텍스트를 입력해주세요. (2글자 이상)"
          maxLength={30}
          minLength={1}
        />
      </style.SearchBar>
    </style.Wrapper>
  );
};

export default QuestionSearch;

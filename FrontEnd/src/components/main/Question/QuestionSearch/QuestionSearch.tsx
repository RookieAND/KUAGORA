import { useRouter } from "next/router";
import { QuestionSearchType, QuestionSortType } from "@/apis/question";
import { SelectType } from "@/constants/search";

import * as style from "./QuestionSearch.style";
import SearchSvg from "@/assets/icons/Search.svg";

import SearchOptionSelect from "@/components/main/Question/QuestionSearch/SearchOptionSelect";

interface QuestionSearchProps {
  searchQuery: string;
  searchOption: QuestionSearchType;
  sortOption: QuestionSortType;
  changeSearchQuery: (word: string) => void;
}

const QuestionSearch = ({ searchQuery, searchOption, sortOption, changeSearchQuery }: QuestionSearchProps) => {
  const router = useRouter();

  const changeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeSearchQuery(e.target.value);
  };

  const searchQuestions = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter" && searchQuery.length > 1) {
      router.push({
        pathname: "/search",
        query: { query: searchQuery, search: searchOption, sort: sortOption }
      });
    }
  };

  return (
    <style.Wrapper>
      <SearchOptionSelect selectType="search" />
      <SearchOptionSelect selectType="sort" />
      <SearchOptionSelect selectType="answered" />
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

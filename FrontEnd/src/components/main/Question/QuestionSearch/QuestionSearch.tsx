import { useRouter } from "next/router";
import * as style from "./QuestionSearch.style";
import SearchSvg from "@/assets/icons/Search.svg";

interface QuestionSearchProps {
  searchValue: string;
  changeSearchValue: (word: string) => void;
}

const QuestionSearch = ({ searchValue, changeSearchValue }: QuestionSearchProps) => {
  const router = useRouter();

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeSearchValue(e.target.value);
  };

  const searchWord = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter" && searchValue.length > 3) {
      router.push({
        pathname: "/question",
        query: { word: searchValue }
      });
    }
  };

  return (
    <style.Wrapper>
      <style.IconWrap>
        <SearchSvg />
      </style.IconWrap>
      <style.SearchInput
        value={searchValue}
        onChange={changeInput}
        onKeyDown={searchWord}
        placeholder="검색어를 입력해주세요. (3글자 이상)"
        maxLength={30}
        minLength={1}
      />
    </style.Wrapper>
  );
};

export default QuestionSearch;

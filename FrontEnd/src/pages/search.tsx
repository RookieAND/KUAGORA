import Head from "next/head";

import { useInfiniteQuery } from "react-query";
import { useRef, useState } from "react";
import { useRouter } from "next/router";

import { getQuestionsAsync, QuestionSortType, QuestionSearchType, getQuestionsByQueryAsync } from "@/apis/question";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

import SearchTemplate from "@/components/template/SearchTemplate";

const Search = () => {
  const router = useRouter();
  const questionRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const searchOption = (router?.query?.search || "title") as QuestionSearchType;
  const sortOption = (router?.query?.sort || "recent") as QuestionSortType;
  const query = (router?.query?.query || "") as string;
  const amount = 12; // 1회 fetch 시 최대 12개의 질문글을 불러옴

  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ["question", { searchQuery, sortOption, searchOption }],
    /**
     * useInfiniteQuery 쿼리에 할당된 콜백 함수
     * pageParam : 현재 useInfiniteQuery가 어떤 페이지에 있는지를 체크하는 파라미터 (기본 1 지정)
     */
    ({ pageParam = 1 }) => {
      return getQuestionsByQueryAsync(pageParam, amount, sortOption, searchOption, query);
    },
    {
      /**
       * getNextPageParam : 다음 API를 요청할 때 사용될 pageParam의 값을 지정 (만약 마지막 페이지일 경우, undefined)
       * 파라미터로는 lastPage (호출된 가장 마지막에 있는 페이지 데이터), allPage (호출된 모든 페이지 데이터) 를 제공
       */
      getNextPageParam: lastPage => {
        if (!lastPage || !lastPage.isSuccess || lastPage.result.isLast) {
          return undefined;
        }
        return lastPage.result;
      },
      staleTime: 30000
    }
  );

  // useInfiniteScroll에 넘길 Callback, 다음 페이지가 존재할 경우 이를 불러오는 함수.
  const fetchNextQuestions = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };

  // 질문글 검색 바의 Value를 새롭게 변경해주는 함수.
  const changeSearchQuery = (newQuery: string) => {
    setSearchQuery(newQuery);
  };

  useInfiniteScroll(questionRef, fetchNextQuestions);

  // useInfiniteQuery 로 받은 데이터를 페이지 별로 순회하여 API 성공 여부에 따른 값을 추가.
  // 각 페이지 별 질문글 데이터는 1차원 배열에 담겨 있으므로, flat을 통해 이를 하나로 묶어야 함.
  const questions = !isFetching
    ? data?.pages.map(pageResult => (pageResult?.isSuccess ? pageResult.result.content : [])).flat()
    : [];

  console.log(data);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00917C" />
        <link rel="icon" href="/favicon.ico" />
        <title>지식의 요람, KU : AGORA</title>
      </Head>
      <SearchTemplate
        questions={questions}
        questionRef={questionRef}
        searchQuery={searchQuery}
        sortOption={sortOption}
        searchOption={searchOption}
        changeSearchQuery={changeSearchQuery}
      />
    </>
  );
};

export default Search;

import Head from "next/head";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getQuestionListAsync, QuestionPostType } from "@/apis/question";

import QuestionsTemplate from "@/components/template/QuestionsTemplate";
import { searchQuestionByWord } from "../apis/question";

interface QuestionsPageProps {
  recentQuestions: QuestionPostType[];
}

export async function getStaticProps() {
  const response = await getQuestionListAsync(1, 12, "recent");
  return {
    props: { recentQuestions: response.isSuccess ? response.result : [] }
  };
}

const Questions = ({ recentQuestions }: QuestionsPageProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [questions, setQuestions] = useState<QuestionPostType[]>(recentQuestions);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const getSearchData = async () => {
      const queryWord = router.query.word as string;
      if (!queryWord) {
        return;
      }
      const initSearchData = await searchQuestionByWord(queryWord, 1, 16);
      setQuestions(prev => (initSearchData.isSuccess ? initSearchData.result : prev));
    };

    getSearchData();
  }, [router.isReady, router.query]);

  const changeSearchValue = (word: string) => {
    setSearchValue(word);
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00917C" />
        <link rel="icon" href="/favicon.ico" />
        <title>지식의 요람, KU : AGORA</title>
      </Head>
      <QuestionsTemplate questions={questions} searchValue={searchValue} changeSearchValue={changeSearchValue} />
    </>
  );
};

export default Questions;

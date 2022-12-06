import Head from "next/head";

import dummyQuestionData from "@/constants/dummyQuestionData";
import { getQuestionListAsync, QuestionPostType } from "@/apis/question";

import QuestionsTemplate from "@/components/template/QuestionsTemplate";

interface QuestionsPageProps {
  questions: QuestionPostType[];
}

export async function getServerSideProps() {
  const response = await getQuestionListAsync(1, 12, "recent");
  return {
    props: { questions: response.isSuccess ? response.result : [] }
  };
}

const Questions = ({ questions }: QuestionsPageProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00917C" />
        <link rel="icon" href="/favicon.ico" />
        <title>지식의 요람, KU : AGORA</title>
      </Head>
      <QuestionsTemplate questions={questions} />
    </>
  );
};

export default Questions;

import Head from "next/head";

import MainTemplate from "@/components/template/MainTemplate";
import { QuestionPostType, getQuestionsAsync } from "@/apis/question";

interface QuestionsPageProps {
  recentQuestions: QuestionPostType[];
  popularQuestions: QuestionPostType[];
}

export async function getServerSideProps() {
  const [recentQuestions, popularQuestions] = await Promise.all([
    getQuestionsAsync(1, 8, "recent", "progressed"),
    getQuestionsAsync(1, 8, "popular", "completed")
  ]);

  return {
    props: {
      recentQuestions: recentQuestions.isSuccess ? recentQuestions.result.content : [],
      popularQuestions: popularQuestions.isSuccess ? popularQuestions.result.content : []
    }
  };
}

const Home = ({ recentQuestions, popularQuestions }: QuestionsPageProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00917C" />
        <link rel="icon" href="/favicon.ico" />
        <title>지식의 요람, KU : AGORA</title>
      </Head>
      <MainTemplate recentQuestions={recentQuestions} popularQuestions={popularQuestions} />
    </>
  );
};

export default Home;

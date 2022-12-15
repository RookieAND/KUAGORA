import Head from "next/head";

import MainTemplate from "@/components/template/MainTemplate";
import { QuestionPostType, getQuestionsAsync } from "@/apis/question";

interface QuestionsPageProps {
  questions: QuestionPostType[];
}

export async function getStaticProps() {
  const response = await getQuestionsAsync(1, 8, "recent");
  return {
    props: { questions: response.isSuccess ? response.result.content : [] }
  };
}

const Home = ({ questions }: QuestionsPageProps) => {
  console.log(questions);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00917C" />
        <link rel="icon" href="/favicon.ico" />
        <title>지식의 요람, KU : AGORA</title>
      </Head>
      <MainTemplate questions={questions} />
    </>
  );
};

export default Home;

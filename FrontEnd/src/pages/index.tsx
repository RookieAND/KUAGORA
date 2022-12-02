import type { NextPage } from "next";
import Head from "next/head";

import MainTemplate from "@/components/template/MainTemplate";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00917C" />
        <link rel="icon" href="/favicon.ico" />
        <title>지식의 요람, KU : AGORA</title>
      </Head>
      <MainTemplate />
    </>
  );
};

export default Home;

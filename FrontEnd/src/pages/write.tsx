import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAtom } from "jotai";
import { QueryClient } from "react-query";

import PostQuestionTemplate from "@/components/template/PostQuestionTemplate";
import { addQuestionAsync } from "@/apis/question";
import { accessTokenAtom } from "@/stores/actions";

const PostQuestion = () => {
  const [accessToken] = useAtom(accessTokenAtom);
  const [postKeywords, setPostKeywords] = useState<string[]>([]);
  const [postContent, setPostContent] = useState<string>("");
  const [postTitle, setPostTitle] = useState<string>("");
  const router = useRouter();
  const queryClient = new QueryClient();

  const submitNewPost = async () => {
    if (!accessToken) {
      router.push("/login");
      return;
    }
    if (postTitle.length > 0 && postContent.length > 0) {
      const response = await addQuestionAsync(postTitle, postContent, postKeywords, accessToken);
      // 새로운 질문글을 작성할 경우, 질문글 캐싱 데이터를 무효화시켜 refetch 유도
      if (response.isSuccess) {
        queryClient.invalidateQueries(["question"]);
        router.replace(`/question/${response.result.questionId}`);
      }
    }
  };

  const addNewKeyword = (newKeyword: string) => {
    if (postKeywords.length < 3) {
      setPostKeywords(prev => [...prev, newKeyword]);
    }
  };

  const removeKeyword = (removedKeyword: string) => {
    if (postKeywords.length > 0) {
      setPostKeywords(prev => prev.filter(keyword => keyword !== removedKeyword));
    }
  };

  const changeContentInput = (content: string) => {
    setPostContent(content);
  };

  const changeTitleInput = (title: string) => {
    setPostTitle(title);
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
      <PostQuestionTemplate
        postKeywords={postKeywords}
        addNewKeyword={addNewKeyword}
        removeKeyword={removeKeyword}
        postContent={postContent}
        changeContentInput={changeContentInput}
        postTitle={postTitle}
        changeTitleInput={changeTitleInput}
        submitNewPost={submitNewPost}
      />
    </>
  );
};

export default PostQuestion;

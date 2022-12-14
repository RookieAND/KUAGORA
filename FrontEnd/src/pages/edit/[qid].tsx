import Head from "next/head";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import type { QuestionDetailType } from "@/apis/question";
import { getQuestionAsync, patchQuestionAsync } from "@/apis/question";
import { accessTokenAtom } from "@/stores/actions";

import PostQuestionTemplate from "@/components/template/PostQuestionTemplate";

const EditQuestion = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const questionId = Number(router.query.qid);

  const [accessToken] = useAtom(accessTokenAtom);
  const [prevContent, setPrevContent] = useState<QuestionDetailType | undefined>(undefined);
  const [postKeywords, setPostKeywords] = useState<string[]>([]);
  const [postContent, setPostContent] = useState<string>("");
  const [postTitle, setPostTitle] = useState<string>("");

  useEffect(() => {
    if (!router.isReady || !questionId) {
      return;
    }

    const initializeData = async () => {
      // 질문글 컨텐츠 업데이트
      const initDataResult = await getQuestionAsync(questionId, accessToken || "");

      // 질문글 관련 정보 로드 실패 시, 이전으로 되돌아감.
      if (!initDataResult.isSuccess) {
        router.replace("/questions");
      }

      setPrevContent(prev => (initDataResult.isSuccess ? initDataResult.result : prev));
      setPostKeywords(prev =>
        initDataResult.isSuccess ? [...initDataResult.result.keywords.map(({ content }) => content)] : prev
      );
      setPostContent(prev => (initDataResult.isSuccess ? initDataResult.result.content : prev));
      setPostTitle(prev => (initDataResult.isSuccess ? initDataResult.result.title : prev));
    };

    initializeData();
  }, [router.isReady, questionId]);

  // 타입 가드 (데이터 fetching 전 로드)
  if (prevContent === undefined) {
    return <span>Loading...</span>;
  }

  const editCurrentPost = async () => {
    if (!accessToken) {
      router.push("/login");
      return;
    }
    if (postTitle.length > 0 && postContent.length > 0) {
      // 기존의 키워드 목록과 변경된 키워드 목록을 대조하여, 추가 / 삭제된 키워드 목록을 추출함.
      const prevKeywords = prevContent.keywords.map(({ content: prevKeywordContent }) => prevKeywordContent);
      const addKeywords = postKeywords.filter(content => !prevKeywords.includes(content));
      const delKeywords = prevKeywords.filter(content => !postKeywords.includes(content));
      const response = await patchQuestionAsync(
        questionId,
        accessToken,
        postTitle,
        postContent,
        addKeywords,
        delKeywords
      );
      // 새로운 질문글을 작성할 경우, 질문글 캐싱 데이터를 무효화시켜 refetch 유도
      if (response.isSuccess) {
        await queryClient.invalidateQueries({ queryKey: ["question"], refetchType: "active" });
        router.replace(`/question/${questionId}`);
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
        submitPost={editCurrentPost}
      />
    </>
  );
};

export default EditQuestion;

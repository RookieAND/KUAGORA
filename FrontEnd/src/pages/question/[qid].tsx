import Head from "next/head";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import type { QuestionDetailType, LikeDataType } from "@/apis/question";
import { getQuestionAsync, addLikesAsync, deleteLikesAsync } from "@/apis/question";
import QuestionsDetailTemplate from "@/components/template/QuestionDetailTemplate";
import { accessTokenAtom } from "@/stores/actions";

const QuestionDetail = () => {
  const router = useRouter();
  const questionId = Number(router.query.qid);

  const [accessToken] = useAtom(accessTokenAtom);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [detailContent, setDetailContent] = useState<QuestionDetailType | undefined>(undefined);
  const [likesData, setLikesData] = useState<LikeDataType>({
    isLike: false,
    likeCount: 0
  });

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
      setDetailContent(prev => (initDataResult.isSuccess ? initDataResult.result : prev));

      // 질문글 좋아요 관련 업데이트
      setLikesData(prev =>
        initDataResult.isSuccess
          ? {
              isLike: initDataResult.result.isLike,
              likeCount: initDataResult.result.likeCount
            }
          : prev
      );
    };

    initializeData();
  }, [router.isReady, questionId, isAnswered]);

  // 타입 가드 (데이터 fetching 전 로드)
  if (detailContent == undefined) {
    return <span>Loading...</span>;
  }

  const changeQuestionState = () => {
    setIsAnswered(true);
  };

  const toggleLikeState = async () => {
    if (!accessToken || detailContent.isWriter) {
      return;
    }
    // 좋아요 정보에 대한 optimistic update 우선 진행.
    const { isLike: prevIsLike, likeCount: prevLikeCount } = likesData;
    setLikesData({ isLike: !prevIsLike, likeCount: prevLikeCount + (!prevIsLike ? 1 : -1) });
    // 사용자의 이전 좋아요 여부에 따른 API 호출 (추가 혹은 삭제)
    let response;
    response = !prevIsLike
      ? await addLikesAsync(questionId, accessToken)
      : await deleteLikesAsync(questionId, accessToken);
    // 통신 연결에 실패했다면, 원래 값으로 좋아요 정보를 롤백.
    if (!response.isSuccess) {
      setLikesData({ isLike: prevIsLike, likeCount: prevLikeCount });
      return;
    }
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
      <QuestionsDetailTemplate
        detailContent={detailContent}
        likesData={likesData}
        changeQuestionState={changeQuestionState}
        toggleLikeState={toggleLikeState}
      />
    </>
  );
};

export default QuestionDetail;

import Head from "next/head";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import { getQuestionAsync, QuestionDetailType, LikeDataType, CommentDataType, getCommentsAsync } from "@/apis/question";
import QuestionsDetailTemplate from "@/components/template/QuestionDetailTemplate";
import { setUserDataAtom } from "@/stores/actions";

const QuestionDetail = () => {
  const router = useRouter();
  const questionId = Number(router.query.qid);

  const [userData] = useAtom(setUserDataAtom);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [detailContent, setDetailContent] = useState<QuestionDetailType | undefined>(undefined);
  const [likes, setLikes] = useState<LikeDataType>({
    isLike: false,
    likeCount: 0
  });

  useEffect(() => {
    if (!router.isReady || !questionId) {
      return;
    }

    const initializeData = async () => {
      // 질문글 컨텐츠 업데이트
      const initDataResult = await getQuestionAsync(questionId);

      // 질문글 관련 정보 로드 실패 시, 이전으로 되돌아감.
      if (!initDataResult.isSuccess) {
        router.back();
      }
      setDetailContent(prev => (initDataResult.isSuccess ? initDataResult.result : prev));

      // 질문글 좋아요 관련 업데이트
      setLikes(prev =>
        initDataResult.isSuccess
          ? {
              isLike: initDataResult.result.isLike,
              likeCount: initDataResult.result.likeCount
            }
          : prev
      );
    };

    initializeData();
  }, [router.isReady, questionId, userData, isAnswered]);

  const isWriter = userData.uuid === detailContent?.user.uuid;

  const changeQuestionState = () => {
    setIsAnswered(true);
  };

  // 타입 가드 (데이터 fetching 전 로드)
  if (detailContent == undefined) {
    return <span>Loading...</span>;
  }

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
        likes={likes}
        isWriter={isWriter}
        changeQuestionState={changeQuestionState}
      />
    </>
  );
};

export default QuestionDetail;

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getQuestionAsync, QuestionDetailType, LikeDataType, KeywordDataType } from "@/apis/question";

import QuestionsDetailTemplate from "@/components/template/QuestionDetailTemplate";

const QuestionDetail = () => {
  const router = useRouter();
  const questionId = Number(router.query.qid);

  const [detailContent, setDetailContent] = useState<QuestionDetailType | undefined>(undefined);
  const [keywordData, setKeywordData] = useState<KeywordDataType[]>([]);
  const [likeData, setLikeData] = useState<LikeDataType>({
    isLike: false,
    likeCount: 0
  });

  const toggleLikeState = () => {};

  useEffect(() => {
    if (!router.isReady || !questionId) {
      return;
    }

    const initializeData = async () => {
      const initDataResult = await getQuestionAsync(questionId);

      // 질문글 관련 정보 로드 실패 시, 이전으로 되돌아감.
      if (!initDataResult.isSuccess) {
        router.back();
      }

      // 질문글 컨텐츠 업데이트
      setDetailContent(prev => (initDataResult.isSuccess ? initDataResult.result : prev));
      // 질문글 좋아요 관련 업데이트
      setLikeData(prev =>
        initDataResult.isSuccess
          ? {
              isLike: initDataResult.result.isLike,
              likeCount: initDataResult.result.likeCount
            }
          : prev
      );
      // 질문글 좋아요 관련 업데이트
      setKeywordData(prev => (initDataResult.isSuccess ? initDataResult.result.keywords : prev));
    };

    initializeData();
  }, [router.isReady, questionId]);

  return <QuestionsDetailTemplate detailContent={detailContent as QuestionDetailType} />;
};

export default QuestionDetail;

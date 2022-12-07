declare global {
  namespace Express {
    interface Request {
      uuid?: string;
      redis?: any; // any 개선 필요, type 관련 조사 필요.
    }
  }
}

// 빈 export 구문을 넣음으로서 외부 모듈로 인식시킨다.
export {};

declare global {
  namespace Express {
    interface Request {
      uuid?: string;
    }
  }
}

// 빈 export 구문을 넣음으로서 외부 모듈로 인식시킨다.
export {};

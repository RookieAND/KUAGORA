/**
 * [definedErrors.ts]
 * 서버에서 발생하는 여러 에러를 커스터마이징하여 사용하기 위한 코드
 * 400, 401, 402, 403, 500 HTTP Status Code 에 대한 오류를 재정의.
 */

/**
 * 400 Bad Request Error (잘못된 요청)
 * @param 서버에서 일어난 에러 발생 사유 message
 */
class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
    this.message = message;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  statusCode = 400;
}

/**
 * 401 Unauthorized Error (인증 오류)
 * @param 서버에서 일어난 에러 발생 사유 message
 */
class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
    this.message = message;
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
  statusCode = 401;
}

/**
 * 403 Forbidden Error (권한 미달)
 * @param 서버에서 일어난 에러 발생 사유 message
 */
class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
    this.message = message;
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
  statusCode = 403;
}

/**
 * 404 Not Found Error (인증 오류)
 * @param 서버에서 일어난 에러 발생 사유 message
 */
class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.message = message;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  statusCode = 404;
}

/**
 * 460 Expire Token Error (엑세스 토큰 만료)
 * @param 서버에서 일어난 에러 발생 사유 message
 */
class ExpireTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ExpireTokenError';
    this.message = message;
    Object.setPrototypeOf(this, ExpireTokenError.prototype);
  }
  statusCode = 460;
}

/**
 * 470 Expire Refresh Token Error (리프레시 토큰 만료)
 * @param 서버에서 일어난 에러 발생 사유 message
 */
class ExpireRefreshTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ExpireRefreshTokenError';
    this.message = message;
    Object.setPrototypeOf(this, ExpireRefreshTokenError.prototype);
  }
  statusCode = 470;
}

/**
 * 500 Unauthorized Error (서버 오류)
 * @param 서버에서 일어난 에러 발생 사유 message
 */
class InternalServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServerError';
    this.message = message;
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
  statusCode = 500;
}

export {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ExpireTokenError,
  ExpireRefreshTokenError,
  InternalServerError,
};

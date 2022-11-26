import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiURL } from "../constants/api";

/**
 * API 호출 함수의 반환 타입 (비동기 결과 Promise)
 * @param T 호출에 성공할 경우 가져오는 데이터 타입
 */
export type APIResult<T> = Promise<
  | {
      isSuccess: true;
      result: T;
    }
  | {
      isSuccess: false;
      result: APIError;
    }
>;

/**
 * API 호출 함수에서 발생하는 에러 타입
 */
export interface APIError {
  statusCode: number;
  errMessage: string;
}

/** API 호출에서 발생한 에러를 클라이언트의 형식으로 가공하는 함수
 * @param err 형식을 처리할 에러
 */
function preProcessError(err: unknown): APIError {
  // axios 통신 과정에서 발생한 오류인지를 먼저 판별.
  if (axios.isAxiosError(err)) {
    // 응답까지 정상적으로 들어왔을 경우.
    if (err.response) {
      return {
        statusCode: err.response.status,
        errMessage: err.response.statusText
      };
    }
    // 요청은 들어갔으나 응답이 안된 경우.
    if (err.request) {
      return {
        statusCode: -1,
        errMessage: "서버와의 통신에 실패했습니다."
      };
    }
  }

  return {
    statusCode: -1,
    errMessage: "원인을 알 수 없는 오류입니다."
  };
}

/**
 * GET 요청을 처리하는 API 유틸 함수 getAsync
 * @param T 요청 결과로 받을 데이터의 타입
 * @param D 요청 시 서버로 보낼 데이터 타입
 *
 * @param url 요청을 전송할 URL
 * @param config Axios 요청 관련 config (AxiosRequestConfig)
 * @returns 요청 성공 시 결과 객체, 요청 실패 시 에러 객체 리턴.
 */
export async function getAsync<T, D>(
  url: string,
  config?: AxiosRequestConfig
): APIResult<T> {
  try {
    const response = await axios.get<T, AxiosResponse<T, D>, D>(url, {
      baseURL: apiURL,
      responseType: "json",
      ...config
    });
    return { isSuccess: true, result: response.data };
  } catch (err) {
    return { isSuccess: false, result: preProcessError(err) };
  }
}

/**
 * POST HTTP 요청을 처리하는 API 유틸 함수 postAsync\
 * @param T 요청 결과로 받을 데이터의 타입
 * @param D 요청 시 서버로 보낼 데이터 타입
 *
 * @param url 요청을 전송할 URL
 * @param data body 에 넣어 보낼 데이터
 * @param config Axios 요청 관련 config (AxiosRequestConfig)
 * @returns 요청 성공과 실패에 따른 APIResult 타입 리턴
 */
export async function postAsync<T, D>(
  url: string,
  data: D,
  config?: AxiosRequestConfig
): APIResult<T> {
  try {
    const response = await axios.post<T, AxiosResponse<T, D>, D>(url, data, {
      baseURL: apiURL,
      responseType: "json",
      ...config
    });
    return { isSuccess: true, result: response.data };
  } catch (err) {
    return { isSuccess: false, result: preProcessError(err) };
  }
}

/**
 * DELETE HTTP 요청을 처리하는 API 유틸 함수 deleteAsync
 * @param T 요청 결과로 받을 데이터의 타입
 * @param D 요청 시 서버로 보낼 데이터 타입
 *
 * @param url 요청을 전송할 URL
 * @param config Axios 요청 관련 config (AxiosRequestConfig)
 * @returns 요청 성공과 실패에 따른 APIResult 타입 리턴
 */
export async function deleteAsync<T, D>(
  url: string,
  config?: AxiosRequestConfig
): APIResult<T> {
  try {
    const response = await axios.delete<T, AxiosResponse<T, D>, D>(url, {
      baseURL: apiURL,
      responseType: "json",
      ...config
    });
    return { isSuccess: true, result: response.data };
  } catch (err) {
    return { isSuccess: false, result: preProcessError(err) };
  }
}

/**
 * PATCH HTTP 요청을 처리하는 API 유틸 함수 postAsync
 * @param T 요청 결과로 받을 데이터의 타입
 * @param D 요청 시 서버로 보낼 데이터 타입
 *
 * @param url 요청을 전송할 URL
 * @param data body 에 넣어 보낼 데이터
 * @param config Axios 요청 관련 config (AxiosRequestConfig)
 * @returns 요청 성공과 실패에 따른 APIResult 타입 리턴
 */
export async function patchAsync<T, D>(
  url: string,
  data: D,
  config?: AxiosRequestConfig
): APIResult<T> {
  try {
    const response = await axios.patch<T, AxiosResponse<T, D>, D>(url, data, {
      baseURL: apiURL,
      responseType: "json",
      ...config
    });
    return { isSuccess: true, result: response.data };
  } catch (err) {
    return { isSuccess: false, result: preProcessError(err) };
  }
}

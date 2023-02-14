import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

import { apiURL } from "@/constants/api";
import { verifyRefreshTokenAsync } from "./auth";

const API = axios.create({ baseURL: apiURL });

/**
 * Axios Intercepter 관련 설정
 * request의 경우, localStorage 접근 시 발생하는 에러로 인해 헤더는 상황에 맞춰 토큰을 담는 것으로 조정.
 * response : 토큰 만료 관련 오류 발생 시, 자동으로 리프레시 토큰을 보냄, 이후 리프레시 토큰이 갱신되었다면 기존의 요청 재전송.
 */

API.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (err: AxiosError) => {
    // 토큰 만료 에러인지를 확인하고, 만약 맞다면 저장된 리프레시 토큰을 재전송
    if (err.response && err.response.status === 460) {
      const jwtToken = JSON.parse(localStorage.getItem("jwt_token") || "");
      if (jwtToken) {
        const oldRefreshToken = jwtToken.refreshToken;
        const verifyResponse = await verifyRefreshTokenAsync(oldRefreshToken);
        // 리프레시 토큰을 성공적으로 인계 받았다면, 기존의 요청을 재전송함.
        if (verifyResponse.isSuccess) {
          const { accessToken, refreshToken } = verifyResponse.result;
          localStorage.setItem("jwt_token", JSON.stringify({ accessToken, refreshToken }));
          // 새롭게 갱신 받은 엑세스 토큰을 헤더에 삽입한 후 재요청 진행
          return axios.request({
            ...err.config,
            headers: { ...err.config.headers, authorization: `${accessToken}` }
          });
        }
        // 리프레시 토큰도 만료되었다면, 로그아웃을 진행시킴.
        localStorage.removeItem("jwt_token");
        localStorage.removeItem("user_data");
        window.location.href = "/login";
      }
      return Promise.reject(err);
    }
  }
);

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

/**
 * Axios 에러 발생 시, 서버에서 받은 에러 메세지를 담은 data 타입
 */
interface AxiosErrorResponse {
  errorMessage: string;
}

/** API 호출에서 발생한 에러를 클라이언트의 형식으로 가공하는 함수
 * @param err 형식을 처리할 에러
 */
function preProcessError(err: unknown): APIError {
  // axios 통신 과정에서 발생한 오류인지를 먼저 판별.
  if (axios.isAxiosError(err)) {
    // 응답까지 정상적으로 들어왔을 경우.
    if (err.response) {
      const errorResponse = err.response as AxiosResponse<AxiosErrorResponse, any>;
      return {
        statusCode: errorResponse.status,
        errMessage: errorResponse.data.errorMessage || "알 수 없는 오류입니다"
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
export async function getAsync<T, D>(url: string, config?: AxiosRequestConfig): APIResult<T> {
  try {
    const response = await API.get<T, AxiosResponse<T, D>, D>(url, {
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
export async function postAsync<T, D>(url: string, data: D, config?: AxiosRequestConfig): APIResult<T> {
  try {
    const response = await API.post<T, AxiosResponse<T, D>, D>(url, data, {
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
export async function deleteAsync<T, D>(url: string, config?: AxiosRequestConfig): APIResult<T> {
  try {
    const response = await API.delete<T, AxiosResponse<T, D>, D>(url, {
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
export async function patchAsync<T, D>(url: string, data: D, config?: AxiosRequestConfig): APIResult<T> {
  try {
    const response = await API.patch<T, AxiosResponse<T, D>, D>(url, data, {
      responseType: "json",
      ...config
    });
    return { isSuccess: true, result: response.data };
  } catch (err) {
    return { isSuccess: false, result: preProcessError(err) };
  }
}

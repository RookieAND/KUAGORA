import { getRepository } from 'typeorm';

import { InternalServerError } from '@/errors/definedErrors';
import { SocialPlatform } from '@/types/social';

import User from '@/database/entity/user';
import Question from '@/database/entity/question';

/**
 * 로그인 진행 시 인계받은 email, 플랫폼 타입을 통해 유저 정보를 받는 함수
 * @param email 소셜 플랫폼에서 인계 받은 유저의 이메일
 * @param social 유저가 로그인을 진행한 소셜 플랫폼
 * @returns DB에 저장된 유저 데이터, 없을 경우 undefined 리턴
 */
export const getUserByEmail = async (email: string, social: SocialPlatform) => {
  let userData = undefined;
  userData = await getRepository(User)
    .createQueryBuilder('user')
    .where('user.email = :email', { email })
    .andWhere('user.social = :social', { social })
    .getOne();
  return userData;
};

/**
 * 회원가입을 진행하는 유저의 정보를 DB에 추가시키는 함수
 * @param nickname 유저의 닉네임
 * @param email 유저의 이메일
 * @param social 유저가 연동에 사용한 소셜 플랫폼
 * @returns DB에 저장된 유저 데이터
 */
export const registerUser = async (
  nickname: string,
  email: string,
  social: SocialPlatform,
) => {
  const userRepository = getRepository(User);
  const registeredData = userRepository.create({
    nickname,
    email,
    social,
  });

  // 새로운 데이터를 생성하는데 실패했다면, 500 Internal Error 를 발생시킴.
  if (!registeredData) {
    throw new InternalServerError(
      '새로운 유저 정보를 DB에 추가하는 과정에서 문제가 발생했습니다.',
    );
  }

  await userRepository.save(registeredData);
  return registeredData;
};

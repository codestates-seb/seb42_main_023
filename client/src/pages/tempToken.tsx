import React from 'react';
import { useEffect } from 'react';
import { usePostTempTokenMutation } from '../api/tempTokenAPi';

// ! 로그인 성공 후 로직
// 1. 로그인에 성공하면 Google Resource Server는 backend서버로 유저 정보를 전송한다.
// 2. backend서버는 유저 정보를 저장하고 임시accessToken을 발행한다. 그 후, 클라이언트를 '/temptoken'페이지로 리다이렉트하며 uri에 임시accessToken을 담아 보낸다.
// 3. 클라이언트는 uri에 담긴 tempAccessToken을 retrieve하여 서버에게 보낸다. 서버는 tempAccessToken을 확인하여 일치하는 유저정보를 찾고, 진짜 토큰을 발행한다.
// 4. 서버는 응답으로 실제 서비스에서 쓰일 accessToken을 헤더에, refrsehToken을 쿠키에 담아서 보낸다.
// 5. 클라이언트는 accessToken과 refreshToken을 쿠키에 저장한다 --> tempTokenApi.ts에 로직 구현
// 6. 클라이언트는 서버에게서 오는 유저 정보 (닉네임, 프로필사진, 어드민여부) 을 로컬스토리지에 저장한다. --> tempToken.ts에 로직 구현

const TempToken: React.FC = () => {
  const [postTempToken] = usePostTempTokenMutation();

  useEffect(() => {
    const url = new URL(window.location.href);
    const tempAccessToken = url.searchParams.get('tempAccessToken');
    console.log('tempAccessToken', tempAccessToken);

    postTempToken({ tempAccessToken })
      .unwrap()
      .then((payload: any) => {
        // 유저 정보를 로컬스토리지에 저장
        const { name, picture, role } = payload;

        localStorage.setItem('name', name);
        localStorage.setItem('picture', picture);
        localStorage.setItem('role', role);

        // 로그인에 성공한 유저를 메인페이지로 리다이렉트
        window.location.href = '/';
      })
      .catch((err) => console.log('err in tempToken', err));
  }, []);

  return <div>Loading</div>;
};

export default TempToken;

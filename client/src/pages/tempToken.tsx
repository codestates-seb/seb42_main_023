import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

// ! 로그인 성공 후 로직
// 1. 로그인에 성공하면 Google Resource Server는 backend서버로 유저 정보를 전송한다.
// 2. backend서버는 유저 정보를 저장하고 임시accessToken을 발행한다. 그 후, 클라이언트를 '/temptoken'페이지로 리다이렉트하며 uri에 임시accessToken을 담아 보낸다.
// 3. 클라이언트는 uri에 담긴 tempAccessToken을 retrieve하여 서버에게 보낸다. 서버는 tempAccessToken을 확인하여 일치하는 유저정보를 찾고, 진짜 토큰을 발행한다.
// 4. 서버는 응답으로 실제 서비스에서 쓰일 accessToken을 헤더에, refrsehToken을 쿠키에 담아서 보낸다.
// 5. 클라이언트는 accessToken과 refreshToken을 쿠키에 저장한다.
// 6. 클라이언트는 서버에게서 오는 유저 정보 (닉네임, 프로필사진) 을 로컬스토리지에 저장한다.

// 모든 요청에 withCredentials가 true로 설정된다.
axios.defaults.withCredentials = true;

const TempToken: React.FC = () => {
  useEffect(() => {
    const url = new URL(window.location.href);
    const tempAccessToken = url.searchParams.get('tempAccessToken');
    console.log('tempAccessToken', tempAccessToken);

    axios
      .post('https://thedragonmoney.com/auth/callback/google', {
        tempAccessToken: tempAccessToken,
      })
      .then((res) => {
        console.log('res', res);
        console.log('res.headers', res.headers);
        console.log('res.data', res.data);

        const { headers, data } = res;

        // header에 담겨온 accessToken을 쿠키에 저장한다. Refresh token은 쿠키에 담겨서 온다.
        // 쿠키에 담겨온 refreshToken을 찾고, 쿠키에 저장한다.
        const accessToken = headers.authorization;
        const refreshToken = headers.refresh;
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        if (accessToken) {
          Cookies.set('Authorization', accessToken);
        }
        if (refreshToken) {
          Cookies.set('Refresh', refreshToken);
        }

        // 유저 정보를 로컬스토리지에 저장한다.
        const nickname = data.name;
        const profilePic = data.picture;
        localStorage.setItem('nickname', nickname);
        localStorage.setItem('profilePic', profilePic);

        // 로그인이 완료된 유저를 메인페이지로 리디렉팅한다.
        // window.location.href = '/';
      });
  }, []);

  return <div>Loading</div>;
};

export default TempToken;

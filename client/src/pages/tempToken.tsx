import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// 1. 로그인에 성공하면 Google Resource Server는 backend서버로 유저 정보를 전송한다.
// 2. backend서버는 유저 정보를 저장하고 임시accessToken을 발행한다. 그 후, 클라이언트를 '/temptoken'페이지로 리다이렉트하며 uri에 임시accessToken을 담아 보낸다.
// 3. 클라이언트는 uri에 담긴 tempAccessToken을 retrieve하여 서버에게 보낸다. 서버는 tempAccessToken을 확인하여 일치하는 유저정보를 찾고, 진짜 토큰을 발행한다.
// 4. 서버는 응답으로 실제 서비스에서 쓰일 accessToken을 헤더에, refrsehToken을 쿠키에 담아서 보낸다.
// 5. 클라이언트는 accessToken과 refreshToken을 쿠키에 저장한다.

const TempToken: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const tempAccessToken = url.searchParams.get('tempAccessToken');

    axios
      .post('http://15.164.95.47:8080/auth/callback/google', {
        tempAccessToken,
      })
      .then((res) => {
        console.log('res.headers', res.headers);

        // accessToken을 쿠키에 저장한다.
        const accessToken = res.headers.Authorization;
        Cookies.set('accessToken', accessToken);

        // set-cookie헤더를 파싱하여 refreshToken을 찾고, 쿠키에 저장한다.
        const cookieHeader = res.headers['Set-Cookie'];
        console.log('cookieHeader:', cookieHeader);

        const refreshToken = cookieHeader.match(/Refresh=Bearer\s*([^;]+)/)[1];
        console.log('refreshToken:', refreshToken);

        Cookies.set('refreshToken', refreshToken);

        // 로그인이 완료된 유저를 메인페이지로 리디렉팅한다.
        navigate('/');
      });
  }, []);

  return <div>Loading</div>;
};

export default TempToken;

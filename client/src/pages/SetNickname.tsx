import React from 'react';
import styled from 'styled-components';
import { BlueBtn } from '../components/common/Btn';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { usePostNicknameMutation } from '../api/nicknameApi';
import { MainContainer, FormContainer } from '../components/common/Container';

const SetNickname: React.FC = () => {
  // Tools
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  const [postNickname] = usePostNicknameMutation();

  // 서버에 보내야 할 데이터 1: tempName -  서버는 회원가입이 완료된 유저를 닉네임 설정 페이지로 리다이렉트한다. uri에는 사용자를 임시로 식별할 수 있는 tempName을 담는다.
  const [tempName, setTempName] = useState('');
  useEffect(() => {
    const url = new URL(window.location.href);
    const tempName = url.searchParams.get('TempName') ?? '';
    setTempName(tempName);
  }, []);

  // 서버에 보내야 할 데이터 2: nickname
  const nicknameRef = useRef<HTMLInputElement>(null);
  const [nicknameErrMsg, setNicknameErrMsg] = useState<null | string>(null);
  // const nicknameErr = useAppSelector((state) => state.nickname.nicknameErr);

  // '가입하기' 버튼을 눌렀을 때 실행되는 함수
  const setNicknameHandler = () => {
    const nickname = nicknameRef.current!.value;

    // validation에 성공할때만 서버에 post요청을 보낸다.
    const specialCharacters = /[~!@#$%^&*()_+|<>?:{}]/;

    if (nickname.length < 2 || nickname.length > 8) {
      setNicknameErrMsg('2자 이상 8자 이하로 작성해주세요.');
    } else if (
      nickname.search(/\s/) != -1 ||
      specialCharacters.test(nickname)
    ) {
      setNicknameErrMsg('공백이나 특수문자를 포함하면 안됩니다.');
    } else {
      setNicknameErrMsg(null);
      postNickname({ name: nickname, tempName: tempName })
        .unwrap()
        .then((response) => {
          console.log('res in nickname', response);
          if (response.useable) {
            navigate('/login');
          } else {
            setNicknameErrMsg('중복된 닉네임입니다.');
          }
        })
        .catch((err) => {
          console.log('err in nickname', err);
        });
    }
  };

  return (
    <MainContainer>
      <FormContainer>
        <div>Logo</div>
        <NicknameInput>
          <label htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            placeholder="커뮤니티에서 사용할 닉네임을 작성해주세요"
            ref={nicknameRef}
          />
          <p>{nicknameErrMsg}</p>
        </NicknameInput>
        <SignupBtn onClick={setNicknameHandler}>가입하기</SignupBtn>
      </FormContainer>
    </MainContainer>
  );
};

export default SetNickname;

// 닉네임 입력 label과 input 컨테이너
const NicknameInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  > input {
    width: 100%;
    height: 50px;
    margin: 8px 0px;
    padding-left: 4px;
    border: 1px solid #d4d4d4;
    border-radius: 3px;
    color: #7b7b7b;
  }
  > p {
    color: #ca0000;
    font-size: 12px;
  }
`;

// 가입하기 버튼
const SignupBtn = styled(BlueBtn)`
  width: 305px;
  height: 54px;
`;

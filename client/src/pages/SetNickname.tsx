import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { BlueBtn } from '../components/common/Btn';
import { useNavigate } from 'react-router-dom';
import {
  useGetNicknameQuery,
  usePatchNicknameMutation,
} from '../api/nicknameApi';
import { MainContainer, FormContainer } from '../components/common/Container';
import { LogoSVG } from '../assets/common/LogoSVG';

const SetNickname: React.FC = () => {
  const navigate = useNavigate();
  const [tempName, setTempName] = useState('');
  const nicknameRef = useRef<HTMLInputElement>(null);
  const [nicknameErrMsg, setNicknameErrMsg] = useState<null | string>(null);

  const nickname = nicknameRef.current!.value;

  //! 여기부터
  const [patchNickname] = usePatchNicknameMutation();
  const { data } = useGetNicknameQuery(
    { name: nickname },
    { skip: nickname === '' },
  );

  useEffect(() => {
    const url = new URL(window.location.href);
    const tempName = url.searchParams.get('TempName') ?? '';
    setTempName(tempName);
  }, []);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      duplicateNicknameCheckHandler();
      return;
    }
  };

  const duplicateNicknameCheckHandler = () => {
    const specialCharacters = /[~!@#$%^&*()_+|<>?:{}]/;

    if (nickname.length < 2 || nickname.length > 8) {
      setNicknameErrMsg('2자 이상 8자 이하로 작성해주세요.');
      return;
    }
    if (nickname.search(/\s/) != -1 || specialCharacters.test(nickname)) {
      setNicknameErrMsg('공백이나 특수문자를 포함하면 안됩니다.');
      return;
    }

    if (!nicknameErrMsg) {
      console.log(data);
      if (data.useable) {
        setNicknameErrMsg('사용 가능한 닉네임입니다.');
      } else {
        setNicknameErrMsg('사용할 수 없는 닉네임입니다.');
      }
    }
  };

  const saveNicknameHandler = () => {
    if (!nicknameErrMsg) {
      setNicknameErrMsg('중복 확인을 해주세요.');
      return;
    }

    if (nicknameErrMsg === '사용 가능한 닉네임입니다.') {
      patchNickname({ name: nickname, tempName: tempName })
        .unwrap()
        .then(() => {
          navigate('/login');
        });
    }
  };

  return (
    <MainContainer>
      <FormContainer>
        <LogoSVG />
        <NicknameInput>
          <label htmlFor="nickname">닉네임</label>
          <div>
            <input
              id="nickname"
              placeholder="커뮤니티에서 사용할 닉네임을 작성해주세요"
              ref={nicknameRef}
              onKeyUp={handleKeyUp}
            />
            <DuplicateCheckBtn onClick={duplicateNicknameCheckHandler}>
              중복 확인
            </DuplicateCheckBtn>
          </div>
          <p>{nicknameErrMsg}</p>
        </NicknameInput>
        <SignupBtn onClick={saveNicknameHandler}>가입하기</SignupBtn>
      </FormContainer>
    </MainContainer>
  );
};

export default SetNickname;

const NicknameInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  > div {
    > input {
      width: 80%;
      height: 50px;
      margin: 8px 0px;
      padding-left: 4px;
      border: 1px solid #d4d4d4;
      border-radius: 3px;
      color: #7b7b7b;
      &:focus {
        outline: 1.5px solid var(--point-blue-color);
      }
    }
  }
  > p {
    color: #ca0000;
    font-size: 12px;
  }
`;

const SignupBtn = styled(BlueBtn)`
  width: 305px;
  height: 54px;
`;

const DuplicateCheckBtn = styled(BlueBtn)`
  padding: 5px;
  margin-left: 10px;
`;

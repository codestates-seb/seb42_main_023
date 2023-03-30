import React from 'react';
import styled from 'styled-components';
import { MainContainer, FormContainer } from '../components/common/Container';
import { BlueBtn } from '../components/common/Btn';
import { usePostTempTokenRecoveryMutation } from '../api/tempTokenAPi';

const AccountRecovery: React.FC = () => {
  const [postTempTokenRecovery] = usePostTempTokenRecoveryMutation();

  // '계정 복구' 버튼을 눌렀을 때 실행되는 함수
  const recoverAccountHandler = () => {
    const url = new URL(window.location.href);
    const tempAccessToken = url.searchParams.get('tempAccessToken');
    console.log('tempAccessToken', tempAccessToken);

    postTempTokenRecovery({ tempAccessToken })
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
      .catch((err) => console.log('err in recovery', err));
  };
  return (
    <MainContainer>
      <FormContainer>
        <div>Logo</div>
        <p>가입내역이 확인되는 회원입니다.</p>
        <RecoveryQuestion>
          <p>탈퇴했던 기존의 계정을 복구할 수 있습니다.</p>
          <p>계정을 복구하시겠습니까?</p>
        </RecoveryQuestion>
        <RecoveryBtn onClick={recoverAccountHandler}>계정 복구</RecoveryBtn>
      </FormContainer>
    </MainContainer>
  );
};

export default AccountRecovery;

const RecoveryQuestion = styled.div`
  > p {
    text-align: center;
    margin-bottom: 3px;
  }
`;
const RecoveryBtn = styled(BlueBtn)`
  width: 305px;
  height: 54px;
`;

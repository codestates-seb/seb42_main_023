import React from 'react';
import styled from 'styled-components';
import { MainContainer, FormContainer } from '../components/common/Container';
import { BlueBtn } from '../components/common/Btn';
import { usePostTempTokenRecoveryMutation } from '../api/tempTokenAPi';
import { LogoSVG } from '../assets/common/LogoSVG';

const AccountRecovery: React.FC = () => {
  const [postTempTokenRecovery] = usePostTempTokenRecoveryMutation();

  const recoverAccountHandler = () => {
    const url = new URL(window.location.href);
    const tempAccessToken = url.searchParams.get('tempAccessToken');

    postTempTokenRecovery({ tempAccessToken })
      .unwrap()
      .then((response: any) => {
        const { name, picture, role } = response;

        localStorage.setItem('name', name);
        localStorage.setItem('picture', picture);
        localStorage.setItem('role', role);

        window.location.href = '/';
      })
      .catch((err: Error) => console.log('err in recovery', err));
  };
  return (
    <MainContainer>
      <FormContainer>
        <LogoSVG />
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

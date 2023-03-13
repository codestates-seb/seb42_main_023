import React from 'react';
import styled from 'styled-components';
import TitleInput from '../components/createPostP/TitleInput';
import BodyInput from '../components/createPostP/BodyInput';
import TagInput from '../components/createPostP/TagInput';
import BlueBtn from '../components/common/BlueBtn';
import WhiteBtn from '../components/common/WhiteBtn';
import { useAppDispatch, useAppSelector } from '../hooks';
import Tag from '../components/common/Tag';

const CreatePost: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const addPostHandler = (): void => {
    console.log('addPost');
  };
  const cancelAddHandler = (): void => {
    console.log('cancel');
  };

  // validation
  const validationTest = () => {
    // id를 입력하지 않은 경우
    // if (!state.login.id) {
    //   id.current.classList.add('active');
    //   dispatch(setErrorMsg3('Email cannot be empty.'));
    // }
    // id를 입력한 경우
    // if (state.login.id) {
    // 이메일 형식 검증
    //   if (emailRegex.test(state.login.id)) {
    //     id.current.classList.remove('active');
    //     dispatch(setErrorMsg3(0));
    //   } else {
    //     id.current.classList.add('active');
    //     dispatch(setErrorMsg3(`The email is not a valid email address.`));
    //   }
    // }
    // password를 입력하지 않은 경우
    // if (!state.login.password) {
    //   password.current.classList.add('active');
    //   dispatch(setErrorMsg4('Password cannot be empty.'));
    // } else {
    //   password.current.classList.remove('active');
    //   dispatch(setErrorMsg4(0));
    // }
  };

  return (
    <Container>
      <TitleInput></TitleInput>
      <BodyInput></BodyInput>
      <TagInput></TagInput>
      <TagConatiner>
        {state.postInput.tag.map((tag, idx) => {
          return <Tag key={idx} content={tag}></Tag>;
        })}
      </TagConatiner>
      <BtnContainer>
        <WhiteBtn
          content="취소"
          width="105px"
          height="40px"
          onClick={cancelAddHandler}
        ></WhiteBtn>
        <BlueBtn
          content="작성"
          width="105px"
          height="40px"
          onClick={addPostHandler}
        ></BlueBtn>
      </BtnContainer>
    </Container>
  );
};

export default CreatePost;

// 페이지 컨테이너
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1000px;
  height: 100%;
  margin: auto;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  width: 1000px;
  height: 40px;
  margin-top: 40px;
`;

const TagConatiner = styled.div`
  display: flex;
  width: 1000px;
  justify-content: start;
  margin-top: 30px;
`;

import React from 'react';
import styled from 'styled-components';
import TitleInput from '../components/createPostP/TitleInput';
import BodyInput from '../components/createPostP/BodyInput';
import TagInput from '../components/createPostP/TagInput';
import { BlueBtn, WhiteBtn } from '../components/common/Btn';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { postsApi } from '../api/postApi';
import _ from 'lodash';

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const state = useAppSelector((state) => state);
  const [createPost] = postsApi.useSetPostMutation();
  const titleValue = state.postInput.title;
  const bodyValue = state.postInput.body;
  const addedImg = state.post.addedImg;
  const removedImg = state.post.removedImg;
  const tag = state.postInput.tag;
  const tagNames = tag.map((tagName) => {
    return { tagName };
  });

  const reqBody = {
    saveImages: {
      addedImages: addedImg,
      removedImages: removedImg,
    },
    title: titleValue,
    content: bodyValue,
    tags: tagNames,
  };

  console.log('reqBody', reqBody);
  const addPostHandler = (): void => {
    if (
      state.postInput.title !== '' &&
      state.postInput.body !== '' &&
      state.postInput.tag.length !== 0 &&
      state.validation.titleErr === '' &&
      state.validation.bodyErr === '' &&
      state.validation.tagErr === ''
    ) {
      createPost(reqBody);
      alert('게시글이 생성되었습니다.');
    } else {
      if (state.validation.titleErr !== '' || !state.postInput.title.length) {
        alert('제목을 다시 확인해 주세요.');
        return;
      }
      if (state.validation.bodyErr !== '' || !state.postInput.body) {
        alert('본문을 다시 확인해 주세요.');
        return;
      }
      if (state.validation.tagErr !== '' || state.postInput.tag.length === 0) {
        alert('태그를 다시 확인해 주세요.');
        return;
      }
    }
  };
  const cancelAddHandler = (): void => {
    navigate('/');
    location.reload();
  };

  return (
    <Container>
      <TitleInput></TitleInput>
      <BodyInput></BodyInput>
      <TagInput></TagInput>

      <BtnContainer>
        <CancelBtn onClick={cancelAddHandler}>취소</CancelBtn>
        <PostBtn onClick={addPostHandler}>작성</PostBtn>
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
  min-width: 1000px;
  height: 100%;
  margin: auto;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  width: 1000px;
  min-width: 1000px;
  height: 40px;
  margin-top: 70px;
  margin-bottom: 30px;
`;

const PostBtn = styled(BlueBtn)`
  width: 105px;
  height: 40px;
`;

const CancelBtn = styled(WhiteBtn)`
  width: 105px;
  height: 40px;
`;

import React, { useEffect } from 'react';
import styled from 'styled-components';
import TitleInput from '../components/createPostP/TitleInput';
import BodyInput from '../components/createPostP/BodyInput';
import TagInput from '../components/createPostP/TagInput';
import { BlueBtn, WhiteBtn } from '../components/common/Btn';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { postsApi } from '../api/postApi';
import _ from 'lodash';
import axios from 'axios';
import Cookies from 'js-cookie';
import { deleteTag, setBody, setTag, setTitle } from '../slices/postInputSlice';

const deleteImgEP = process.env.REACT_APP_SERVER_ADDRESS + '/images/drop';

const CreatePost: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const state = useAppSelector((state) => state);
  const [createPost] = postsApi.useSetPostMutation();
  const titleValue = state.postInput?.title;
  const bodyValue = state.postInput?.body;
  const addedImg = state.post?.addedImg;
  const removedImg = state.post?.removedImg;
  const tag = state.postInput?.tag;
  const tagNames = tag.map((tagName: string) => {
    return { tagName };
  });
  const accsessToken = Cookies.get('Authorization');

  const reqBody = {
    saveImages: {
      addedImages: addedImg,
      removedImages: removedImg,
    },
    title: titleValue,
    content: bodyValue,
    tagNames: tagNames,
  };

  const deletedImg = {
    removedImages: removedImg,
  };

  // 페이지 이동 시 스크롤 최상단 이동
  useEffect(() => {
    if ('postInput' in state && state.postInput?.title) dispatch(setTitle(''));
    if ('postInput' in state && state.postInput?.body) dispatch(setBody(''));
    if ('postInput' in state && state.postInput?.tag) {
      tag.forEach((tag) => dispatch(deleteTag(tag)));
    }
    scrollTo(0, 0);
  }, []);

  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    axios.delete(deleteImgEP, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accsessToken,
      },
      withCredentials: true,
      data: deletedImg,
    });
  };

  useEffect(() => {
    (() => {
      window.addEventListener('beforeunload', preventClose);
    })();

    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  }, []);

  const deleteImg = () => {
    axios.delete(deleteImgEP, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accsessToken,
      },
      withCredentials: true,
      data: deletedImg,
    });
  };

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
      navigate('/');
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
        alert('태그를 1개 이상 추가해 주세요.');
        return;
      }
    }
  };
  const cancelAddHandler = (): void => {
    navigate('/');
  };

  return (
    <Container>
      <TitleInput></TitleInput>
      <BodyInput></BodyInput>
      <TagInput></TagInput>

      <BtnContainer>
        <CancelBtn
          onClick={() => {
            //.TODO
            deleteImg();
            cancelAddHandler();
          }}
        >
          취소
        </CancelBtn>
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

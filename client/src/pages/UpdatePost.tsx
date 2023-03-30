import React, { useEffect } from 'react';
import styled from 'styled-components';
import TitleInput from '../components/updatePostP/TitleInput';
import BodyInput from '../components/updatePostP/BodyInput';
import TagInput from '../components/updatePostP/TagInput';
import { BlueBtn, WhiteBtn } from '../components/common/Btn';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { postsApi } from '../api/postApi';
import _ from 'lodash';
import { setBody, setTitle } from '../slices/postInputSlice';
import Cookies from 'js-cookie';
import axios from 'axios';

const deleteImgEP = process.env.REACT_APP_SERVER_ADDRESS + '/images/drop';
const UpdatePost: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const navigate = useNavigate();
  const params = useParams();
  const postId = Number(params.postId);
  const [updatePost] = postsApi.useUpdatePostMutation();
  const postQuery = postsApi.useGetPostQuery({ postId });
  const { data } = postQuery;
  const title = data?.title;
  const body = data?.content;
  const titleValue = state.postInput?.title;
  const bodyValue = state.postInput?.body;
  const addedImg = state.post?.addedImg;
  const removedImg = state.post?.removedImg || [];
  const remainImg = state.post?.remainImg;
  const tag = state.postInput?.tag;
  const tagNames = tag.map((tagName) => {
    return { tagName };
  });
  const accsessToken = Cookies.get('Authorization');

  useEffect(() => {
    dispatch(setTitle(title));
    dispatch(setBody(body));
  }, [body]);

  const remain = _.differenceBy(remainImg!, removedImg!, 'imageId');
  const reqBody = {
    postId: postId,
    saveImages: {
      remainImages: remain || [],
      addedImages: addedImg || [],
      removedImages: removedImg || [],
    },
    title: titleValue,
    content: bodyValue,
    tagNames: tagNames,
  };

  const deletedImg = {
    removedImages: removedImg,
  };

  console.log('remain', remain);
  console.log('reqBody', reqBody);
  console.log('deletedImg', deletedImg);
  const addPostHandler = (): void => {
    if (
      state.postInput.title !== '' &&
      state.postInput.body !== '' &&
      state.postInput.tag.length !== 0 &&
      state.validation.titleErr === '' &&
      state.validation.bodyErr === '' &&
      state.validation.tagErr === ''
    ) {
      updatePost(reqBody);
      navigate('/');
      setTimeout(() => {
        location.reload();
      }, 1500);
    } else {
      if (state.validation.titleErr !== '' || state.postInput.title === '') {
        alert('제목을 다시 확인해 주세요.');
        return;
      }
      if (state.validation.bodyErr !== '' || state.postInput.body === '') {
        alert('본문을 다시 확인해 주세요.');
        return;
      }
      if (state.validation.tagErr !== '' || state.postInput.tag.length === 0) {
        alert('태그를 1개 이상 추가해 주세요.');
        return;
      }
    }
  };
  // 페이지 이동 시 스크롤 최상단 이동
  useEffect(() => {
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
        <CancleBtn
          onClick={() => {
            //.TODO
            deleteImg();
            cancelAddHandler();
          }}
        >
          취소
        </CancleBtn>
        <PostBtn onClick={addPostHandler}>수정</PostBtn>
      </BtnContainer>
    </Container>
  );
};

export default UpdatePost;

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
  margin-top: 70px;
  margin-bottom: 30px;
`;
const PostBtn = styled(BlueBtn)`
  width: 105px;
  height: 40px;
`;

const CancleBtn = styled(WhiteBtn)`
  width: 105px;
  height: 40px;
`;

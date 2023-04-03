import React, { useEffect } from 'react';
import styled from 'styled-components';
import TitleInput from '../components/createPostP/TitleInput';
import BodyInput from '../components/createPostP/BodyInput';
import TagInput from '../components/createPostP/TagInput';
<<<<<<< HEAD
import { BlueBtn, WhiteBtn } from '../components/common/Btn';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { postsApi } from '../api/postApi';
import _ from 'lodash';
import Cookies from 'js-cookie';
import { deleteTag, setBody, setTagContent } from '../slices/postInputSlice';
import { setBodyErr, setTitleErr } from '../slices/validationSlice';
=======
import BlueBtn from '../components/common/BlueBtn';
import WhiteBtn from '../components/common/WhiteBtn';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d

const CreatePost: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const state = useAppSelector((state) => state);
<<<<<<< HEAD
  const titleValue = state.postInput?.title;
  const bodyValue = state.postInput?.body;
  const addedImg = state.post?.addedImg;
  const removedImg = state.post?.removedImg;
  const tag = state.postInput?.tag;
  const tagNames = tag.map((tagName: string) => {
    return { tagName };
  });

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

  const [createPost] = postsApi.useSetPostMutation();
  const [deleteImage] = postsApi.useDeleteImagesMutation();

  // 로그인 확인
  const auth = Cookies.get('Authorization');
  const role = localStorage.getItem('role');
  const name = localStorage.getItem('name');
  const isLogin = auth && role && name;

  useEffect(() => {
    if (!isLogin) navigate('/login');
    dispatch(setBodyErr(''));
    dispatch(setTitleErr(''));
  }, []);

  // 페이지 이동 시 state 관리 및 스크롤 이동
  useEffect(() => {
    if ('postInput' in state && state.postInput?.body) dispatch(setBody(''));
    if ('postInput' in state && state.postInput?.tagContent) {
      dispatch(setTagContent(''));
    }
    if ('postInput' in state && state.postInput?.tag) {
      tag.forEach((tag) => dispatch(deleteTag(tag)));
    }
    scrollTo(0, 0);
  }, [params]);

  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    deleteImage({ deletedImg });
  };

  useEffect(() => {
    (() => {
      window.addEventListener('beforeunload', preventClose);
    })();

    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  }, []);

=======
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
  const addPostHandler = (): void => {
    if (
      state.postInput.title !== '' &&
      state.postInput.body !== '' &&
      state.postInput.tag.length !== 0 &&
      state.validation.titleErr === '' &&
      state.validation.bodyErr === '' &&
      state.validation.tagErr === ''
    ) {
<<<<<<< HEAD
      createPost(reqBody)
        .unwrap()
        .then((data) => {
          navigate(`/posts/${data.postsId}`);
        });
=======
      alert('게시글이 생성되었습니다.');
      // navigate('새로운 게시글 페이지 경로');
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
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
  const cancelAddHandler = (): void => {
    navigate('/');
  };

  return (
    <Container>
      <TitleInput></TitleInput>
      <BodyInput></BodyInput>
      <TagInput></TagInput>

      <BtnContainer>
<<<<<<< HEAD
        <CancelBtn
          onClick={() => {
            deleteImage({ deletedImg });
            cancelAddHandler();
          }}
        >
          취소
        </CancelBtn>
        <PostBtn onClick={addPostHandler}>작성</PostBtn>
=======
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
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
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
  margin-top: 70px;
  margin-bottom: 30px;
`;

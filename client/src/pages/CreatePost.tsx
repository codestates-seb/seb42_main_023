import React, { useEffect } from 'react';
import styled from 'styled-components';
import TitleInput from '../components/createPostP/TitleInput';
import BodyInput from '../components/createPostP/BodyInput';
import TagInput from '../components/createPostP/TagInput';
import { BlueBtn, WhiteBtn } from '../components/common/Btn';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { postsApi } from '../api/postApi';
import { deleteTag, setBody, setTagContent } from '../slices/postInputSlice';
import { setBodyErr, setTitleErr } from '../slices/validationSlice';
import { checkIsLogin } from '../../src/util/checkIsLogin';

const CreatePost: React.FC = () => {
  const isLogin = checkIsLogin();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const state = useAppSelector((state) => state);
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
  const [addPost] = postsApi.useAddPostMutation();
  const [deleteImage] = postsApi.useDeleteImagesMutation();

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
      return;
    }
    dispatch(setBodyErr(''));
    dispatch(setTitleErr(''));

    const cancelUpload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      deleteImage({ deletedImg });
      e.returnValue = '';
    };
    (() => {
      window.addEventListener('beforeunload', cancelUpload);
    })();

    return () => {
      window.removeEventListener('beforeunload', cancelUpload);
    };
  }, []);

  useEffect(() => {
    if ('postInput' in state && state.postInput?.body) {
      dispatch(setBody(''));
      return;
    }
    if ('postInput' in state && state.postInput?.tagContent) {
      dispatch(setTagContent(''));
      return;
    }
    if ('postInput' in state && state.postInput?.tag) {
      tag.forEach((tag) => dispatch(deleteTag(tag)));
      return;
    }
    scrollTo(0, 0);
  }, [params]);

  const addPostHandler = (): void => {
    if (
      state.postInput.title !== '' &&
      state.postInput.body !== '' &&
      state.postInput.tag.length !== 0 &&
      state.validation.titleErr === '' &&
      state.validation.bodyErr === '' &&
      state.validation.tagErr === ''
    ) {
      addPost(reqBody)
        .unwrap()
        .then((data) => {
          navigate(`/posts/${data.postsId}`);
        });
    }
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
  };
  const cancelHandler = (): void => {
    deleteImage({ deletedImg });
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
            deleteImage({ deletedImg });
            cancelHandler();
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
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1000px;
  min-width: 640px;
  margin: auto;
  @media (max-width: 1100px) {
    width: 90vw;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  width: 1000px;
  min-width: 640px;
  height: 40px;
  margin-top: 70px;
  margin-bottom: 30px;
  @media (max-width: 1100px) {
    width: 90vw;
  }
`;

const PostBtn = styled(BlueBtn)`
  width: 105px;
  height: 40px;
`;

const CancelBtn = styled(WhiteBtn)`
  width: 105px;
  height: 40px;
`;

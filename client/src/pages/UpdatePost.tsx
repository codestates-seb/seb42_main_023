import React, { useEffect } from 'react';
import styled from 'styled-components';
import TitleInput from '../components/updatePostP/TitleInput';
import BodyInput from '../components/updatePostP/BodyInput';
import TagInput from '../components/updatePostP/TagInput';
import { BlueBtn, WhiteBtn } from '../components/common/Btn';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { postsApi } from '../api/postApi';
import differenceBy from 'lodash/differenceBy';
import {
  deleteTag,
  setBody,
  setIsEdit,
  setTag,
  setTitle,
} from '../slices/postInputSlice';
import Loading from '../components/common/Loading';
import { setBodyErr, setTitleErr } from '../slices/validationSlice';
import { checkIsLogin } from '../../src/util/checkIsLogin';

const UpdatePost: React.FC = () => {
  const isLogin = checkIsLogin();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const navigate = useNavigate();
  const params = useParams();
  const postId = Number(params.postId);
  const postQuery = postsApi.useGetPostQuery({ postId });
  const { data, isSuccess } = postQuery;
  const title = data?.title;
  const body = data?.content;
  const tags = data?.tags;
  const titleValue = state.postInput?.title;
  const bodyValue = state.postInput?.body;
  const addedImg = state.post?.addedImg;
  const removedImg = state.post?.removedImg || [];
  const remainImg = state.post?.remainImg;
  const tag = state.postInput?.tag;
  const tagNames = tag.map((tagName) => {
    return { tagName };
  });
  const remain = differenceBy(remainImg!, removedImg!, 'imageId');
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
    removedImages: remain,
  };
  const [updatePost] = postsApi.useUpdatePostMutation();
  const [deleteImage] = postsApi.useDeleteImagesMutation();

  useEffect(() => {
    scrollTo(0, 0);
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
    dispatch(setTitle(''));
    dispatch(setBody(''));
    tags?.forEach((tag: string) => {
      dispatch(deleteTag(tag));
    });
    dispatch(setIsEdit(false));
  }, [postId]);

  useEffect(() => {
    dispatch(setTitle(title));
    dispatch(setBody(body));
    tags?.forEach((tag: string) => {
      dispatch(setTag(tag));
    });
    dispatch(setIsEdit(false));
  }, [data]);

  const canceldHandler = (): void => {
    deleteImage({ deletedImg });
    navigate('/');
    return;
  };

  const addPostHandler = (): void => {
    if (!state.postInput.isEdit) {
      alert('게시물에 변경사항이 없습니다.');
      return;
    }
    if (
      state.postInput.title !== '' &&
      state.postInput.body !== '' &&
      state.postInput.tag.length !== 0 &&
      state.validation.titleErr === '' &&
      state.validation.bodyErr === '' &&
      state.validation.tagErr === ''
    ) {
      updatePost(reqBody)
        .unwrap()
        .then(() => navigate(`/posts/${data.postId}`));
    }
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
  };

  return (
    <Container>
      {!isSuccess ? (
        <Loading></Loading>
      ) : (
        <>
          <TitleInput></TitleInput>
          <BodyInput></BodyInput>
          <TagInput></TagInput>
          <BtnContainer>
            <CancleBtn
              onClick={() => {
                deleteImage({ deletedImg });
                canceldHandler();
              }}
            >
              취소
            </CancleBtn>
            <PostBtn onClick={addPostHandler}>수정</PostBtn>
          </BtnContainer>
        </>
      )}
    </Container>
  );
};

export default UpdatePost;

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

const CancleBtn = styled(WhiteBtn)`
  width: 105px;
  height: 40px;
`;

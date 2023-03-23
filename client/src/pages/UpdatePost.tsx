import React, { useEffect } from 'react';
import styled from 'styled-components';
import TitleInput from '../components/updatePostP/TitleInput';
import BodyInput from '../components/updatePostP/BodyInput';
import TagInput from '../components/updatePostP/TagInput';
import { BlueBtn, WhiteBtn } from '../components/common/Btn';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { postsApi } from '../api/postApi';
import { setBody, setTag, setTitle } from '../slices/postInputSlice';

const UpdatePost: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const navigate = useNavigate();
  const params = useParams();
  const postId = Number(params.postId);
  const postQuery = postsApi.useGetPostQuery({ postId });
  const { data } = postQuery;
  const title = data?.posts[0].title;
  const body = data?.posts[0].content;

  useEffect(() => {
    dispatch(setTitle(title));
    dispatch(setBody(body));
    // dispatch(setTitle(tag));
  }, [body]);

  const addPostHandler = (): void => {
    if (
      state.postInput.title !== '' &&
      state.postInput.body !== '' &&
      state.postInput.tag.length !== 0 &&
      state.validation.titleErr === '' &&
      state.validation.bodyErr === '' &&
      state.validation.tagErr === ''
    ) {
      alert('게시글이 수정되었습니다.');
      navigate(`posts/${postId}`);
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
        alert('태그를 다시 확인해 주세요.');
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
        <CancleBtn onClick={cancelAddHandler}>취소</CancleBtn>
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

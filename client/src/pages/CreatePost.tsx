import React from 'react';
import styled from 'styled-components';
import TitleInput from '../components/createPostP/TitleInput';
import BodyInput from '../components/createPostP/BodyInput';
import TagInput from '../components/createPostP/TagInput';
import { BlueBtn, WhiteBtn } from '../components/common/Btn';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { postsApi } from '../api/postApi';

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const state = useAppSelector((state) => state);
  const [createPost] = postsApi.useSetPostMutation();
  const titleValue = state.postInput.title;
  const bodyValue = state.postInput.body;
  const currentImg = state.post.currentImg;
  const removedImg = state.post.removedImg;
  const tag = state.postInput.tag;
  const tagNames = tag.map((tagName) => {
    return { tagName };
  });

  //TODO image 배열을 객체형태로 바꾸어서 넣어줘야한다.
  //TODO imageId 값과 name은 서버에 업로드된 시점에 응답으로 요청이 오면 처리 해줘야한다.
  // 	"saveImages" : {
  //     "addedImages" : [
  //         {
  //             "imageId" : 123,
  //             "imageName" : "imageFileName"
  //         },
  //         {
  //             "imageId" : 123,
  //             "imageName" : "imageFileName"
  //         }
  //     ],
  //     "removedImages" : [
  //         {
  //             "imageId" : 123,
  //             "imageName" : "imageFileName"
  //         },
  //         {
  //             "imageId" : 123,
  //             "imageName" : "imageFileName"
  //         }
  //     ]
  // }

  // 게시글 생성시 요청 Body

  const savaImages = {
    addedImages: currentImg,
    removedImages: removedImg,
  };
  const reqBody = {
    savaImages: {
      addedImages: currentImg,
      removedImages: removedImg,
    },
    title: titleValue,
    content: bodyValue,
    tagNames: tagNames,
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
      createPost({ savaImages, titleValue, bodyValue, tagNames });
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

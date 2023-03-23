import React, { useEffect, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setBody } from '../../slices/postInputSlice';
import { setBodyErr } from '../../slices/validationSlice';
import { postsApi } from '../../api/postApi';
import { useParams } from 'react-router-dom';
import {
  setCurrentImg,
  setRemovedImg,
  setAddedImg,
} from '../../slices/postSlice';
import _ from 'lodash';

const BodyInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const quillRef = useRef<ReactQuill>();
  const state = useAppSelector((state) => state);
  const params = useParams();
  const postId = Number(params.postId);
  const bodyValue = state.postInput?.body;
  const addedImg = state.post?.addedImg;
  const postQuery = postsApi.useGetPostQuery({ postId });
  const { data } = postQuery;
  //TODO body 데이터는 태그 형태로 들어오고 => 태그를 제거한 상태로 각 요소에 배치해야함
  // const pattern = /<[^>]*>?/g;
  //TODO string.replace(/<[^>]*>?/g, '');
  //TODO 받아온 body 데이터에서 이미지를 추출해서 remainImage, addedImages, removedImages를 요청 바디에 보내줘야함
  // 초기 이미지, 추가한 이미지, 제거한 이미지
  // 전체 이미지 = 초기 이미지 + 추가한 이미지
  // 제거한 이미지 = 전채 이미지에서 현재 이미지 제외
  const body = data?.posts[0].content;
  const arr1 = [
    { imageId: 1, imageName: 'a' },
    { imageId: 2, imageName: 'b' },
    { imageId: 3, imageName: 'c' },
  ];
  const arr2 = [
    { imageId: 1, imageName: 'a' },
    { imageId: 2, imageName: 'b' },
  ];
  // const arr3 = _.difference(arr2, arr1);
  // console.log('new', arr3);
  // const index = [1, 2];
  // const result = [];
  // for (const idx of index) {
  //   const result = arr1.result.filter((el) => {
  //     if (el.imageId === idx) false;
  //   });
  // }
  // arr1.filter((el) => {});
  // console.log('result', result);

  //  문자열을 HTML 요소로 변환
  const stringToHTML = function (str: string): HTMLElement {
    const dom = document.createElement('div');
    dom.innerHTML = str;
    return dom;
  };

  // 본문 내용이 바뀔 때 마다 이미지 체크
  useEffect(() => {
    if (bodyValue) imageCheck();
  }, [bodyValue]);

  // 본문 value 확인
  function valueCheck(): void {
    dispatch(setBody(quillRef?.current?.value as string));
    validationTest();
  }
  // 본문 이미지 확인
  function imageCheck(): void {
    // 이미지 처리
    const pattern = /((?<=<img......)(.*?)(?=.>))/gi;
    console.log('bodyValue', bodyValue);
    const currentImg = bodyValue!.match(pattern)!;
    const removedImg = addedImg?.filter((img) => {
      return !currentImg?.includes(img);
    });
    dispatch(setCurrentImg(currentImg));
    dispatch(setRemovedImg(removedImg));
  }

  // 유효성 검사
  const validationTest = (): void => {
    const bodyValue = state.postInput.body;
    const html = stringToHTML(bodyValue);
    const realValue = html.textContent;
    console.log(realValue?.length);
    if (realValue) {
      if (realValue?.length < 9) {
        dispatch(setBodyErr('본문은 10자 이상 작성해주세요.'));
      }
      if (realValue?.length >= 9) {
        dispatch(setBodyErr(''));
      }
    }
  };

  // 에디터 이미지 핸들러
  const imageHandler = (): void => {
    // 이미지를 저장할  DOM 생성
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', async () => {
      const file = input.files![0];
      const formData = new FormData();
      formData.append('img', file);
      console.log('formData', formData);
      try {
        //TODO 서버 url로 변경해야함 그리고 이미지 id와 이름을 받아와야함 => 상태 관리 필요(데이터 형식 변경)
        const result = await axios.post('http://localhost:4100/img', formData);
        const { data } = result;
        console.log(data);
        const IMG_URL = result?.data.url;
        dispatch(setAddedImg(IMG_URL));
        //   {
        //     "imageId" : 123,
        //     "imageName" : "imageFileName"
        //   }
        const editor = quillRef.current!.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range!.index, 'image', IMG_URL);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          ['clean'],
        ],
        clipboard: {
          matchVisual: false,
        },
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  return (
    <>
      {state.validation.bodyErr === '' ? (
        <EditorContainer>
          <Editor className="editor">
            <ReactQuill
              className="quill-edit"
              ref={(element): void => {
                if (element !== null) {
                  quillRef.current = element;
                }
              }}
              theme="snow"
              placeholder="게시글 내용을 입력하세요."
              value={state?.postInput.body || ''}
              onChange={valueCheck}
              modules={modules}
              formats={formats}
            />
          </Editor>
        </EditorContainer>
      ) : (
        <EditorContainer>
          <Editor className="editor">
            <ReactQuill
              className="quill-edit"
              ref={(element): void => {
                if (element !== null) {
                  quillRef.current = element;
                }
              }}
              theme="snow"
              placeholder="게시글 내용을 입력하세요."
              value={state?.postInput.body || ''}
              onChange={valueCheck}
              modules={modules}
              formats={formats}
            />
          </Editor>
          <Error>{state.validation.bodyErr}</Error>
        </EditorContainer>
      )}
    </>
  );
};

export default BodyInput;
const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Editor = styled.div`
  width: 100%;
  height: 40vh;
  margin-bottom: 60px;
  .quill-edit {
    height: 100%;
  }
`;

const Error = styled.div`
  width: 100%;
  height: 25px;
  color: red;
  padding: 0 10px 0 10px;
  margin-bottom: 5px;
`;

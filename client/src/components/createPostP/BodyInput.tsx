import React, { useEffect, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setBody } from '../../slices/postInputSlice';
import { setBodyErr } from '../../slices/validationSlice';
import {
  setCurrentImg,
  setRemovedImg,
  setAddedImg,
} from '../../slices/postSlice';
import Cookies from 'js-cookie';
import { logDOM } from '@testing-library/react';

const url = process.env.REACT_APP_SERVER_ADDRESS + '/images';
const BodyInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const quillRef = useRef<ReactQuill>();
  const bodyValue = state.postInput.body;
  const addedImg = state.post?.addedImg;
  const accsessToken = Cookies.get('Authorization');

  //  문자열을 HTML currentImg 변환
  const stringToHTML = function (str: string): HTMLElement {
    const dom = document.createElement('div');
    dom.innerHTML = str;
    return dom;
  };

  // 본문 value 확인
  function valueCheck(): void {
    dispatch(setBody(quillRef?.current?.value as string));
    validationTest();
  }

  // 본문 이미지 확인
  function imageCheck(): void {
    // 이미지 처리
    //TODO 문열 형태를 map을 이용해서 배열로 만들어 줘야함
    const pattern = /((?<=<img......)(.*?)(?=...>))/gi;
    // test

    const testValue = `<img src="abc.png" />12312312432432123<img src="abcd.png" />`;
    const currentImg = testValue.match(pattern)!;
    console.log('currentImg', currentImg);
    const removedImg = addedImg?.filter((img) => {
      return !currentImg?.includes(img);
    });
    dispatch(setCurrentImg(currentImg));
    dispatch(setRemovedImg(removedImg));
  }

  // 유효성 검사
  const validationTest = (): void => {
    const html = stringToHTML(bodyValue);
    const realValue = html.textContent;

    if (realValue) {
      if (realValue?.length < 9) {
        dispatch(setBodyErr('본문은 10자 이상 작성해주세요.'));
      }
      if (realValue?.length >= 9) {
        dispatch(setBodyErr(''));
      }
    }
  };

  // 본문 내용이 바뀔 때 마다 이미지 체크
  useEffect(() => {
    imageCheck();
  }, [bodyValue]);

  // 에디터 이미지
  const imageHandler = (): void => {
    // 이미지를 저장할  DOM 생성
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    // input에 변화가 생길 경우  이미지를 선택
    input.addEventListener('change', async () => {
      const file = input.files![0];
      const formData = new FormData();
      formData.append('image', file);
      console.log('formData', formData);

      try {
        //TODO 서버 url로 변경해야함 그리고 이미지 id와 이름을 받아와야함 => 상태 관리 필요
        const result = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: accsessToken,
          },
          withCredentials: true,
        });

        const { data } = result;
        console.log('resData', data);
        const { imageId, imageName } = data;

        const ImgUrl = process.env.REACT_APP_S3_ADDRESS + '/' + imageName;
        console.log('ImgUrl', ImgUrl);
        const imgObj = {
          imageId,
          imageName,
        };
        console.log('imgObj', imgObj);
        dispatch(setAddedImg(imgObj));
        const editor = quillRef.current!.getEditor();
        const range = editor.getSelection();
        // editor.insertEmbed(range!.index, 'image', ImgUrl);
        editor.insertEmbed(range!.index, 'image', ImgUrl);
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
              value={state.postInput.body}
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
              value={state.postInput.body}
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

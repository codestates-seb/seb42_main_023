import React, { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setBody } from '../../slices/postInputSlice';
import { setBodyErr } from '../../slices/validationSlice';

const BodyInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const quillRef = useRef<ReactQuill>();
  const state = useAppSelector((state) => state);

  //  문자열을 HTML 요소로 변환
  const stringToHTML = function (str: string): HTMLElement {
    const dom = document.createElement('div');
    dom.innerHTML = str;
    return dom;
  };

  // 본문 value 확인
  function valueCheck(content: string): void {
    dispatch(setBody(content));
    validationTest();
  }

  // 유효성 검사
  const validationTest = (): void => {
    const bodyValue = state.postInput.body;
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

  // 에디터 이미지 핸들러
  const imageHandler = (): void => {
    // 이미지를 저장할  DOM 생성
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    // input이 클릭되면 파일 선택창이 나타난다.

    // input에 변화가 생길 경우  이미지를 선택
    input.addEventListener('change', async () => {
      const file = input.files![0];

      // multer에 맞는 형식으로 데이터 가공
      // 백엔드에 사항에 맞게 수정 필요
      const formData = new FormData();
      formData.append('img', file);
      console.log('formData', formData);

      try {
        // 백엔드 multer라우터에 이미지를 보낸다.
        const result = await axios.post('http://localhost:4100/img', formData);
        console.log('성공 시, 백엔드가 보내주는 데이터', result.data.url);
        const IMG_URL = result.data.url;

        // 에디터 객체
        const editor = quillRef.current!.getEditor();

        // 현재 에디터 커서 위치값 추적 및 이미지 삽입
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

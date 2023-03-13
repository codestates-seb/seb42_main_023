import React, { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setBody } from '../../slices/postInputSlice';

const BodyInput: React.FC = () => {
  const quillRef = useRef<ReactQuill>();
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  function valueCheck(content: string): void {
    dispatch(setBody(content));
  }

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
          [{ header: [1, 2, 3, 4, 5, false] }],
          ['italic', 'underline', 'strike', 'blockquote'],
          [
            { align: '' },
            { align: 'center' },
            { align: 'right' },
            { align: 'justify' },
          ],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          [{ color: [] }, { background: [] }],
          ['clean'],
        ],
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
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ];

  return (
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
  );
};

export default BodyInput;

const Editor = styled.div`
  width: 100%;
  height: 40vh;
  .quill-edit {
    height: 100%;
  }
`;

import React, { useEffect, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Cookies from 'js-cookie';
import 'react-quill/dist/quill.snow.css';
import { setBody } from '../../slices/postInputSlice';
import { setBodyErr } from '../../slices/validationSlice';
import {
  setCurrentImg,
  setRemovedImg,
  setAddedImg,
} from '../../slices/postSlice';

interface ImgObj {
  imagedId: number;
  imageName: string;
}

const uploadImgEp = process.env.REACT_APP_SERVER_ADDRESS + '/images';
const BodyInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const quillRef = useRef<ReactQuill>();
  const bodyValue = state.postInput.body;
  const addedImg = state.post?.addedImg;
  const accsessToken = Cookies.get('Authorization');

  const stringToHTML = function (str: string): HTMLElement {
    const dom = document.createElement('div');
    dom.innerHTML = str;
    return dom;
  };

  function checkValue(): void {
    dispatch(setBody(quillRef?.current?.value as string));
    validateBody();
  }

  function checkImage(): void {
    const pattern =
      /((?<=<img..........................................................)(.*?)(?=.>))/gi;
    const currentImg = bodyValue.match(pattern)!;
    const removedImg = addedImg?.filter((obj: ImgObj) => {
      return !currentImg?.includes(obj.imageName);
    });
    dispatch(setCurrentImg(currentImg));
    dispatch(setRemovedImg(removedImg));
  }

  const validateBody = (): void => {
    const html = stringToHTML(bodyValue);
    const realValue = html.textContent;

    if (realValue) {
      if (realValue?.length < 9 || realValue?.length === 0) {
        dispatch(setBodyErr('본문은 10자 이상 작성해주세요.'));
      }
      if (realValue?.length === 1) {
        dispatch(setBodyErr(''));
      }
      if (realValue?.length >= 9) {
        dispatch(setBodyErr(''));
      }
    }
  };

  useEffect(() => {
    checkImage();
  }, [bodyValue]);

  const imageHandler = (): void => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', async () => {
      const file = input.files![0];
      const formData = new FormData();
      formData.append('image', file);

      try {
        const result = await axios.post(uploadImgEp, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: accsessToken,
          },
          withCredentials: true,
        });

        const { data } = result;
        const { imageId, imageName } = data;
        const ImgUrl = process.env.REACT_APP_S3_ADDRESS + '/' + imageName;
        const imgObj = {
          imageId,
          imageName,
        };

        dispatch(setAddedImg(imgObj));
        const editor = quillRef.current!.getEditor();
        const range = editor.getSelection();

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
              placeholder="게시글 내용을 입력하세요.(2MB 이하의 이미지만  추가 가능합니다.)"
              value={state.postInput.body}
              onChange={checkValue}
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
              placeholder="게시글 내용을 입력하세요.(2MB 이하의 이미지만  추가 가능합니다.)"
              value={state.postInput.body}
              onChange={checkValue}
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

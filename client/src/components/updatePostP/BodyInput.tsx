<<<<<<< HEAD
// 패키지 등
import React, { useEffect, useMemo, useRef } from 'react';
=======
import React, { useMemo, useRef } from 'react';
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
import ReactQuill from 'react-quill';
import axios from 'axios';
import styled from 'styled-components';
import _ from 'lodash';
import Cookies from 'js-cookie';
import { useAppDispatch, useAppSelector } from '../../hooks';
<<<<<<< HEAD
import { useParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
// API
import { postsApi } from '../../api/postApi';
// slices
import { setBody, setIsEdit } from '../../slices/postInputSlice';
import { setBodyErr } from '../../slices/validationSlice';
import {
  setCurrentImg,
  setRemovedImg,
  setAddedImg,
  setRemaindImg,
  setTotalmg,
} from '../../slices/postSlice';
=======
import { setBody } from '../../slices/postInputSlice';
import { setBodyErr } from '../../slices/validationSlice';
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d

interface ImgObj {
  imagedId: number;
  imageName: string;
}

const url = process.env.REACT_APP_SERVER_ADDRESS + '/images';
const BodyInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const quillRef = useRef<ReactQuill>();
  const state = useAppSelector((state) => state);
<<<<<<< HEAD
  const params = useParams();
  const postId = Number(params.postId);
  const postQuery = postsApi.useGetPostQuery({ postId });
  const { data } = postQuery;
  const bodyValue = state.postInput?.body;
  const removedImg = state.post?.removedImg;
  const totalImg = state.post?.totalImg;
  const remainImg = data?.images;
  const accsessToken = Cookies.get('Authorization');

  const img: Array<any> = _.cloneDeep(totalImg!);
=======
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d

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
<<<<<<< HEAD

  // 본문 이미지 확인
  function imageCheck(): void {
    // 이미지 처리
    const pattern =
      /((?<=<img..........................................................)(.*?)(?=.>))/gi;
    const currentImg = bodyValue.match(pattern)!;
    const removedImg = totalImg?.filter((obj: ImgObj) => {
      return !currentImg?.includes(obj.imageName);
    });

    dispatch(setCurrentImg(currentImg));
    dispatch(setRemovedImg(_.uniqBy(removedImg!, 'imageId')));
  }
=======
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d

  // 유효성 검사
  const validationTest = (): void => {
    const bodyValue = state.postInput.body;
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

  //  본문 내용이 바뀔 때 마다 이미지 체크
  useEffect(() => {
    (remainImg as Array<object>)?.map((el: object) => {
      dispatch(setTotalmg(el));
    });
    if ((removedImg! as Array<object>)?.length === 0 && totalImg) {
      dispatch(setRemaindImg(_.uniqBy(totalImg!, 'imageId')));
    }
    if ((removedImg! as Array<object>)?.length !== 0) {
    }
    if (bodyValue) imageCheck();
  }, [bodyValue]);

  // 에디터 이미지 핸들러
  const imageHandler = (): void => {
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
<<<<<<< HEAD
      formData.append('image', file);
      try {
        const result = await axios.post(url, formData, {
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
        dispatch(setTotalmg(imgObj));
=======
      formData.append('img', file);
      console.log('formData', formData);

      try {
        // 백엔드 multer라우터에 이미지를 보낸다.
        const result = await axios.post('http://localhost:4100/img', formData);
        console.log('성공 시, 백엔드가 보내주는 데이터', result.data.url);
        const IMG_URL = result.data.url;

        // 에디터 객체
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
        const editor = quillRef.current!.getEditor();

        // 현재 에디터 커서 위치값 추적 및 이미지 삽입
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
<<<<<<< HEAD
              placeholder="게시글 내용을 입력하세요.(2MB 이하의 이미지만  추가 가능합니다.)"
              value={state?.postInput.body}
              onChange={() => {
                valueCheck();
                dispatch(setIsEdit(true));
              }}
=======
              placeholder="게시글 내용을 입력하세요."
              value={state.postInput.body}
              onChange={valueCheck}
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
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
<<<<<<< HEAD
              placeholder="게시글 내용을 입력하세요.(2MB 이하의 이미지만  추가 가능합니다.)"
              value={state?.postInput.body}
              onChange={() => {
                valueCheck();
                dispatch(setIsEdit(true));
              }}
=======
              placeholder="게시글 내용을 입력하세요."
              value={state.postInput.body}
              onChange={valueCheck}
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
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

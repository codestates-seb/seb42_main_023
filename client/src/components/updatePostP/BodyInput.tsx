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
  setRemaindImg,
  setTotalmg,
} from '../../slices/postSlice';
import _ from 'lodash';
import Cookies from 'js-cookie';

interface ImgObj {
  imagedId: number;
  imageName: string;
}

const url = process.env.REACT_APP_SERVER_ADDRESS + '/images';
const BodyInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const quillRef = useRef<ReactQuill>();
  const state = useAppSelector((state) => state);
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

  //  문자열을 HTML 요소로 변환
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
    const pattern =
      /((?<=<img..........................................................)(.*?)(?=.>))/gi;
    const currentImg = bodyValue.match(pattern)!;
    const removedImg = totalImg?.filter((obj: ImgObj) => {
      return !currentImg?.includes(obj.imageName);
    });

    dispatch(setCurrentImg(currentImg));
    dispatch(setRemovedImg(_.uniqBy(removedImg!, 'imageId')));
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

  //  본문 내용이 바뀔 때 마다 이미지 체크
  useEffect(() => {
    (remainImg as Array<object>)?.map((el: object) => {
      dispatch(setTotalmg(el));
    });
    if ((removedImg! as Array<object>)?.length === 0 && totalImg) {
      dispatch(setRemaindImg(_.uniqBy(totalImg!, 'imageId')));
    }
    if ((removedImg! as Array<object>)?.length !== 0) {
      console.log(
        'testasdasdasdas',
        _.differenceBy(remainImg, removedImg!, 'imageId'),
      );

      // dispatch(
      //   setRemaindImg(_.differenceBy(remainImg, removedImg!, 'imageId')),
      // );
    }
    if (bodyValue) imageCheck();
  }, [bodyValue]);

  // 에디터 이미지 핸들러
  const imageHandler = (): void => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', async () => {
      const file = input.files![0];
      const formData = new FormData();
      formData.append('image', file);
      console.log('formData', formData);
      console.log('url', url);
      try {
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
        dispatch(setTotalmg(imgObj));
        // img!.push(imgObj);
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
              placeholder="게시글 내용을 입력하세요."
              value={state?.postInput.body}
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
              value={state?.postInput.body}
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

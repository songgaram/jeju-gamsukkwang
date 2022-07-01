import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import ReactQuill from "react-quill";

import http from "libs/apiController";
import HeadDropdown from "./headDropdown";

import styled from "styled-components";
import "react-quill/dist/quill.snow.css";
import theme from "../../../styles/Theme";

const Post = () => {
  const navigate = useNavigate();
  const mediaQuery = useMediaQuery({ query: theme.breakPoint });

  const imageRef = useRef();
  const quillRef = useRef();

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [isSelected, setInSelected] = useState("");

  const headFunction = (itemValue) => {
    setInSelected(itemValue);
  };

  const onChangeTitle = (e) => {
    const item = e.target.value;
    setTitle(item);
  };

  // 에디터 글 onChange
  const onChangeContents = (postContents) => {
    setContents(postContents);
  };

  // 이미지를 따로 처리해 저장하기 때문에 imageHandler를 만든다
  const imageHandler = () => {
    // 히든으로 숨겨진 input을 선택하도록 한다.
    imageRef.current.click(); // 선택을 input으로 하게함
  };

  // 히든 인풋에 현재 선택된 이미지 값 넣어주기
  const onChangeImageInput = async (e) => {
    e.preventDefault();

    // server에서 multer 사용을 위한 formData를 만든다.
    const formData = new FormData();

    // e.target.files에 있는 파일들을 멀터에 저장해야댐.
    formData.append("imgFile", e.target.files[0]);

    try {
      const res = await http.post("community/image", formData);
      console.log("이미지 저장 성공", res.data[0]);
      const IMG_URL = res.data[0];

      const editor = quillRef.current.getEditor();
      editor.root.innerHTML =
        editor.root.innerHTML + `<img src=${IMG_URL} /><br/>`;
    } catch (error) {
      console.log("이미지 업로드 실패");
    }
  };

  const onSave = async () => {
    let newBoard = {
      title: title,
      content: contents,
      head: isSelected,
    };

    try {
      const res = await http.post("community", newBoard);
      console.log("이미지 저장 성공", res.data);
      navigate("/community");
    } catch (error) {
      console.log("이미지 업로드 실패");
    }
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }, { align: [] }],
          ["link", "image"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "align",
    "background",
    "link",
    "image",
  ];

  return (
    <PostBox>
      {!mediaQuery ? (
        <h2>✏️ 게시글 작성</h2>
      ) : (
        <section>
          <h2>✏️ 게시글 작성</h2>
        </section>
      )}
      <FlexBox>
        <HeadDropdown headFunction={headFunction} />
        <TitleBox>
          <input
            type="text"
            placeholder="게시글 제목을 입력해주세요"
            onChange={onChangeTitle}
            value={title}
          />
        </TitleBox>
      </FlexBox>
      <EditorBox>
        <ReactQuill
          ref={quillRef}
          name="postContents"
          defaultValue={contents}
          onChange={onChangeContents}
          placeholder="내용을 입력해주세요"
          theme="snow"
          modules={modules}
          formats={formats}
        />
        <input
          hidden
          type="file"
          ref={imageRef}
          onChange={onChangeImageInput}
        />
      </EditorBox>
      <ButtonBox>
        <button type="button" onClick={onSave}>
          게시글 등록
        </button>
      </ButtonBox>
    </PostBox>
  );
};

export default Post;

const PostBox = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;

  h2 {
    margin-top: 50px;
    font-size: 20px;
    font-weight: 600;
    justify-content: flex-start;
  }

  @media screen and ${({ theme }) => theme.breakPoint} {
    width: 100%;
    align-items: center;

    > section {
      display: flex;
      justify-content: flex-start;
      width: 90%;
    }
  }
`;

const FlexBox = styled.div`
  width: 700px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;

  @media screen and ${({ theme }) => theme.breakPoint} {
    width: 100%;
    align-items: center;
    justify-content: space-around;
    padding-left: 2%;
  }
`;

const TitleBox = styled.div`
  input {
    width: 510px;
    padding: 11px 20px;
    border: 1px solid ${({ theme }) => theme.colors.gray02};
    border-radius: 5px;
  }

  @media screen and ${({ theme }) => theme.breakPoint} {
    display: flex;
    justify-content: center;
    width: 100%;
    input {
      width: 80%;
    }
  }
`;

const EditorBox = styled.div`
  width: 700px;

  .quill > .ql-toolbar:first-child {
    display: none !important;
  }

  .ql-editor {
    height: 400px;
  }

  @media screen and ${({ theme }) => theme.breakPoint} {
    width: 95%;

    .ql-editor {
      height: 500px;
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 700px;
  margin: 0 auto;

  button {
    padding: 10px 20px;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin: 30px 0;
  }

  @media screen and ${({ theme }) => theme.breakPoint} {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    button {
      margin: 30px 10px;
    }
  }
`;

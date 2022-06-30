import React, { useMemo, useRef, useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import styled from "styled-components";

const Post = () => {
  const quillRef = useRef();

  const imageHandler = () => {
    console.log("에디터에서 이미지 버튼을 클릭하면 이 핸들러가 시작됩니다!");

    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input = document.createElement("input");
    // 속성 써주기
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
    // input이 클릭되면 파일 선택창이 나타난다.

    // input에 변화가 생긴다면 = 이미지를 선택
    input.addEventListener("change", async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("img", file);

      // try {
      //   const result = await axios.post("http://localhost:4050/img", formData);
      //   console.log("성공 시, 백엔드가 보내주는 데이터", result.data.url);
      //   const IMG_URL = result.data.url;

      //   const editor = quillRef.current.getEditor();

      //   const range = editor.getSelection();
      //   editor.insertEmbed(range, "image", IMG_URL);
      // } catch (error) {
      //   console.log("실패했어요ㅠ");
      // }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { align: [] }],
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
    "blockquote",
    "image",
  ];

  return (
    <PostBox>
      <EditorBox>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          placeholder="플레이스 홀더"
          modules={modules}
          formats={formats}
        />
      </EditorBox>
    </PostBox>
  );
};

export default Post;

const PostBox = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditorBox = styled.div`
  width: 700px;
  .quill > .ql-toolbar:first-child {
    display: none !important;
  }

  .ql-editor {
    height: 400px;
  }
`;

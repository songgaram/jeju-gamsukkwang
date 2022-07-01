import { useGetPost } from "queries/communityQuery";
import { useParams, useNavigate } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

import styled from "styled-components";

const PostDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id;
  const postItem = useGetPost(postId);

  return (
    <PostDetailBox>
      <div>
        <button
          type="button"
          onClick={() => {
            navigate("/community");
          }}
        >
          뒤로가기
        </button>
      </div>
      <ContentBox>
        <h2>
          <span>[</span>
          {postItem?.data?.head === "question"
            ? "질문"
            : postItem?.data?.head === "info"
            ? "정보"
            : "잡담"}
          <span>]</span> {postItem?.data?.title}
        </h2>
        <p>
          {postItem?.data?.userNickName} ㆍ{" "}
          {`${postItem?.data?.createdAt}`.split("T")[0]}
        </p>
        <hr />
        <div>{ReactHtmlParser(`${postItem?.data?.content}`)}</div>
      </ContentBox>
    </PostDetailBox>
  );
};

export default PostDetail;

const PostDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 50px 0;

<<<<<<< HEAD
  div {
    width: 800px;
    margin: 0 auto;
    button {
      width: 100px;
      padding: 7px 15px;
      margin-bottom: 30px;
      border: none;
      border-radius: 10px;
      font-size: 12px;
    }
=======
  @media screen and ${({ theme }) => theme.breakPoint} {
    width: 100%;
    margin: 20px 0;
>>>>>>> b3ef8e9dfb27ee7530fa1fc51c3eb45068b53fee
  }
`;

const ContentBox = styled.div`
  width: 800px;
  margin: 0 auto;
  box-shadow: 0 0 12px rgba(0, 0, 0, 8%);
  padding: 50px;

  h2 {
    font-size: 20px;
    font-weight: 600;
  }

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray03};
  }

  hr {
    margin: 20px 0;
    border: 0.3px solid ${({ theme }) => theme.colors.gray02};
  }

  div {
    margin: 50px 0;

    img {
      max-width: 700px;
      @media screen and ${({ theme }) => theme.breakPoint} {
        max-width: 300px;
      }
    }
  }

  * {
    margin-bottom: 10px;
  }

  @media screen and ${({ theme }) => theme.breakPoint} {
    width: 100%;
    padding: 20px;
  }
`;

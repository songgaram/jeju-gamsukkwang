import { useGetPost } from "queries/communityQuery";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

import styled from "styled-components";

const PostDetail = () => {
  const params = useParams();
  const postId = params.id;
  const postItem = useGetPost(postId);

  return (
    <PostDetailBox>
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
`;

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetPostList } from "queries/communityQuery";

import styled from "styled-components";

const PostList = ({ headSelected }) => {
  const navigate = useNavigate();

  // const [page, setPage] = useState(1);
  const List = useGetPostList(headSelected);

  const handleClick = (postId) => {
    navigate(`/community/${postId}`);
  };

  if (!List.data) return <span>loading...</span>;

  return (
    <>
      {List.data.articles.map((data) => (
        <ItemBox key={data?.id} onClick={() => handleClick(data.id)}>
          <Title>
            <label>
              {data?.head === "question"
                ? "질문"
                : data?.head === "info"
                ? "정보"
                : "잡담"}
            </label>
            <h3>{data?.title}</h3>
          </Title>
          {/* <p>{data.content}</p> */}
        </ItemBox>
      ))}
    </>
  );
};

export default PostList;

const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray01};
  border-radius: 10px;
  cursor: pointer;

  p {
    font-size: 14px;
    line-height: 1.5; /* 행간조절 */
    /* description가 넘칠 경우 ...(말줄임)처리 */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* 2줄이 넘어가면 말줄임 */
    -webkit-box-orient: vertical;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.gray01};
  }

  * {
    color: ${({ theme }) => theme.colors.black};
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;

  label {
    width: 50px;
    padding: 5px 10px;
    text-align: center;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 5px;
    font-size: 12px;
  }

  h3 {
    font-weight: 600;
    margin-left: 10px;
  }
`;

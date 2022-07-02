import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "react-js-pagination";

import { useGetPostList } from "queries/communityQuery";

import styled from "styled-components";
import http from "libs/apiController";

const PostList = ({ headSelected }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const [List, setList] = useState([]);

  useEffect(() => {
    setPage(1);
  }, [headSelected]);

  useEffect(() => {
    const fetchFunction = async () => {
      try {
        const res = await http.get(
          `/community?page=${page}&limit=10${headSelected}`,
        );
        setList(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFunction();
  }, [page, headSelected]);

  // const List = useGetPostList(queryData);

  const handleClick = (postId) => {
    navigate(`/community/${postId}`);
  };

  const handlePageChange = (page) => {
    setPage(page);
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
      <Pager>
        <Pagination
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={List.data.total}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      </Pager>
    </>
  );
};

export default PostList;

const ItemBox = styled.div`
  width: 800px;
  margin: 0 auto;
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

  @media screen and ${({ theme }) => theme.breakPoint} {
    width: 100%;
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

const Pager = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul.pagination li:first-child,
  ul.pagination li:last-child  {
    display: none;
  }

  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid  ${({ theme }) => theme.colors.white};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }

  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }

  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }

  ul.pagination li a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1rem;
  }

  ul.pagination li.active a {
    color: ${({ theme }) => theme.colors.white};
    
  }

  ul.pagination li.active {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
  }

  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: ${({ theme }) => theme.colors.primary};
  }

  .page-selection {
    width: 48px;
    height: 30px;
    color: ${({ theme }) => theme.colors.primary};
`;

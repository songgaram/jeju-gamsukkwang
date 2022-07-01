import { useGetPost } from "queries/communityQuery";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const PostDetail = () => {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const postItem = useGetPost(postId);

  console.log(postItem);

  return <>게시글 상세 페이지</>;
};

export default PostDetail;

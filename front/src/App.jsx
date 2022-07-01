import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "pages/home";
import Intro from "pages/intro";
import Register from "pages/register";
import Landmark from "pages/landmark";
import LogIn from "pages/logIn";
import Layout from "components/layout";
import MyPage from "pages/mypage";
import Recommend from "pages/recommend";
import MyMap from "pages/mypage/MyMap";
import MyStamp from "pages/mypage/MyStamp";
<<<<<<< HEAD
import Community from "pages/community";
import Post from "pages/community/post";
import PostDetail from "pages/community/postDetail";
=======
import Map from "pages/kakaoMap";
>>>>>>> 0393be4ba4b710f99c6f61a1d7e8e8da29f286ad

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/landmark/detail/:id" element={<Landmark />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/map/:id" element={<Map />} />
        <Route path="/mypage" element={<MyPage />}>
          <Route index element={<MyMap />} />
          <Route path="mymap" element={<MyMap />} />
          <Route path="mystamp" element={<MyStamp />} />
        </Route>
        <Route path="/community" element={<Community />} />
        <Route path="/community/post" element={<Post />} />
        <Route path="/community/:id" element={<PostDetail />} />
      </Route>
    </Routes>
  );
};

export default App;

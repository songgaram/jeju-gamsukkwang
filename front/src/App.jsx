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
import MyMap from "pages/mypage/nav/MyMap";
import MyStamp from "pages/mypage/nav/MyStamp";
import Map from "pages/kakaoMap";

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
      </Route>
    </Routes>
  );
};

export default App;

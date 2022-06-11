import { Route, Routes } from "react-router-dom";

import Home from "page/home";
import Intro from "page/intro";
import Register from "page/register";
import Landmark from "page/landmark";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/intro" element={<Intro />} />
      <Route path="/user/register" element={<Register />} />
      <Route path="/landmark/detail/:id" element={<Landmark />} />
    </Routes>
  );
};

export default App;

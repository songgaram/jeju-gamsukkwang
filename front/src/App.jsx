import { Route, Routes } from "react-router-dom";

import Home from "pages/home";
import Intro from "pages/intro";
import Register from "pages/register";
import Landmark from "pages/landmark";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/intro" element={<Intro />} />
      <Route path="/user/register" element={<Register />} />
      <Route path="/landmark/detail" element={<Landmark />} />
    </Routes>
  );
};

export default App;

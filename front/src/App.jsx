import { Route, Routes } from "react-router-dom";

import Home from "page/home";
import Intro from "page/intro";
import Register from "page/register";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/intro" element={<Intro />} />
      <Route path="/user/register" element={<Register />} />
    </Routes>
  );
};

export default App;

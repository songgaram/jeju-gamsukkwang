import { Route, Routes } from "react-router-dom";

import Home from "page/home";
import Register from "page/register";
import Intro from "page/intro";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/register" element={<Register />} />
      <Route path="/intro" element={<Intro />} />
    </Routes>
  );
};

export default App;

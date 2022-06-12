import { Route, Routes } from "react-router-dom";

import Home from "page/home";
import Register from "page/register";
import Intro from "page/intro";
import LogIn from "page/logIn";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/intro" element={<Intro />} />
    </Routes>
  );
};

export default App;

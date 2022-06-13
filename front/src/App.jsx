import { Route, Routes } from "react-router-dom";

import Layout from "components/layout";
import Home from "page/home";
import Register from "page/register";
import Intro from "page/intro";
import LogIn from "page/logIn";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/intro" element={<Intro />} />
      </Route>
    </Routes>
  );
};

export default App;

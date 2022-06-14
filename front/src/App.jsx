import { Route, Routes } from "react-router-dom";

import Home from "pages/home";
import Intro from "pages/intro";
import Register from "pages/register";
import Landmark from "pages/landmark";
import LogIn from "pages/logIn";
import Layout from "components/layout";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/landmark/detail" element={<Landmark />} />
      </Route>
    </Routes>
  );
};

export default App;

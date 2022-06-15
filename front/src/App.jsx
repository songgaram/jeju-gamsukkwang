import { Route, Routes } from "react-router-dom";

import Layout from "components/layout";
import Home from "pages/home";
import Register from "pages/register";
import Intro from "pages/intro";
import LogIn from "pages/logIn";
import Tour from "pages/tour";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/tour" element={<Tour />} />
      </Route>
    </Routes>
  );
};

export default App;

import { Route, Routes } from "react-router-dom";

import Home from "page/home";
import Intro from "page/Intro"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/intro" element={<Intro />} />
    </Routes>
  );
};

export default App;

import { Route, Routes } from "react-router-dom";

import Home from "page/home";
import Register from "page/register";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/register" element={<Register />} />
    </Routes>
  );
};

export default App;

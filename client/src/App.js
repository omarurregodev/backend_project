import React from "react";
import Login from "./Views/Login";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { Home } from "./Views/Home";
import Logout from "./Views/Logout";
import Register from "./Views/Register";
import Info from "./Views/info";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

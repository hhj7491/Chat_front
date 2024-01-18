// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Chatpage from "./components/Chatpage";
import LoginFailPage from "./components/LoginFailPage";
import server from "./server";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat/:username" element={<Chatpage />} />
        <Route path="/login-fail" element={<LoginFailPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;

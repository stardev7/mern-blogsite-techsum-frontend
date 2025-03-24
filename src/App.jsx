
import React from "react";

import Auth from "components/Auth";
import SignUp from "components/SignUp";
import Home from "components/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "components/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

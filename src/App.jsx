
import React, { useEffect } from "react";

import Auth from "components/Auth";
import SignUp from "components/SignUp";
import Home from "components/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "components/NotFound";

import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginWithToken } from "./redux/actions/authActions";
import Navbar from "./components/Navbar";
import AddBlog from "./components/AddBlog";
import EditProfile from "components/EditProfile";

const App = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(state => state.auth.email);

  useEffect(() => {
    if (userEmail === "") {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(loginWithToken(token));
      } else if (window.location.pathname.startsWith('/auth') == false) {
        window.location.assign("/auth")
      }
    }
  }, [])

  return (
    <Router>
      {userEmail !== "" &&
        <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addblog" element={<AddBlog />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;

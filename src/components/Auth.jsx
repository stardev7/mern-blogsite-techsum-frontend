import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

import axios from 'axios'

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getUserData, setUserEmail } from "../redux/actions/authActions";

import { toast } from 'react-toastify';
import isEmpty from "utils/is-empty";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAuth = async () => {
        if (isLogin) {
            try {
                let validation = {}
                if (email === "")
                    validation.email = "Input email"
                if (password === "")
                    validation.password = "Input password"
                setError(validation)
                if (isEmpty(validation) === false)
                    return
                const result = await signInWithEmailAndPassword(auth, email, password);
                const token = await result.user.getIdToken();

                localStorage.setItem("token", token);

                console.log(result.user.email)
                dispatch(getUserData(result.user.email, toast, navigate))
                toast.success("Login successed!", {position: "top-center"});
            } catch (err) {
                if (err.code === "auth/invalid-credential") {
                    toast.error("Invalid credential.")
                } else if (err.code === "auth/wrong-password") {
                    setError({ password: "The password you entered is incorrect." });
                } else if (err.code === "auth/user-not-found") {
                    setError({ email: "No user found with this email address." });
                } else if (err.code === "auth/invalid-email") {
                    setError({ email: "Invalid email format." });
                }  else if (err.code === "auth/network-request-failed") {
                    toast.error("Network error. Please check your connection.")
                } else {
                    toast.error("Signup failed. Please try again.")
                }
            }
        } else {
            try {
                let validation = {}
                if (email === "")
                    validation.email = "Input email"
                if (password === "")
                    validation.password = "Input password"
                if (passwordConfirm === "")
                    validation.passwordConfirm = "Confirm password"
                if (password !== passwordConfirm)
                    validation.passwordConfirm = "Password doesn't match."
                setError(validation)
                if (isEmpty(validation) === false)
                    return
                const result = await createUserWithEmailAndPassword(auth, email, password);
                setError({});
                dispatch(setUserEmail(result.user.email));
                toast.success("Sign-up successed. Please input your details here.")
                navigate('/auth/signup')
            } catch (err) {
                if (err.code === "auth/email-already-in-use") {
                    setError({ email: "This email is already in use." });
                } else if (err.code === "auth/weak-password") {
                    setError({ password: "Password should be at least 6 characters." });
                } else if (err.code === "auth/invalid-email") {
                    setError({ email: "Invalid email format." });
                } else {
                    toast.error("Signup failed. Please try again.")
                }
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
                    {isLogin ? "Login" : "Sign Up"}
                </h2>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${error.email ? "" : "mb-4"}`}
                />
                {error.email &&
                    <p className="text-sm text-red-500 mb-2">
                        {error.email}
                    </p>}
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${error.password ? "" : "mb-4"}`}
                />
                {error.password &&
                    <p className="text-sm text-red-500 mb-2">
                        {error.password}
                    </p>}
                {!isLogin &&
                    <input
                        type="password"
                        placeholder="Password Confirm"
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${error.passwordConfirm ? "" : "mb-4"}`}
                    />}
                {error.passwordConfirm &&
                    <p className="text-sm text-red-500 mb-2">
                        {error.passwordConfirm}
                    </p>}
                <button
                    className={`w-full p-3 ${isLogin ? "bg-green-600" : "bg-orange-500"} text-white font-semibold rounded-lg hover:${isLogin ? "bg-green-700" : "bg-orange-600"} transition duration-300`}
                    onClick={handleAuth}
                >
                    {isLogin ? "Login" : "Sign Up"}
                </button>
                <p
                    className="text-center text-sm text-gray-600 mt-4 cursor-pointer hover:underline"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? "Create an account" : "Already have an account? Login"}
                </p>
            </div>
        </div>
    )
}

export default Auth;
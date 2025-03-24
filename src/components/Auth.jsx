import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

import axios from 'axios'

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { setUserEmail } from "../redux/actions/authActions";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAuth = async () => {
        try {
            if (isLogin) {
                const result = await signInWithEmailAndPassword(auth, email, password);
                console.log(result)
                alert("Logged in successfully!");
                axios.post('/user/add')
            } else {
                if (password !== passwordConfirm) {
                    setError({ passwordConfirm: "Password doesn't match." })
                    return;
                }
                // const result = await createUserWithEmailAndPassword(auth, email, password);
                setError({});
                dispatch(setUserEmail(email));
                navigate('/auth/signup')
            }
        } catch (err) {
            if (err.code === "auth/email-already-in-use") {
                setError({ email: "This email is already in use." });
            } else if (err.code === "auth/weak-password") {
                setError({ password: "Password should be at least 6 characters." });
            } else if (err.code === "auth/invalid-email") {
                setError({ email: "Invalid email format." });
            } else {
                setError({ connetion: "Signup failed. Please try again." });
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
                    className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
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
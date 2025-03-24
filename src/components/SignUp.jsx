import React, { useState } from "react";
import { auth } from "../firebase";

import axios from 'axios'

const SignUp = (email) => {
    const [username, setUsername] = useState("");
    const [gender, setGender] = useState(true);
    const [birthday, setBirthday] = useState(new Date());
    const [job, setJob] = useState("");
    const [city, setCity] = useState("");

    const handleAuth = async () => {
        try {
            
        } catch (error) {
            console.log(error)
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
                />
                {!isLogin &&
                    <input
                        type="password"
                        placeholder="Password Confirm"
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
                    />}
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
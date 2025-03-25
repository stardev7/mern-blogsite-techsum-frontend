import React, { useEffect, useState } from "react";

import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "utils/is-empty";
import { validatePassword } from "firebase/auth";
import { registerUser } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import date_to_string from "utils/date2string";

const SignUp = () => {
    const email = useSelector(state => state.auth.email);

    const [username, setUsername] = useState("");
    const [gender, setGender] = useState(true);
    const [birthday, setBirthday] = useState(date_to_string(new Date()));
    const [job, setJob] = useState("");
    const [city, setCity] = useState("");
    const [error, setError] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (email === "" || email === undefined)
            navigate("/auth")
    }, [email])

    const handleSignup = async () => {
        let validation = {}
        if (username === "")
            validation.username = "Input user name"
        if (gender === "")
            validation.gender = "Select gender"
        if (birthday === "")
            validation.birthday = "Input your birthday"
        if (job === "")
            validation.job = "Input your job"
        if (city === "")
            validation.city = "Input your address"
        setError(validation)
        if (isEmpty(validation) === false)
            return
        try {
            dispatch(registerUser({ email, name: username, gender, birthday, job, city }, toast, navigate));
        } catch (err) {

        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
                    {"Input your details"}
                </h2>
                <input
                    type="text"
                    value={email}
                    readOnly={true}
                    className="w-full p-3 border bg-gray-200 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
                />
                <input
                    type="text"
                    placeholder="User name"
                    onChange={(e) => setUsername(e.target.value)}
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${error.username ? "" : "mb-4"}`}
                />
                {error.username &&
                    <p className="text-sm text-red-500 mb-2">
                        {error.username}
                    </p>}
                <select
                    type="option"
                    placeholder="Gender"
                    onChange={(e) => setGender(e.target.value === "male")}
                    defaultValue="male"
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${error.gender ? "" : "mb-4"}`}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                {error.gender &&
                    <p className="text-sm text-red-500 mb-2">
                        {error.gender}
                    </p>}
                <input
                    type="date"
                    placeholder="Birthday"
                    defaultValue={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${error.birthday ? "" : "mb-4"}`}
                />
                {error.birthday &&
                    <p className="text-sm text-red-500 mb-2">
                        {error.birthday}
                    </p>}
                <input
                    type="text"
                    placeholder="Job"
                    onChange={(e) => setJob(e.target.value)}
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${error.job ? "" : "mb-4"}`}
                />
                {error.job &&
                    <p className="text-sm text-red-500 mb-2">
                        {error.job}
                    </p>}
                <input
                    type="text"
                    placeholder="City"
                    onChange={(e) => setCity(e.target.value)}
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${error.city ? "" : "mb-4"}`}
                />
                {error.city &&
                    <p className="text-sm text-red-500 mb-2">
                        {error.city}
                    </p>}
                <button
                    className="w-full p-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition duration-300"
                    onClick={handleSignup}
                >
                    {"Submit"}
                </button>
                <p
                    className="text-center text-sm text-gray-600 mt-4 cursor-pointer hover:underline"
                    onClick={() => navigate("/auth")}
                >
                    {"Go back to login"}
                </p>
            </div>
        </div>
    )
}

export default SignUp;
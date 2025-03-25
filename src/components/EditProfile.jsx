import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateUser } from '../redux/actions/authActions';
import date_to_string from 'utils/date2string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.auth.user)

    const [formData, setFormData] = useState({});
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        setFormData({
            email: user.email,
            name: user.name,
            gender: user.gender,
            birthday: date_to_string(new Date(user.birthday)),
            job: user.job,
            city: user.city,
            avatarURL: "",
        })
        setAvatar(`${process.env.REACT_APP_API_URL}/avatars/${user.avatar}`)
        setChanged(false);
    }, [user])

    const [avatar, setAvatar] = useState(user.avatar); // State for avatar

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setChanged(true);
    };

    const handleGenderChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            gender: e.target.value === "male"
        }))
        setChanged(true);
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(URL.createObjectURL(file)); // Preview the selected image
            setFormData(prev => ({
                ...prev,
                avatarURL: file
            }))
        }
        setChanged(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!changed)
            return;

        const formDataToSend = new FormData();
        if(formData.avatarURL !== "")
            formDataToSend.append('avatar', formData.avatarURL); // Avatar file
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('gender', formData.gender);
        formDataToSend.append('birthday', formData.birthday);
        formDataToSend.append('job', formData.job);
        formDataToSend.append('city', formData.city);

        dispatch(updateUser(formDataToSend, toast))
    };
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-6 sm:px-12">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                {/* Avatar Section */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <img
                            src={avatar}
                            alt="Avatar"
                            className="w-40 h-40 drop-shadow-lg rounded-full object-cover"
                        />
                        <span className="absolute bottom-2 right-2 text-white bg-blue-500 rounded-full p-2 text-xs cursor-pointer">
                            <FontAwesomeIcon icon={faPen} />
                        </span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="absolute bottom-0 right-2 opacity-0 max-w-7 h-10 cursor-pointer"
                        />
                    </div>
                </div>

                <h2 className="text-3xl font-semibold text-center mb-6">Edit Profile</h2>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled
                            />
                        </div>

                        {/* Name */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Gender */}
                        <div className="mb-4">
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                                Gender
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender ? "male" : "female"}
                                onChange={handleGenderChange}
                                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        {/* Birthday */}
                        <div className="mb-4">
                            <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                                Birthday
                            </label>
                            <input
                                type="date"
                                id="birthday"
                                name="birthday"
                                value={formData.birthday}
                                onChange={handleChange}
                                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Job */}
                        <div className="mb-4">
                            <label htmlFor="job" className="block text-sm font-medium text-gray-700">
                                Job
                            </label>
                            <input
                                type="text"
                                id="job"
                                name="job"
                                value={formData.job}
                                onChange={handleChange}
                                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* City */}
                        <div className="mb-4">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="mt-6 text-center">
                        <button
                            type="submit"
                            className={`w-full text-white py-2 px-4 rounded-md focus:outline-none ${changed ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-600 cursor-default"}`}
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
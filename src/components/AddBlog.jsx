import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddBlog = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        imageFile: null,
        imagePreview: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    imageFile: file,
                    imagePreview: reader.result,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title);
            formDataToSend.append("content", formData.content);
            formDataToSend.append("author", user.email);
            formDataToSend.append("image", formData.imageFile);

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/blog`, {
                method: "POST",
                body: formDataToSend,
            });

            if (response.ok) {
                toast.success("New blog added.", {position: "top-center"});
                navigate("/");
            } else {
                toast.error("Failed to add new blog.", {position: "top-center"});
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 flex gap-6">
            {/* Image Preview Section */}
            <div className="w-1/3 flex justify-center items-center">
                {formData.imagePreview ? (
                    <img src={formData.imagePreview} alt="Preview" className="w-full h-auto rounded-lg shadow-md" />
                ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-sm rounded-lg">
                        No Image Selected
                    </div>
                )}
            </div>

            {/* Form Section */}
            <div className="w-2/3">
                <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea
                            name="content"
                            rows="10"
                            value={formData.content}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-1 block w-full border p-2 rounded-md cursor-pointer"
                        />
                    </div>


                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all drop-shadow-md"
                    >
                        Add Blog
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;

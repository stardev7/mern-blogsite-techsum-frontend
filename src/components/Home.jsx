import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBlogs } from "../redux/actions/blogActions";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userEmail = useSelector(state => state.auth.email)
    const blogs = useSelector(state => state.blog.blogs)

    useEffect(() => {
        dispatch(getBlogs());
    }, [])

    return (
        <div className="bg-gray-200">
            <div className="mx-24 p-6">
                <button
                    className="bg-blue-500 text-white px-5 py-2 rounded-lg drop-shadow-md hover:bg-blue-600 transition-all"
                    onClick={() => navigate('/addblog')}
                >
                    Add Blog
                </button>

                <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6 mt-6">
                    {blogs?.map((blog, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            {/* Blog Image */}
                            <div
                                className="h-48 bg-cover bg-center"
                                style={{ backgroundImage: `url("${process.env.REACT_APP_API_URL}/blogs/${blog.image}` }}
                            ></div>

                            {/* Blog Details */}
                            <div className="p-4">
                                {/* Author Info */}
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}/avatars/${blog.user_blog.avatar}`}
                                        alt="Author Avatar"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <p className="text-sm font-semibold">{blog.user_blog.name}</p>
                                        <p className="text-xs text-gray-500">{new Date(blog.createdAt).toDateString()}</p>
                                    </div>
                                </div>

                                {/* Blog Title */}
                                <h3 className="mt-3 text-lg font-bold">{blog.title}</h3>

                                {/* Blog Content (Ellipsis) */}
                                <p className="mt-2 text-gray-600 line-clamp-2">{blog.content}</p>

                                <div className="flex flex-row justify-center gap-2">
                                    <button
                                        className="mt-4 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-all w-full"
                                        onClick={() => navigate(`/blog/${index}`)}
                                    >
                                        View
                                    </button>
                                    {blog.author === userEmail &&
                                        <button
                                            className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-500 transition-all w-full"
                                            onClick={() => navigate(`/blog/${index}`)}
                                        >
                                            Delete
                                        </button>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;

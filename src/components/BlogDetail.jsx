import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // For accessing the blog ID from URL
import axios from 'axios';  // To fetch the blog data from the server (you can replace it with your data-fetching method)

const BlogDetail = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the blog data when the component mounts
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${id}`); // Adjust your API endpoint
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Show a loading spinner while the data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin border-4 border-blue-500 border-t-transparent w-16 h-16 rounded-full"></div>
      </div>
    );
  }

  // Show error message if no blog is found
  if (!blog) {
    return <div className="text-center">Blog not found!</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}
        <div className="text-gray-700 mb-6">
          <p className="mb-4">By <span className="font-semibold">{blog.author}</span></p>
          <p>{blog.content}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Published on {new Date(blog.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
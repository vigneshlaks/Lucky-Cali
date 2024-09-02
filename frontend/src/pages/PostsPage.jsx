import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@/components/shared/api'; // Adjust the path according to your project structure

const PostCard = ({ post }) => {
  return (
    <Link to={`/train/posts/${post.id}`} className="block">
      <div className="bg-gray-950 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-white hover:scale-105 border border-gray-800 hover:glow-white">
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-100 mb-3">{post.title}</h3>
          <p className="text-gray-400 mb-4 text-lg">{post.description}</p>
        </div>
        <div className="bg-black px-6 py-3 flex justify-end items-center">
          <span className="text-sm text-gray-500">{new Date(post.published_at).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
};

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/train/posts?page=${currentPage}&limit=${postsPerPage}`);
        console.log(response);
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div className="bg-black text-white min-h-screen p-8 flex justify-center items-center">Loading...</div>;
  }

  if (error) {
    return <div className="bg-black text-white min-h-screen p-8 flex justify-center items-center">{error}</div>;
  }

  if (posts.length === 0) {
    return <div className="bg-black text-white min-h-screen p-8 flex justify-center items-center">No posts available. Please check back later!</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="flex justify-center items-center mt-12 space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
            disabled={currentPage === 1}
          >
            &larr; Previous
          </button>
          <div className="flex items-center space-x-2">
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 ${
                  currentPage === page + 1
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {page + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
            disabled={currentPage === totalPages}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
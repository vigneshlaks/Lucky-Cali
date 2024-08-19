import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@/components/shared/api';

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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/train/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/components/shared/api';

const PostDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();  // Hook to get the navigate function

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/train/posts/${id}`);
        setPost(response.data.post);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError('Failed to fetch post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black text-white min-h-screen p-8 flex justify-center items-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white mb-8 inline-block transition duration-300">
          &larr; Back to Posts
        </button>
        <article className="bg-black rounded-lg shadow-lg overflow-hidden border border-gray-700">
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4 text-white">{post.title}</h1>
            <p className="text-gray-400 mb-6">
              Published on {new Date(post.published_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <div className="prose prose-lg prose-invert max-w-none">
              {post.body.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-white">{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PostDetailsPage;
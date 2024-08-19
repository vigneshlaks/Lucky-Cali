import React from 'react';

// eslint-disable-next-line react/prop-types
const PostCard = ({ post }) => {
  return (
    <div className="bg-black rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-white hover:scale-105 border border-white">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-3">{post.title}</h3>
        <p className="text-white mb-4 text-lg">{post.body}</p> {/* Changed from post.content to post.body */}
      </div>
      <div className="bg-white px-6 py-3 flex justify-end items-center">
        <span className="text-sm text-black">{new Date(post.published_at).toLocaleDateString()}</span> {/* Changed from post.date to post.published_at */}
      </div>
    </div>
  );
};

export default PostCard;

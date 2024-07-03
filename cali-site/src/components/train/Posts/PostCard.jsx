import React from 'react';
import PropTypes from 'prop-types';

const PostCard = ({ post }) => {
  return (
    <div className="border border-white p-4 rounded-lg hover:bg-gray-800 transition duration-300">
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-400 mb-4">{post.date} by {post.author}</p>
      <p className="text-white">{post.content}</p>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostCard;

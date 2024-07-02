import React from 'react';
import PostCard from '@/components/Posts/PostCard';

const PostsPage = () => {
  const posts = [
    {
      id: 1,
      title: 'How to Maximize Your Workout Efficiency',
      content: 'Learn how to get the most out of your workouts with these expert tips.',
      author: 'John Doe',
      date: 'June 28, 2024',
    },
    {
      id: 2,
      title: 'The Importance of Rest and Recovery',
      content: 'Discover why rest days are crucial for your fitness journey.',
      author: 'Jane Smith',
      date: 'June 25, 2024',
    },
    {
      id: 3,
      title: 'Top 10 Exercises for Building Strength',
      content: 'These exercises will help you build muscle and increase strength.',
      author: 'Alice Johnson',
      date: 'June 22, 2024',
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostsPage;

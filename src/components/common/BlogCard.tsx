import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Link to={`/blog/${post.id}`} className="block group">
      <div className="bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
        <div className="h-48 overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
            <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
            <span className="text-sm text-primary-600 dark:text-primary-400">{post.category}</span>
          </div>
          <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{post.excerpt}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
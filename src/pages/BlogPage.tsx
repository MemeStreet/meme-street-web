import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/common/SectionHeading';
import BlogCard from '../components/common/BlogCard';
import blogPosts from '../data/blog';

const BlogPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-gray-900 dark:text-white mb-6">
            $JAO Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Updates, announcements, and insights from the Meme Street Development team.
          </p>
        </motion.div>

        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-24"
          >
            <SectionHeading
              title="Latest Post"
              subtitle="Stay up to date with our most recent updates and announcements"
            />

            <div className="bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-lg">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  <img 
                    src={blogPosts[0].image} 
                    alt={blogPosts[0].title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center mb-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{blogPosts[0].date}</span>
                    <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                    <span className="text-sm text-primary-600 dark:text-primary-400">{blogPosts[0].category}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold font-display text-gray-900 dark:text-white mb-4">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3"></div>
                    <span className="text-gray-800 dark:text-gray-200 font-medium">{blogPosts[0].author}</span>
                  </div>
                  <a 
                    href={`/blog/${blogPosts[0].id}`}
                    className="inline-flex items-center font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                  >
                    Read Full Article
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* All Posts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionHeading
            title="All Posts"
            subtitle="Browse through our collection of articles and updates"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>

          {blogPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300">No blog posts available at the moment.</p>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
};

export default BlogPage;
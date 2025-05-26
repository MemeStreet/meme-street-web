import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { Comment } from '../../types';
import { supabase } from '../../lib/supabase';
import Button from './Button';

interface CommentsProps {
  postId: string;
}

const commentSchema = z.object({
  user_name: z.string().min(2, 'Name must be at least 2 characters'),
  content: z.string().min(10, 'Comment must be at least 10 characters'),
});

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const { error } = await supabase
        .from('comments')
        .insert([{
          post_id: postId,
          user_name: data.user_name,
          content: data.content,
        }]);

      if (error) throw error;

      reset();
      fetchComments();
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment. Please try again.');
    }
  };

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
        Comments
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            id="user_name"
            {...register('user_name')}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-dark-700 dark:text-white"
          />
          {errors.user_name && (
            <p className="mt-1 text-sm text-red-600">{errors.user_name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Comment
          </label>
          <textarea
            id="content"
            rows={4}
            {...register('content')}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-dark-700 dark:text-white"
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
          )}
        </div>

        <Button type="submit">
          Post Comment
        </Button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {isLoading ? (
          <p className="text-gray-600 dark:text-gray-400">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white dark:bg-dark-700 rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {comment.user_name}
                </h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
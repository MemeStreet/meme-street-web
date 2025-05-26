import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Mail } from 'lucide-react';
import type { NewsletterSubscription } from '../../types';
import Button from './Button';

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().optional(),
});

const NewsletterSignup: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<NewsletterSubscription>();

  const onSubmit = async (data: NewsletterSubscription) => {
    try {
      // Here you would typically send the form data to your backend
      console.log('Newsletter subscription:', data);
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      alert('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-md">
      <div className="flex items-center mb-4">
        <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-lg font-bold font-display text-gray-900 dark:text-white ml-2">
          Subscribe to Our Newsletter
        </h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Stay updated with our latest news, updates, and announcements.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your name (optional)"
            {...register('name')}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-dark-700 dark:text-white"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Your email address"
            {...register('email')}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-dark-700 dark:text-white"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Subscribe
        </Button>
      </form>
      {isSuccess && (
        <p className="mt-4 text-sm text-green-600 dark:text-green-400">
          Thanks for subscribing! You'll receive our next newsletter.
        </p>
      )}
    </div>
  );
};

export default NewsletterSignup;
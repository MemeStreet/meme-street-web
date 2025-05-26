import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/common/SectionHeading';
import MerchCard from '../components/common/MerchCard';
import Button from '../components/common/Button';
import merchItems from '../data/merch';

const MerchPage: React.FC = () => {
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
            $JAO Merchandise
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Show your support for the $JAO community with our official merchandise collection.
          </p>
          <Button 
            href="https://etsy.com/shop/jao-merch" 
            target="_blank"
            size="lg"
          >
            Visit Our Etsy Store
          </Button>
        </motion.div>

        {/* Featured Products */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-24"
        >
          <SectionHeading
            title="Featured Products"
            subtitle="Our most popular $JAO merchandise items"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {merchItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <MerchCard item={item} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Custom Orders */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-24"
        >
          <div className="bg-gray-50 dark:bg-dark-800 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    Custom product image
                  </p>
                </div>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl md:text-3xl font-bold font-display text-gray-900 dark:text-white mb-4">
                  Custom Orders
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Looking for something specific? We offer custom merchandise options for individuals and communities. Bulk discounts available for orders over 10 items.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                    <span className="text-gray-600 dark:text-gray-300">Custom designs and colors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                    <span className="text-gray-600 dark:text-gray-300">Community-specific variations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                    <span className="text-gray-600 dark:text-gray-300">Special event merchandise</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                    <span className="text-gray-600 dark:text-gray-300">Premium quality materials</span>
                  </li>
                </ul>
                <Button 
                  href="mailto:merch@memestreetdev.com" 
                  variant="primary"
                >
                  Request Custom Order
                </Button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Community Showcase */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SectionHeading
            title="Community Showcase"
            subtitle="$JAO supporters around the world representing the brand"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Share your $JAO merch photos on social media with #JAOGang for a chance to be featured!
            </p>
            <Button 
              href="https://etsy.com/shop/jao-merch" 
              target="_blank"
            >
              Shop All Products
            </Button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default MerchPage;
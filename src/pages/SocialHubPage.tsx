import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/common/SectionHeading';
import SocialCard from '../components/common/SocialCard';
import socialLinks from '../data/social';
import { MessageCircle } from 'lucide-react';

const SocialHubPage: React.FC = () => {
  useEffect(() => {
    // Reload Twitter widgets after component mounts
    if ((window as any).twttr) {
      (window as any).twttr.widgets.load();
    }
  }, []);

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
            Connect With Our Community
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join the conversation across our social platforms and stay updated with the latest news, announcements, and community activities.
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.platform}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <SocialCard social={social} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Twitter Feed */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-24"
        >
          <SectionHeading
            title="Latest Tweets"
            subtitle="Stay updated with our latest announcements and community interactions"
          />

          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6">
            <div className="flex justify-center">
              <a 
                className="twitter-timeline" 
                data-height="600"
                data-theme="dark"
                href="https://twitter.com/jeetareout?ref_src=twsrc%5Etfw"
              >
                Tweets by Meme Street Development
              </a>
            </div>
          </div>
        </motion.section>

        {/* Community Showcase */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-24"
        >
          <SectionHeading
            title="Community Spotlight"
            subtitle="Highlighting the amazing contributions from our community members"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-md">
              <div className="h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Featured meme artwork
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-2">
                  "To The Moon" by CryptoArtist404
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  This iconic $JAO artwork became the foundation for our brand identity and has been shared thousands of times across social media.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-md">
              <div className="h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Community event photo
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-2">
                  JAO NYC Meetup
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our first community meetup in New York City brought together over 100 $JAO enthusiasts for networking, presentations, and celebrations.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Community Chat */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-primary-600 to-accent-500 rounded-2xl p-8 md:p-12 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle size={32} className="text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold font-display mb-4">
              Join Our Telegram Community
            </h3>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Connect with developers, contributors, and fellow $JAO enthusiasts in our active Telegram community. Get help, share ideas, and participate in exclusive events and giveaways.
            </p>
            <a 
              href="https://t.me/+HruCP9oExMEyMGQ0" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 font-medium rounded-full hover:shadow-lg transition-all duration-300"
            >
              Join Telegram
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default SocialHubPage;
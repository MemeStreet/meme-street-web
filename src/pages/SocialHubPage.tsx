import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/common/SectionHeading';
import SocialCard from '../components/common/SocialCard';
import socialLinks from '../data/social';
import { MessageCircle, Twitter } from 'lucide-react';

const SocialHubPage: React.FC = () => {
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

          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md overflow-hidden">
            {/* Twitter Header */}
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <Twitter className="w-10 h-10 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">@Jeets_AreOut</h3>
                    <p className="opacity-90">Follow us for the latest updates</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Twitter Content */}
            <div className="p-8 text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Get real-time updates, announcements, and engage with our community on Twitter.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://twitter.com/Jeets_AreOut"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  View Our Tweets
                </a>
                
                <a
                  href="https://twitter.com/intent/follow?screen_name=Jeets_AreOut"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Follow @Jeets_AreOut
                </a>
              </div>

              {/* Recent Tweet Preview (Static) */}
              <div className="mt-8 p-6 bg-gray-50 dark:bg-dark-700 rounded-lg text-left max-w-2xl mx-auto">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">J</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900 dark:text-white">Jeets Are Out</span>
                      <span className="text-gray-500 dark:text-gray-400">@Jeets_AreOut</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      🚀 Big things coming for $JAO! Stay tuned for our upcoming announcements. The community is stronger than ever! 
                      #JAO #CryptoGems #MemeCoins
                    </p>
                  </div>
                </div>
                <a
                  href="https://twitter.com/Jeets_AreOut"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  View more tweets →
                </a>
              </div>
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

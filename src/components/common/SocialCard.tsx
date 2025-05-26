import React from 'react';
import { SocialLink } from '../../types';
import { Twitter, Instagram as Telegram, Youtube, GitBranch as TikTok } from 'lucide-react';
import Button from './Button';

interface SocialCardProps {
  social: SocialLink;
}

const SocialCard: React.FC<SocialCardProps> = ({ social }) => {
  const getIcon = () => {
    switch (social.icon) {
      case 'Twitter':
        return <Twitter size={28} className="text-primary-600 dark:text-primary-400" />;
      case 'Telegram':
        return <Telegram size={28} className="text-primary-600 dark:text-primary-400" />;
      case 'Youtube':
        return <Youtube size={28} className="text-primary-600 dark:text-primary-400" />;
      case 'TikTok':
        return <TikTok size={28} className="text-primary-600 dark:text-primary-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
      <div className="flex items-center mb-4">
        {getIcon()}
        <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white ml-2">
          {social.platform}
        </h3>
      </div>
      <Button 
        href={social.url} 
        target="_blank"
        variant="outline"
        className="w-full"
      >
        Follow Us
      </Button>
    </div>
  );
};

export default SocialCard
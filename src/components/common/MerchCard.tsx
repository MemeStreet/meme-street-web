import React from 'react';
import { MerchItem } from '../../types';
import Button from './Button';

interface MerchCardProps {
  item: MerchItem;
}

const MerchCard: React.FC<MerchCardProps> = ({ item }) => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">{item.name}</h3>
          <span className="font-medium text-primary-600 dark:text-primary-400">{item.price}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{item.description}</p>
        <Button 
          href={item.url} 
          target="_blank"
          variant="primary"
        >
          Shop Now
        </Button>
      </div>
    </div>
  );
};

export default MerchCard;
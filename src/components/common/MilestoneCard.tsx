import React from 'react';
import { Milestone } from '../../types';
import { CheckCircle, Circle } from 'lucide-react';

interface MilestoneCardProps {
  milestone: Milestone;
  isLast?: boolean;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({ milestone, isLast = false }) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center mr-6">
        <div className="flex items-center justify-center w-8 h-8 rounded-full">
          {milestone.completed ? (
            <CheckCircle className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          ) : (
            <Circle className="w-8 h-8 text-gray-400 dark:text-gray-600" />
          )}
        </div>
        {!isLast && (
          <div className="w-px h-full bg-gray-300 dark:bg-gray-700 my-2"></div>
        )}
      </div>
      <div className={`pb-8 ${isLast ? '' : 'border-b border-gray-200 dark:border-gray-700'}`}>
        <div className="flex items-center mb-2">
          <span className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-gray-200">
            {milestone.date}
          </span>
        </div>
        <h3 className="text-lg font-bold font-display text-gray-900 dark:text-white mb-2">{milestone.title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
      </div>
    </div>
  );
};

export default MilestoneCard;
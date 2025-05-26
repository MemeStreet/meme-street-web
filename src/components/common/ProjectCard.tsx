import React from 'react';
import { Project } from '../../types';
import Button from './Button';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const statusBadgeClass = {
    live: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
    development: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400',
    planned: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
  }[project.status];

  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">{project.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadgeClass}`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{project.description}</p>
        {project.url && (
          <Button 
            href={project.url} 
            target="_blank"
            variant={project.status === 'live' ? 'primary' : 'outline'}
          >
            {project.status === 'live' ? 'Visit Project' : 'Learn More'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/common/SectionHeading';
import ProjectCard from '../components/common/ProjectCard';
import projects from '../data/projects';

const ProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'live' | 'development' | 'planned'>('all');
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.status === filter);

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            title="Our Projects"
            subtitle="Explore the innovative ecosystem we're building in the meme-driven finance space."
            centered
          />
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-gray-100 dark:bg-dark-700 rounded-full p-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-white dark:bg-dark-600 shadow-sm text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter('live')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'live'
                  ? 'bg-white dark:bg-dark-600 shadow-sm text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              Live
            </button>
            <button
              onClick={() => setFilter('development')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'development'
                  ? 'bg-white dark:bg-dark-600 shadow-sm text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              In Development
            </button>
            <button
              onClick={() => setFilter('planned')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'planned'
                  ? 'bg-white dark:bg-dark-600 shadow-sm text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              Planned
            </button>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">No projects found with the selected filter.</p>
          </div>
        )}

        {/* Collaboration CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-24 bg-gray-50 dark:bg-dark-700 rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold font-display text-gray-900 dark:text-white mb-4">
            Interested in Collaborating?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            We're always looking to partner with innovative projects in the blockchain space. 
            Reach out to discuss potential collaborations or integrations with our ecosystem.
          </p>
          <a 
            href="mailto:partnerships@memestreetdev.com" 
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-500 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsPage;
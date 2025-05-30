import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/common/SectionHeading';
import MilestoneCard from '../components/common/MilestoneCard';
import Button from '../components/common/Button';
import milestones from '../data/milestones';
import { FileText, Download } from 'lucide-react';

const WhitepaperPage: React.FC = () => {
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
            $JAO Whitepaper
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            A comprehensive overview of our vision, technology, and roadmap for the Jeets Are Out ecosystem.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              href="/documents/$JAO Whitepaper : Road Map .pdf"
              target="_blank"
              size="lg" 
              className="inline-flex items-center"
            >
              <FileText size={20} className="mr-2" />
              View Whitepaper
            </Button>
            <Button 
              href="/documents/$JAO Whitepaper : Road Map .pdf"
              download
              variant="outline" 
              size="lg" 
              className="inline-flex items-center"
            >
              <Download size={20} className="mr-2" />
              Download PDF
            </Button>
          </div>
        </motion.div>

        {/* Roadmap Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-24"
        >
          <SectionHeading
            title="Project Roadmap"
            subtitle="Our strategic plan for development and growth"
            centered
          />

          <div className="mt-12 max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <MilestoneCard
                key={milestone.id}
                milestone={milestone}
                isLast={index === milestones.length - 1}
              />
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default WhitepaperPage;
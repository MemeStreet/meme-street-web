import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import SectionHeading from '../components/common/SectionHeading';
import ProjectCard from '../components/common/ProjectCard';
import projects from '../data/projects';
import { ArrowRight, Zap, BarChart3, Globe, Shield } from 'lucide-react';

const HomePage: React.FC = () => {
  const featuredProjects = projects.slice(0, 2);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen pt-24 pb-16 flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-accent-900/20 dark:from-primary-900/40 dark:to-accent-900/40 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/8370739/pexels-photo-8370739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-10 dark:opacity-20 z-[-1]"></div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-sm font-medium mb-6">
                $JAO Token Now Live
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-gray-900 dark:text-white mb-6"
            >
              Building the Future of 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-500 dark:from-primary-400 dark:to-accent-400">
                {' '}Meme-Driven Finance
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
            >
              Meme Street Development Group combines cutting-edge blockchain technology with the vibrant energy of meme culture to create innovative financial products that are both fun and functional.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                href="https://dexscreener.com/solana/h4b45vgj5hlqmnujppaffy2z2uwry1xww8bvlom8lfgz"
                target="_blank"
                size="lg"
              >
                Buy $JAO Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/projects')}
              >
                Explore Projects
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 flex items-center space-x-6"
            >
              <div className="flex -space-x-2">
                <img 
                  src="https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Community member" 
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-dark-900"
                />
                <img 
                  src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Community member" 
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-dark-900"
                />
                <img 
                  src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Community member" 
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-dark-900"
                />
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center text-sm font-medium text-primary-800 dark:text-primary-200 border-2 border-white dark:border-dark-900">
                  +10K
                </div>
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                Join our growing community
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-dark-800">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Why Choose $JAO?"
            subtitle="We're not just another meme coin. We're building a comprehensive ecosystem of DeFi products with real utility."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-md"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                <Zap size={24} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-2">
                Community First
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built by the community, for the community, with governance mechanisms that give holders a real voice.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-md"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                <BarChart3 size={24} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-2">
                Innovative Tokenomics
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Designed for sustainable growth with deflationary mechanisms and incentives for long-term holders.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-md"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                <Globe size={24} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-2">
                Ecosystem Integration
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Seamlessly integrates with our growing suite of DeFi products for enhanced utility and value.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-md"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                <Shield size={24} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-2">
                Security & Transparency
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fully audited smart contracts and transparent team with regular community updates and governance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <SectionHeading
              title="Featured Projects"
              subtitle="Explore our ecosystem of innovative DeFi products and services."
              className="mb-0"
            />
            <Link 
              to="/projects" 
              className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors mt-4 md:mt-0"
            >
              View All Projects <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 to-accent-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-6"
          >
            Ready to join the $JAO community?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl opacity-90 mb-8 max-w-2xl mx-auto"
          >
            Be part of the next generation of meme-driven finance and help shape the future of DeFi.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button
              href="https://dexscreener.com/solana/h4b45vgj5hlqmnujppaffy2z2uwry1xww8bvlom8lfgz"
              target="_blank"
              size="lg"
              variant="secondary"
            >
              Buy $JAO
            </Button>
            <Button
              href="/whitepaper"
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Read Whitepaper
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/common/SectionHeading';
import MilestoneCard from '../components/common/MilestoneCard';
import Button from '../components/common/Button';
import milestones from '../data/milestones';
import { FileText, Download, BarChart3, Users, Lock, Wallet, Calendar } from 'lucide-react';
import { marked } from 'marked';

const WhitepaperPage: React.FC = () => {
  const [whitepaperContent, setWhitepaperContent] = useState('');

  useEffect(() => {
    fetch('/src/data/whitepaper.md')
      .then(response => response.text())
      .then(text => {
        setWhitepaperContent(marked(text));
      })
      .catch(error => {
        console.error('Error loading whitepaper:', error);
      });
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
            $JAO Whitepaper
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            A comprehensive overview of our vision, technology, and roadmap for the Jeets Are Out ecosystem.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="inline-flex items-center">
              <FileText size={20} className="mr-2" />
              Read Online
            </Button>
            <Button variant="outline" size="lg" className="inline-flex items-center">
              <Download size={20} className="mr-2" />
              Download PDF
            </Button>
          </div>
        </motion.div>

        {/* Whitepaper Content */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-24"
        >
          <div 
            className="prose prose-lg dark:prose-invert prose-headings:font-display prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-ul:text-gray-600 dark:prose-ul:text-gray-300 max-w-none"
            dangerouslySetInnerHTML={{ __html: whitepaperContent }}
          />
        </motion.section>

        {/* Key Concepts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-24"
        >
          <SectionHeading
            title="Key Concepts"
            subtitle="Understanding the fundamental principles that drive our project"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                <BarChart3 size={24} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-3">
                Tokenomics
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                $JAO features a deflationary model with a total supply of 1 billion tokens. A 3% transaction fee is distributed with 1% to holders, 1% to liquidity, and 1% to project development.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Initial supply: 1,000,000,000 $JAO</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Presale allocation: 40%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Liquidity pool: 30%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Team allocation: 10% (locked for 12 months)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Marketing: 10%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Development fund: 10%</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                <Users size={24} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-3">
                Governance
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                $JAO employs a decentralized governance model where token holders can propose and vote on changes to the protocol, ensuring community-driven development.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>1 $JAO = 1 vote</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Proposal threshold: 1,000,000 $JAO</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Voting period: 7 days</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Quorum requirement: 10% of circulating supply</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Timelock for implementation: 48 hours</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                <Lock size={24} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-3">
                Security
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Security is paramount to our project. We've implemented multiple measures to ensure the safety of user funds and the integrity of our protocols.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Multi-signature wallets for treasury management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Smart contract audits by CertiK and Hacken</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Bug bounty program</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Time-locked upgrades</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Regular security assessments</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                <Wallet size={24} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-3">
                Utility
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                $JAO is more than just a meme coin; it's designed with multiple utilities within our ecosystem to ensure long-term value and adoption.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Governance participation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Fee discounts on Meme Street DEX</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>NFT marketplace privileges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Staking rewards in MemeVault</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  <span>Access to exclusive community events</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Roadmap */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-24"
        >
          <SectionHeading
            title="Project Roadmap"
            subtitle="Our strategic plan for development and growth, starting from April 2024"
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

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <SectionHeading
            title="Our Team"
            subtitle="Meet the individuals behind Meme Street Development Group"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-md text-center">
              <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-1">
                  Alex Thompson
                </h3>
                <p className="text-primary-600 dark:text-primary-400 mb-4">Founder & CEO</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Blockchain enthusiast with 8+ years in DeFi development.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-md text-center">
              <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-1">
                  Samantha Wu
                </h3>
                <p className="text-primary-600 dark:text-primary-400 mb-4">CTO</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Smart contract developer with experience at major protocols.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-md text-center">
              <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-1">
                  Marcus Johnson
                </h3>
                <p className="text-primary-600 dark:text-primary-400 mb-4">Community Lead</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Marketing specialist focused on crypto community building.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-md text-center">
              <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-1">
                  Lisa Chen
                </h3>
                <p className="text-primary-600 dark:text-primary-400 mb-4">Head of Business Dev</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Partnerships expert with connections across the crypto space.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default WhitepaperPage;
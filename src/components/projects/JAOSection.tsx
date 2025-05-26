import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Shield, Zap, Infinity } from 'lucide-react';

interface JAOPhase {
  id: string;
  name: string;
  tagline: string;
  image: string;
  icon: React.ReactNode;
  stats: {
    label: string;
    value: string;
  }[];
  features: string[];
  color: string;
}

const JAOSection: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<string>('genesis');

  const phases: JAOPhase[] = [
    {
      id: 'genesis',
      name: 'JAO Genesis',
      tagline: 'From Tears to Triumph',
      image: '/images/jao/jao-rage.jpg',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-red-600 to-orange-600',
      stats: [
        { label: 'Total Supply', value: '1,000,000,000 JAO' },
        { label: 'Initial Liquidity', value: '$100,000' },
        { label: 'Holders Goal', value: '10,000+' }
      ],
      features: [
        'Fair Launch Protocol',
        'Anti-Rug Mechanisms',
        'Community Governance',
        'Transparent Development'
      ]
    },
    {
      id: 'revolution',
      name: 'JAO Revolution',
      tagline: 'Armed & Dangerous',
      image: '/images/jao/jao-guns.jpg',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-gray-800 to-red-900',
      stats: [
        { label: 'TVL Target', value: '$10M+' },
        { label: 'Daily Volume', value: '$1M+' },
        { label: 'Partnerships', value: '20+' }
      ],
      features: [
        'DeFi Integration Suite',
        'Advanced Trading Tools',
        'Strategic Alliances',
        'Market Defense Systems'
      ]
    },
    {
      id: 'crash',
      name: 'JAO Crash',
      tagline: 'Virtual Reality Check',
      image: '/images/jao/jao-vr-crash.jpg',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-purple-600 to-pink-600',
      stats: [
        { label: 'Risk Score', value: 'A+' },
        { label: 'Recovery Time', value: '<24h' },
        { label: 'Protection Rate', value: '99.9%' }
      ],
      features: [
        'AI Market Prediction',
        'Crash Protection Protocol',
        'Emergency Response DAO',
        'Insurance Mechanisms'
      ]
    },
    {
      id: 'eternal',
      name: 'JAO Eternal',
      tagline: 'Death is Just the Beginning',
      image: '/images/jao/jao-zombie.jpg',
      icon: <Infinity className="w-6 h-6" />,
      color: 'from-green-900 to-gray-900',
      stats: [
        { label: 'Resurrection Rate', value: '100%' },
        { label: 'Eternal Rewards', value: '∞ APY' },
        { label: 'Undead Army', value: '50,000+' }
      ],
      features: [
        'Perpetual Liquidity',
        'Resurrection Mechanics',
        'Eternal Staking Rewards',
        'Immortal Governance'
      ]
    }
  ];

  const selectedPhaseData = phases.find(p => p.id === selectedPhase)!;

  return (
    <section className="py-20 px-4 bg-dark-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              JAO PROJECT
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Journey through the evolution of JAO - from rage-filled beginnings to eternal dominance in the meme economy
          </p>
        </motion.div>

        {/* Phase Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {phases.map((phase, index) => (
            <motion.button
              key={phase.id}
              onClick={() => setSelectedPhase(phase.id)}
              className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
                selectedPhase === phase.id 
                  ? 'ring-4 ring-primary-500 shadow-2xl scale-105' 
                  : 'ring-1 ring-gray-800 hover:ring-2 hover:ring-gray-700'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: selectedPhase === phase.id ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="aspect-square relative">
                <img
                  src={phase.image}
                  alt={phase.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${phase.color} opacity-80 group-hover:opacity-70 transition-opacity`} />
                
                {/* Phase Info Overlay */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-2">
                    {phase.icon}
                    <h3 className="text-white font-bold text-lg">{phase.name}</h3>
                  </div>
                  <p className="text-gray-200 text-sm">{phase.tagline}</p>
                </div>

                {/* Active Indicator */}
                {selectedPhase === phase.id && (
                  <motion.div
                    className="absolute inset-0 border-4 border-primary-500 rounded-xl"
                    layoutId="activePhase"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Phase Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPhase}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Left Column - Image and Description */}
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={selectedPhaseData.image}
                  alt={selectedPhaseData.name}
                  className="w-full h-auto"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${selectedPhaseData.color} opacity-40`} />
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {selectedPhaseData.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark-800 rounded-lg p-4 text-center"
                  >
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column - Features */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">{selectedPhaseData.name}</h3>
                <p className="text-xl text-gray-400">{selectedPhaseData.tagline}</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-white">Key Features</h4>
                <div className="space-y-3">
                  {selectedPhaseData.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 bg-dark-800/50 rounded-lg p-4"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedPhaseData.color}`} />
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white bg-gradient-to-r ${selectedPhaseData.color} hover:shadow-lg transition-shadow`}
                >
                  Learn More
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-3 px-6 rounded-lg font-semibold text-white bg-dark-700 hover:bg-dark-600 ring-1 ring-gray-700 transition-colors"
                >
                  Join Community
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default JAOSection;
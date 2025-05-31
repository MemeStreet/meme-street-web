// src/App.tsx
import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import WalletContextProvider from './contexts/WalletContextProvider';
import StakingInterface from './components/StakingInterface';
import ManualBalanceChecker from './components/ManualBalanceChecker';
import NetworkTester from './components/NetworkTester';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'staking' | 'manual' | 'network'>('staking');

  if (currentView === 'manual') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
        <div className="max-w-4xl mx-auto mb-6">
          <button
            onClick={() => setCurrentView('staking')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg mr-2"
          >
            ← Back to Staking
          </button>
          <button
            onClick={() => setCurrentView('network')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            🌐 Network Test
          </button>
        </div>
        <ManualBalanceChecker />
      </div>
    );
  }

  if (currentView === 'network') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
        <div className="max-w-4xl mx-auto mb-6">
          <button
            onClick={() => setCurrentView('staking')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg mr-2"
          >
            ← Back to Staking
          </button>
          <button
            onClick={() => setCurrentView('manual')}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg"
          >
            🔧 Manual Checker
          </button>
        </div>
        <NetworkTester />
      </div>
    );
  }

  return (
    <WalletContextProvider>
      <AuthProvider>
        <div className="relative">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button
              onClick={() => setCurrentView('manual')}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              🔧 Manual Checker
            </button>
            <button
              onClick={() => setCurrentView('network')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              🌐 Network Test
            </button>
          </div>
          <StakingInterface />
        </div>
      </AuthProvider>
    </WalletContextProvider>
  );
};

export default App;

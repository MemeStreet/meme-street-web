// src/App.tsx
import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import WalletContextProvider from './contexts/WalletContextProvider';
import StakingInterface from './components/StakingInterface';
import ManualBalanceChecker from './components/ManualBalanceChecker';

const App: React.FC = () => {
  const [showManualChecker, setShowManualChecker] = useState(false);

  if (showManualChecker) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
        <div className="max-w-4xl mx-auto mb-6">
          <button
            onClick={() => setShowManualChecker(false)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            ← Back to Staking App
          </button>
        </div>
        <ManualBalanceChecker />
      </div>
    );
  }

  return (
    <WalletContextProvider>
      <AuthProvider>
        <div className="relative">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={() => setShowManualChecker(true)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              🔧 Manual Balance Checker
            </button>
          </div>
          <StakingInterface />
        </div>
      </AuthProvider>
    </WalletContextProvider>
  );
};

export default App;

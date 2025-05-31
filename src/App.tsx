// src/App.tsx
import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import JAOMintFinder from './components/JAOMintFinder';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  
  // Check if we have the JAO mint address in environment
  const hasMintAddress = process.env.REACT_APP_JAO_MINT_ADDRESS && 
                        process.env.REACT_APP_JAO_MINT_ADDRESS !== 'YOUR_ACTUAL_JAO_MINT_ADDRESS_FROM_STEP_0';

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading JAO Staking...</div>
      </div>
    );
  }

  // Always show mint finder first if we don't have the mint address
  if (!hasMintAddress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
        <JAOMintFinder />
      </div>
    );
  }

  // Once we have mint address, show different content based on auth
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-white/20 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">JAO Staking Ready!</h1>
          <p className="text-blue-200 mb-8">
            ✅ Mint address found: {process.env.REACT_APP_JAO_MINT_ADDRESS?.slice(0, 8)}...
          </p>
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
            <p className="text-green-200 text-sm mb-2">🎉 Great! Your JAO token is configured.</p>
            <p className="text-green-200 text-sm">Next: Add authentication components for full functionality.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">JAO Staking Dashboard</h2>
              <p className="text-blue-200">User: {user?.email}</p>
              <p className="text-green-400 text-sm">Mint: {process.env.REACT_APP_JAO_MINT_ADDRESS?.slice(0, 12)}...</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-4 py-2 rounded-lg border border-blue-500/30"
            >
              Refresh
            </button>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">🚀 Ready for Wallet Integration!</h3>
          <div className="space-y-4">
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
              <p className="text-green-200">✅ Authentication working</p>
            </div>
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
              <p className="text-green-200">✅ JAO token mint address configured</p>
            </div>
            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
              <p className="text-yellow-200">🔄 Next: Install Solana wallet dependencies and add staking interface</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;

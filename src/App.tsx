// src/App.tsx
import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import JAOMintFinder from './components/JAOMintFinder';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  
  // Hardcoded mint address - this should always be true now
  const JAO_MINT_ADDRESS = 'EGzvPfc54EBvS3M6MKXWixDK32T7pVxXB8dZ7AW5bACr';
  const hasMintAddress = true; // We have it hardcoded now

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading JAO Staking...</div>
      </div>
    );
  }

  // Skip the mint finder since we have the address
  if (!hasMintAddress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
        <JAOMintFinder />
      </div>
    );
  }

  // Show the staking setup page
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">🎉 JAO Staking Ready!</h1>
            <p className="text-blue-200 text-lg mb-6">
              Your JAO token is now configured and ready for staking
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
                <h3 className="text-green-200 font-semibold mb-2">✅ Token Configuration</h3>
                <p className="text-green-300 text-sm">Mint: {JAO_MINT_ADDRESS.slice(0, 12)}...</p>
                <p className="text-green-300 text-sm">Symbol: JAO</p>
                <p className="text-green-300 text-sm">Name: Jeets Are Out</p>
              </div>
              
              <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
                <h3 className="text-green-200 font-semibold mb-2">✅ Supabase Database</h3>
                <p className="text-green-300 text-sm">Authentication: Ready</p>
                <p className="text-green-300 text-sm">Staking Pools: Ready</p>
                <p className="text-green-300 text-sm">User Profiles: Ready</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">🚀 Next: Add Wallet Integration</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <h3 className="text-blue-200 font-semibold mb-2">Step 1: Install Solana Wallet Dependencies</h3>
              <div className="bg-gray-800 p-2 rounded overflow-x-auto">
                <code className="text-blue-300 text-sm">
                  npm install @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets @solana/web3.js @solana/spl-token
                </code>
              </div>
            </div>
            
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <h3 className="text-blue-200 font-semibold mb-2">Step 2: Add Wallet Context</h3>
              <p className="text-blue-300 text-sm">Set up Phantom & Solflare wallet connections</p>
            </div>
            
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <h3 className="text-blue-200 font-semibold mb-2">Step 3: Build Staking Interface</h3>
              <p className="text-blue-300 text-sm">Create the full staking UI with real JAO balance checking</p>
            </div>
          </div>
        </div>

        {/* Current Status */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Progress Tracker</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">🔐</div>
              <p className="text-white font-semibold">Authentication</p>
              <p className="text-green-400 text-sm">✅ Complete</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🪙</div>
              <p className="text-white font-semibold">JAO Token</p>
              <p className="text-green-400 text-sm">✅ Complete</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">👛</div>
              <p className="text-white font-semibold">Wallet</p>
              <p className="text-yellow-400 text-sm">⏳ Next</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🏦</div>
              <p className="text-white font-semibold">Staking</p>
              <p className="text-gray-400 text-sm">⏸️ Pending</p>
            </div>
          </div>
        </div>

        {user && (
          <div className="mt-6 bg-green-900/20 border border-green-700 rounded-lg p-4">
            <p className="text-green-200 text-center">
              👋 Welcome back, {user.email}! Your JAO staking setup is ready.
            </p>
          </div>
        )}
        
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

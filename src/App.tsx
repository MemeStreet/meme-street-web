// src/App.tsx
import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
// import AuthForm from './components/auth/AuthForm';
// import ProfileCard from './components/auth/ProfileCard';
// import JAOStakingInterface from './components/JAOStakingInterface';

// Temporary simple components until you create the full ones
const SimpleAuthForm: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-white/20">
      <h1 className="text-3xl font-bold text-white mb-4 text-center">JAO Staking</h1>
      <p className="text-blue-200 text-center mb-8">Authentication setup complete! Add auth components next.</p>
      <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
        <p className="text-green-200 text-sm">✅ AuthContext working!</p>
        <p className="text-green-200 text-sm">✅ TypeScript types ready!</p>
        <p className="text-green-200 text-sm">✅ Supabase connected!</p>
      </div>
    </div>
  </div>
);

const SimpleStakingInterface: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Welcome back!</h2>
              <p className="text-blue-200">User: {user?.email}</p>
              <p className="text-blue-200">Username: {profile?.username || 'Not set'}</p>
            </div>
            <button
              onClick={signOut}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-lg border border-red-500/30"
            >
              Sign Out
            </button>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Staking Interface Ready!</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-blue-200 text-sm">JAO Balance</p>
              <p className="text-2xl font-bold text-white">{profile?.total_jao_balance?.toLocaleString() || '0'}</p>
            </div>
            <div className="text-center">
              <p className="text-blue-200 text-sm">Total Staked</p>
              <p className="text-2xl font-bold text-green-400">{profile?.total_staked?.toLocaleString() || '0'}</p>
            </div>
            <div className="text-center">
              <p className="text-blue-200 text-sm">Rewards Earned</p>
              <p className="text-2xl font-bold text-yellow-400">{profile?.total_rewards_earned?.toFixed(4) || '0'}</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
            <p className="text-blue-200">🚀 Ready to add full staking functionality!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading JAO Staking...</div>
      </div>
    );
  }

  if (!user) {
    return <SimpleAuthForm />;
  }

  return <SimpleStakingInterface />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;

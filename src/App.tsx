import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthForm from './components/auth/AuthForm';
import ProfileCard from './components/auth/ProfileCard';
import JAOStakingInterface from './components/JAOStakingInterface';

// Define (or import) the shape of your user object if available
interface AuthUser {
  email?: string;
  // Add other fields if your user object has them
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
}

const AppContent: React.FC = () => {
  // Add explicit type assertion if useAuth doesn't already provide correct types
  const { user, loading } = useAuth() as AuthContextValue;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <ProfileCard />
        </div>
        <JAOStakingInterface />
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

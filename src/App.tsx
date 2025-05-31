// src/App.tsx
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import WalletContextProvider from './contexts/WalletContextProvider';
import StakingInterface from './components/StakingInterface';

const App: React.FC = () => {
  return (
    <WalletContextProvider>
      <AuthProvider>
        <StakingInterface />
      </AuthProvider>
    </WalletContextProvider>
  );
};

export default App;

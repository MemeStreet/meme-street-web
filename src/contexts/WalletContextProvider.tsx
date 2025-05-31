// src/contexts/WalletContextProvider.tsx
import React, { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';

interface WalletContextProviderProps {
  children: ReactNode;
}

const WalletContextProvider: FC<WalletContextProviderProps> = ({ children }) => {
    const network = WalletAdapterNetwork.Mainnet;
    
    // Use multiple RPC endpoints for better reliability
    const endpoint = useMemo(() => {
        // Try different RPC endpoints
        const endpoints = [
            'https://rpc.ankr.com/solana', // Ankr (usually more reliable)
            'https://solana-mainnet.rpc.extrnode.com', // Extrnode
            clusterApiUrl(network), // Fallback to default
        ];
        
        // For now, use Ankr which is usually more reliable
        return endpoints[0];
    }, [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletContextProvider;

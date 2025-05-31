// src/components/StakingInterface.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey } from '@solana/web3.js';
import { getAccount, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Coins, TrendingUp, Lock, Wallet, Gift, Users } from 'lucide-react';

interface StakingPool {
  id: string;
  name: string;
  description: string;
  apy_rate: number;
  min_stake_amount: number;
  max_stake_amount: number | null;
  total_staked: number;
  total_stakers: number;
  lock_period_days: number;
  is_active: boolean;
}

interface UserStake {
  id: string;
  pool_id: string;
  amount: number;
  staked_at: string;
  accumulated_rewards: number;
  can_unstake_at: string | null;
  staking_pools: StakingPool;
}

// JAO Balance Hook (inline) - IMPROVED WITH BETTER RPC HANDLING
const useJAOBalance = (mintAddress: string) => {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const fetchBalance = useCallback(async () => {
    if (!publicKey || !connected || !mintAddress) {
      setBalance(0);
      setError('');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      console.log('🔍 Fetching balance for wallet:', publicKey.toString());
      console.log('🔍 Looking for mint:', mintAddress);
      console.log('🔍 Using RPC:', connection.rpcEndpoint);

      // Method 1: Get all token accounts (more reliable for finding tokens)
      console.log('🔍 Attempting to get all token accounts...');
      
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        { programId: TOKEN_PROGRAM_ID },
        'confirmed' // Use confirmed commitment for better reliability
      );

      console.log('✅ Successfully got', tokenAccounts.value.length, 'token accounts');
      console.log('🔍 All token accounts:', tokenAccounts.value.map(acc => ({
        mint: acc.account.data.parsed.info.mint,
        balance: acc.account.data.parsed.info.tokenAmount.uiAmount,
        decimals: acc.account.data.parsed.info.tokenAmount.decimals
      })));

      // Look for the JAO token in all accounts
      const jaoAccount = tokenAccounts.value.find(
        account => account.account.data.parsed.info.mint === mintAddress
      );

      if (jaoAccount) {
        const balance = jaoAccount.account.data.parsed.info.tokenAmount.uiAmount || 0;
        console.log('✅ Found JAO balance:', balance);
        setBalance(balance);
        setError('');
        return;
      }

      console.log('⚠️ JAO token not found in wallet accounts');
      setBalance(0);
      setError('JAO token not found in wallet');

    } catch (error: any) {
      console.error('❌ Error fetching JAO balance:', error);
      
      // Check if it's an RPC error
      if (error.message?.includes('403') || error.message?.includes('forbidden')) {
        setError('RPC endpoint blocked. Using alternative method...');
        
        // Try a simpler approach - just show 0 balance with error message
        setBalance(0);
      } else if (error.message?.includes('rate limit')) {
        setError('Rate limited by RPC. Please wait and try again.');
        setBalance(0);
      } else {
        setError(`Error: ${error.message}`);
        setBalance(0);
      }
    } finally {
      setLoading(false);
    }
  }, [publicKey, connected, mintAddress, connection]);

  const fetchPrice = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${mintAddress}`
      );
      const data = await response.json();
      
      if (data.pairs && data.pairs.length > 0) {
        setPrice(parseFloat(data.pairs[0].priceUsd || '0'));
      }
    } catch (error) {
      console.error('Error fetching token price:', error);
    }
  }, [mintAddress]);

  useEffect(() => {
    fetchBalance();
    fetchPrice();
    
    const interval = setInterval(() => {
      fetchBalance();
      fetchPrice();
    }, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [fetchBalance, fetchPrice]);

  return { 
    balance, 
    price, 
    loading, 
    error,
    refetch: fetchBalance,
    usdValue: balance * price 
  };
};

const StakingInterface: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const { connection } = useConnection();
  const { user, profile, updateProfile } = useAuth();
  const [stakingPools, setStakingPools] = useState<StakingPool[]>([]);
  const [userStakes, setUserStakes] = useState<UserStake[]>([]);
  const [selectedPool, setSelectedPool] = useState<string | null>(null);
  const [stakeAmount, setStakeAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [allTokenAccounts, setAllTokenAccounts] = useState<any[]>([]);

  // JAO token configuration
  const JAO_MINT_ADDRESS = 'EGzvPfc54EBvS3M6MKXWixDK32T7pVxXB8dZ7AW5bACr';
  const { balance: jaoBalance, price: jaoPrice, loading: balanceLoading, error: balanceError } = useJAOBalance(JAO_MINT_ADDRESS);

  // Debug function
  const runDebugCheck = useCallback(async () => {
    if (!publicKey || !connected) {
      setDebugInfo({});
      setAllTokenAccounts([]);
      return;
    }

    try {
      setDebugInfo({ status: 'Checking...' });

      console.log('🚀 Starting debug check...');
      console.log('Wallet connected:', connected);
      console.log('Public key:', publicKey.toString());
      console.log('JAO Mint Address:', JAO_MINT_ADDRESS);

      // Get all token accounts for this wallet
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        { programId: TOKEN_PROGRAM_ID }
      );

      console.log('All token accounts:', tokenAccounts);
      setAllTokenAccounts(tokenAccounts.value);

      // Look for JAO specifically
      const jaoAccount = tokenAccounts.value.find(
        account => account.account.data.parsed.info.mint === JAO_MINT_ADDRESS
      );

      console.log('JAO Account:', jaoAccount);

      // Try to get associated token account
      const mint = new PublicKey(JAO_MINT_ADDRESS);
      const ata = await getAssociatedTokenAddress(
        mint,
        publicKey,
        false,
        TOKEN_PROGRAM_ID
      );

      console.log('Expected ATA:', ata.toString());

      // Check if ATA exists
      const ataInfo = await connection.getAccountInfo(ata);
      console.log('ATA exists:', !!ataInfo);

      setDebugInfo({
        status: 'Complete',
        walletAddress: publicKey.toString(),
        mintAddress: JAO_MINT_ADDRESS,
        expectedATA: ata.toString(),
        ataExists: !!ataInfo,
        jaoAccountFound: !!jaoAccount,
        jaoBalance: jaoAccount ? jaoAccount.account.data.parsed.info.tokenAmount.uiAmount : 0,
        totalTokenAccounts: tokenAccounts.value.length
      });

    } catch (error) {
      console.error('Debug error:', error);
      setDebugInfo({ status: 'Error', error: error.message });
    }
  }, [publicKey, connected, connection, JAO_MINT_ADDRESS]);

  useEffect(() => {
    fetchStakingPools();
    if (user) {
      fetchUserStakes();
    }
    if (connected) {
      runDebugCheck();
    }
  }, [user, connected, runDebugCheck]);

  useEffect(() => {
    // Update profile with wallet address when wallet connects
    if (connected && publicKey && user && profile?.wallet_address !== publicKey.toString()) {
      updateProfile({ wallet_address: publicKey.toString() });
    }
  }, [connected, publicKey, user, profile, updateProfile]);

  const fetchStakingPools = async () => {
    try {
      const { data, error } = await supabase
        .from('staking_pools')
        .select('*')
        .eq('is_active', true)
        .order('apy_rate', { ascending: false });

      if (error) throw error;
      setStakingPools(data || []);
    } catch (error) {
      console.error('Error fetching staking pools:', error);
    }
  };

  const fetchUserStakes = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_stakes')
        .select(`
          *,
          staking_pools (*)
        `)
        .eq('user_id', user.id)
        .eq('is_active', true);

      if (error) throw error;
      setUserStakes(data || []);
    } catch (error) {
      console.error('Error fetching user stakes:', error);
    }
  };

  const handleStake = async (poolId: string) => {
    if (!user || !connected || !publicKey) {
      alert('Please connect your wallet and sign in');
      return;
    }

    const amount = parseFloat(stakeAmount);
    const pool = stakingPools.find(p => p.id === poolId);
    
    if (!pool || !amount || amount < pool.min_stake_amount || amount > jaoBalance) {
      alert(`Invalid stake amount. Min: ${pool?.min_stake_amount.toLocaleString()}, Available: ${jaoBalance.toLocaleString()}`);
      return;
    }

    setLoading(true);
    try {
      // Calculate unlock date for locked pools
      const canUnstakeAt = pool.lock_period_days > 0 
        ? new Date(Date.now() + pool.lock_period_days * 24 * 60 * 60 * 1000).toISOString()
        : null;

      // Insert stake record
      const { error } = await supabase
        .from('user_stakes')
        .insert([
          {
            user_id: user.id,
            pool_id: poolId,
            amount,
            can_unstake_at: canUnstakeAt
          }
        ]);

      if (error) throw error;

      // Update user's total staked
      await updateProfile({
        total_staked: (profile?.total_staked || 0) + amount
      });

      // Update pool stats
      await supabase
        .from('staking_pools')
        .update({
          total_staked: pool.total_staked + amount,
          total_stakers: pool.total_stakers + 1
        })
        .eq('id', poolId);

      // Refresh data
      await Promise.all([fetchStakingPools(), fetchUserStakes()]);
      
      setStakeAmount('');
      setSelectedPool(null);
      alert(`Successfully staked ${amount.toLocaleString()} JAO!`);
      
    } catch (error) {
      console.error('Staking error:', error);
      alert('Staking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalStaked = userStakes.reduce((sum, stake) => sum + stake.amount, 0);
  const totalRewards = userStakes.reduce((sum, stake) => sum + stake.accumulated_rewards, 0);

  if (!connected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center max-w-md w-full border border-white/20">
          <Wallet className="mx-auto mb-6 text-blue-300" size={64} />
          <h2 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h2>
          <p className="text-blue-200 mb-8">
            Connect your Solana wallet to start staking JAO tokens and earn rewards
          </p>
          <WalletMultiButton className="!bg-gradient-to-r !from-blue-500 !to-purple-600" />
          
          <div className="mt-8 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
            <p className="text-blue-200 text-sm">
              💡 Make sure you have JAO tokens in your wallet to start staking
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">JAO Staking</h1>
            <p className="text-xl text-blue-200">Stake your JAO tokens and earn rewards</p>
          </div>
          <WalletMultiButton />
        </div>

        {/* RPC Error Warning */}
        {connected && balanceError && (
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 mb-6">
            <h3 className="text-yellow-200 font-bold mb-2">⚠️ RPC Connection Issue</h3>
            <p className="text-yellow-300 text-sm mb-3">{balanceError}</p>
            <p className="text-yellow-300 text-sm">
              This is usually a temporary issue with Solana RPC endpoints. Try refreshing the page or connect later.
            </p>
          </div>
        )}

        {/* Debug Info Panel */}
        {connected && (
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-red-200 font-bold">🔍 Balance Debug Info</h3>
              <button
                onClick={runDebugCheck}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
              >
                Refresh Debug
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded">
                <h4 className="text-white font-semibold mb-2">Connection Status:</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-300">Status: {debugInfo.status || 'Not checked'}</p>
                  <p className="text-gray-300">Wallet: {debugInfo.walletAddress?.slice(0, 12)}...</p>
                  <p className="text-gray-300">JAO Mint: {debugInfo.mintAddress?.slice(0, 12)}...</p>
                  <p className="text-gray-300">Expected ATA: {debugInfo.expectedATA?.slice(0, 12)}...</p>
                  <p className={`${debugInfo.ataExists ? 'text-green-400' : 'text-red-400'}`}>
                    ATA Exists: {debugInfo.ataExists ? '✅' : '❌'}
                  </p>
                  <p className={`${debugInfo.jaoAccountFound ? 'text-green-400' : 'text-red-400'}`}>
                    JAO Account Found: {debugInfo.jaoAccountFound ? '✅' : '❌'}
                  </p>
                  <p className="text-yellow-400">JAO Balance: {debugInfo.jaoBalance || '0'}</p>
                  <p className="text-gray-300">Total Token Accounts: {debugInfo.totalTokenAccounts}</p>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded">
                <h4 className="text-white font-semibold mb-2">All Your Tokens:</h4>
                <div className="max-h-40 overflow-y-auto space-y-1">
                  {allTokenAccounts.length === 0 ? (
                    <p className="text-gray-400 text-sm">No token accounts found</p>
                  ) : (
                    allTokenAccounts.map((account, i) => (
                      <div key={i} className="text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">
                            {account.account.data.parsed.info.mint.slice(0, 8)}...
                          </span>
                          <span className="text-white">
                            {account.account.data.parsed.info.tokenAmount.uiAmount || 0}
                          </span>
                        </div>
                        {account.account.data.parsed.info.mint === JAO_MINT_ADDRESS && (
                          <div className="text-green-400 text-xs">↑ This is your JAO token! ✅</div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {!debugInfo.jaoAccountFound && allTokenAccounts.length > 0 && (
              <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-700 rounded">
                <p className="text-yellow-200 text-sm">
                  🤔 <strong>Issue Found:</strong> You have {allTokenAccounts.length} token(s) but none match the JAO mint address.
                  Your JAO tokens might have a different mint address.
                </p>
              </div>
            )}

            {debugInfo.jaoAccountFound && debugInfo.jaoBalance === 0 && (
              <div className="mt-4 p-3 bg-blue-900/30 border border-blue-700 rounded">
                <p className="text-blue-200 text-sm">
                  ℹ️ <strong>Found JAO account but balance is 0.</strong> You have the right token but no balance.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">JAO Balance</p>
                <p className="text-2xl font-bold text-white">
                  {balanceLoading ? '...' : jaoBalance.toLocaleString()}
                </p>
                <p className="text-xs text-blue-300">${(jaoBalance * jaoPrice).toFixed(2)} USD</p>
              </div>
              <Wallet className="text-blue-400" size={32} />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">Total Staked</p>
                <p className="text-2xl font-bold text-white">{totalStaked.toLocaleString()}</p>
                <p className="text-xs text-blue-300">JAO</p>
              </div>
              <Lock className="text-green-400" size={32} />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">Rewards Earned</p>
                <p className="text-2xl font-bold text-white">{totalRewards.toFixed(4)}</p>
                <p className="text-xs text-blue-300">JAO</p>
              </div>
              <Gift className="text-yellow-400" size={32} />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">JAO Price</p>
                <p className="text-2xl font-bold text-white">${jaoPrice.toFixed(6)}</p>
                <p className="text-xs text-blue-300">USD</p>
              </div>
              <TrendingUp className="text-purple-400" size={32} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Staking Pools */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Available Staking Pools</h2>
            
            {stakingPools.map((pool) => (
              <div key={pool.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{pool.name}</h3>
                    <p className="text-blue-200 text-sm">{pool.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">{pool.apy_rate}%</div>
                    <div className="text-xs text-blue-300">APY</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-blue-200 text-xs">Min Stake</p>
                    <p className="text-white font-semibold">{pool.min_stake_amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs">Lock Period</p>
                    <p className="text-white font-semibold">
                      {pool.lock_period_days === 0 ? 'No Lock' : `${pool.lock_period_days} days`}
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs">Total Staked</p>
                    <p className="text-white font-semibold">{pool.total_staked.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs">Stakers</p>
                    <p className="text-white font-semibold">{pool.total_stakers}</p>
                  </div>
                </div>

                {selectedPool === pool.id ? (
                  <div className="space-y-4">
                    <input
                      type="number"
                      placeholder={`Min: ${pool.min_stake_amount.toLocaleString()}`}
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-blue-200"
                      max={Math.min(pool.max_stake_amount || Infinity, jaoBalance)}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStake(pool.id)}
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all disabled:opacity-50"
                      >
                        {loading ? 'Processing...' : 'Stake Now'}
                      </button>
                      <button
                        onClick={() => {setSelectedPool(null); setStakeAmount('');}}
                        className="px-4 py-2 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedPool(pool.id)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
                  >
                    Stake in this Pool
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* User Stakes */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Your Active Stakes</h2>
            
            {userStakes.length === 0 ? (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-center">
                <Coins className="mx-auto mb-4 text-blue-300" size={48} />
                <p className="text-blue-200">No active stakes yet</p>
                <p className="text-blue-300 text-sm">Start staking to earn rewards!</p>
              </div>
            ) : (
              userStakes.map((stake) => (
                <div key={stake.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{stake.staking_pools.name}</h3>
                      <p className="text-blue-200 text-sm">
                        Staked: {stake.amount.toLocaleString()} JAO
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-400">{stake.staking_pools.apy_rate}%</div>
                      <div className="text-xs text-blue-300">APY</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-blue-200 text-xs">Rewards Earned</p>
                      <p className="text-white font-semibold">{stake.accumulated_rewards.toFixed(4)} JAO</p>
                    </div>
                    <div>
                      <p className="text-blue-200 text-xs">Staked Since</p>
                      <p className="text-white font-semibold">
                        {new Date(stake.staked_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {stake.can_unstake_at && new Date() < new Date(stake.can_unstake_at) && (
                    <div className="mt-3 p-3 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                      <p className="text-orange-200 text-sm">
                        🔒 Locked until {new Date(stake.can_unstake_at).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingInterface;

import React, { useState } from 'react';
import { Search, Copy, CheckCircle, AlertCircle } from 'lucide-react';

const ManualBalanceChecker: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [balanceInfo, setBalanceInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const JAO_MINT_ADDRESS = 'EGzvPfc54EBvS3M6MKXWixDK32T7pVxXB8dZ7AW5bACr';

  const checkBalance = async () => {
    if (!walletAddress) {
      alert('Please enter your wallet address');
      return;
    }

    setLoading(true);
    setError('');
    setBalanceInfo(null);

    try {
      // Method 1: Use Helius API (free tier)
      console.log('🔍 Checking balance via Helius API...');
      
      const heliusResponse = await fetch(`https://api.helius.xyz/v0/addresses/${walletAddress}/balances?api-key=demo`, {
        method: 'GET',
      });

      if (heliusResponse.ok) {
        const heliusData = await heliusResponse.json();
        console.log('Helius response:', heliusData);

        const jaoToken = heliusData.tokens?.find((token: any) => 
          token.mint === JAO_MINT_ADDRESS
        );

        if (jaoToken) {
          setBalanceInfo({
            method: 'Helius API',
            balance: jaoToken.amount / Math.pow(10, jaoToken.decimals || 9),
            found: true,
            totalTokens: heliusData.tokens?.length || 0
          });
          return;
        }
      }

      // Method 2: Use Solscan API
      console.log('🔍 Checking balance via Solscan API...');
      
      const solscanResponse = await fetch(`https://public-api.solscan.io/account/tokens?account=${walletAddress}`);
      
      if (solscanResponse.ok) {
        const solscanData = await solscanResponse.json();
        console.log('Solscan response:', solscanData);

        const jaoToken = solscanData.find((token: any) => 
          token.tokenAddress === JAO_MINT_ADDRESS
        );

        if (jaoToken) {
          setBalanceInfo({
            method: 'Solscan API',
            balance: jaoToken.tokenAmount?.uiAmount || 0,
            found: true,
            totalTokens: solscanData.length
          });
          return;
        }

        setBalanceInfo({
          method: 'Solscan API',
          balance: 0,
          found: false,
          totalTokens: solscanData.length,
          allTokens: solscanData.slice(0, 5).map((t: any) => ({
            symbol: t.tokenSymbol,
            amount: t.tokenAmount?.uiAmount || 0,
            mint: t.tokenAddress
          }))
        });
        return;
      }

      // Method 3: Manual RPC call with different endpoint
      console.log('🔍 Checking balance via direct RPC...');
      
      const rpcResponse = await fetch('https://rpc.ankr.com/solana', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getTokenAccountsByOwner',
          params: [
            walletAddress,
            { programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' },
            { encoding: 'jsonParsed' }
          ]
        })
      });

      if (rpcResponse.ok) {
        const rpcData = await rpcResponse.json();
        console.log('RPC response:', rpcData);

        if (rpcData.result?.value) {
          const jaoAccount = rpcData.result.value.find((acc: any) => 
            acc.account.data.parsed.info.mint === JAO_MINT_ADDRESS
          );

          setBalanceInfo({
            method: 'Direct RPC',
            balance: jaoAccount ? jaoAccount.account.data.parsed.info.tokenAmount.uiAmount : 0,
            found: !!jaoAccount,
            totalTokens: rpcData.result.value.length,
            allTokens: rpcData.result.value.slice(0, 5).map((acc: any) => ({
              mint: acc.account.data.parsed.info.mint,
              amount: acc.account.data.parsed.info.tokenAmount.uiAmount
            }))
          });
          return;
        }
      }

      setError('All methods failed. Please check your wallet address.');

    } catch (err: any) {
      console.error('Error checking balance:', err);
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">🔍 Manual JAO Balance Checker</h2>
          <p className="text-blue-200">
            Check your JAO balance using multiple APIs to bypass RPC issues
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-white font-semibold mb-2">
              Enter Your Solana Wallet Address:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Enter your wallet address (e.g., 2Sm7QG...)"
                className="flex-1 bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-blue-200"
              />
              <button
                onClick={checkBalance}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Checking...
                  </>
                ) : (
                  <>
                    <Search size={16} />
                    Check Balance
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="text-red-400" size={20} />
                <p className="text-red-300">{error}</p>
              </div>
            </div>
          )}

          {balanceInfo && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                {balanceInfo.found ? (
                  <CheckCircle className="text-green-400" size={20} />
                ) : (
                  <AlertCircle className="text-yellow-400" size={20} />
                )}
                Balance Check Results
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-gray-300"><strong>Method Used:</strong> {balanceInfo.method}</p>
                  <p className="text-gray-300"><strong>JAO Found:</strong> {balanceInfo.found ? '✅ Yes' : '❌ No'}</p>
                  <p className="text-gray-300">
                    <strong>JAO Balance:</strong> 
                    <span className={balanceInfo.balance > 0 ? 'text-green-400' : 'text-gray-400'}>
                      {' '}{balanceInfo.balance.toLocaleString()} JAO
                    </span>
                  </p>
                  <p className="text-gray-300"><strong>Total Tokens:</strong> {balanceInfo.totalTokens}</p>
                </div>

                {balanceInfo.allTokens && (
                  <div>
                    <p className="text-gray-300 font-semibold mb-2">Other Tokens Found:</p>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {balanceInfo.allTokens.map((token: any, i: number) => (
                        <div key={i} className="text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-400">
                              {token.symbol || token.mint?.slice(0, 8) + '...'}
                            </span>
                            <span className="text-white">{token.amount}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {!balanceInfo.found && balanceInfo.totalTokens > 0 && (
                <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-700 rounded">
                  <p className="text-yellow-200 text-sm">
                    <strong>Found {balanceInfo.totalTokens} tokens but no JAO.</strong>
                    <br />
                    Your JAO tokens might have a different mint address, or you might not have any JAO tokens in this wallet.
                  </p>
                </div>
              )}

              {balanceInfo.found && (
                <div className="mt-4 p-3 bg-green-900/30 border border-green-700 rounded">
                  <p className="text-green-200 text-sm">
                    <strong>Success!</strong> Your wallet contains {balanceInfo.balance.toLocaleString()} JAO tokens.
                    The staking app should show this balance once RPC issues are resolved.
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
            <h4 className="text-blue-200 font-semibold mb-2">💡 How to get your wallet address:</h4>
            <div className="text-blue-300 text-sm space-y-1">
              <p><strong>Phantom:</strong> Click your wallet → Copy address</p>
              <p><strong>Solflare:</strong> Click the copy icon next to your wallet name</p>
              <p><strong>From browser:</strong> If connected, check the debug panel above</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualBalanceChecker;

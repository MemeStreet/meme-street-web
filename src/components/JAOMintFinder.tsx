// src/components/JAOMintFinder.tsx
import React, { useState } from 'react';
import { Search, Copy, ExternalLink, CheckCircle } from 'lucide-react';

interface TokenData {
  address: string;
  name: string;
  symbol: string;
}

interface PairData {
  baseToken: TokenData;
  quoteToken: TokenData;
  priceUsd: string;
  priceChange?: {
    h24: number;
  };
  volume?: {
    h24: number;
  };
  liquidity?: {
    usd: number;
  };
}

const JAOMintFinder: React.FC = () => {
  const [pairData, setPairData] = useState<PairData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<string>('');

  const pairAddress = 'H4B45vgJ5hLqmnUJPpaFfy2Z2uWrY1Xww8bvLom8Lfgz';

  const fetchPairData = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`https://api.dexscreener.com/latest/dex/pairs/solana/${pairAddress}`);
      const data = await response.json();
      
      if (data.pairs && data.pairs.length > 0) {
        const pair = data.pairs[0];
        setPairData(pair);
      } else {
        setError('No pair data found');
      }
    } catch (err: any) {
      setError('Failed to fetch pair data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-white/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">🔍 Find Your JAO Token Mint Address</h2>
          <p className="text-blue-200">First, we need to get your actual JAO token mint address from the trading pair</p>
        </div>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-100 mb-2">Your Trading Pair Address:</h3>
          <div className="flex items-center gap-2">
            <code className="bg-gray-800 px-3 py-2 rounded border text-sm font-mono text-green-400 break-all">
              {pairAddress}
            </code>
            <button
              onClick={() => copyToClipboard(pairAddress, 'pair')}
              className="p-2 hover:bg-blue-800 rounded text-white"
            >
              {copied === 'pair' ? <CheckCircle size={16} className="text-green-400" /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        <div className="text-center mb-6">
          <button
            onClick={fetchPairData}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-3 mx-auto transform transition-all hover:scale-105"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Loading...
              </>
            ) : (
              <>
                <Search size={20} />
                Find JAO Mint Address
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-6">
            <p className="text-red-300">❌ {error}</p>
          </div>
        )}

        {pairData && (
          <div className="bg-green-900/30 border border-green-700 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-green-100 mb-6 text-center">✅ Found Your JAO Token Details!</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🪙 JAO Token Info:
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-blue-200 block">Name:</label>
                    <p className="font-medium text-white text-lg">{pairData.baseToken.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-blue-200 block">Symbol:</label>
                    <p className="font-medium text-white text-lg">{pairData.baseToken.symbol}</p>
                  </div>
                  <div>
                    <label className="text-sm text-blue-200 block">Mint Address:</label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="bg-gray-800 px-3 py-2 rounded text-xs text-green-400 break-all flex-1">
                        {pairData.baseToken.address}
                      </code>
                      <button
                        onClick={() => copyToClipboard(pairData.baseToken.address, 'mint')}
                        className="p-2 hover:bg-gray-600 rounded text-white"
                      >
                        {copied === 'mint' ? <CheckCircle size={16} className="text-green-400" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  📈 Current Price Info:
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-blue-200 block">Price USD:</label>
                    <p className="font-medium text-white text-lg">${pairData.priceUsd}</p>
                  </div>
                  <div>
                    <label className="text-sm text-blue-200 block">24h Change:</label>
                    <p className={`font-medium text-lg ${(pairData.priceChange?.h24 || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {pairData.priceChange?.h24 ? `${pairData.priceChange.h24.toFixed(2)}%` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-blue-200 block">Volume 24h:</label>
                    <p className="font-medium text-white text-lg">
                      ${pairData.volume?.h24 ? Number(pairData.volume.h24).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-yellow-900/30 border border-yellow-700 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-yellow-100 mb-4 flex items-center gap-2">
                📝 IMPORTANT: Copy This to Your .env.local File
              </h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="text-gray-400"># Add this line to your .env.local file:</div>
                <div className="text-green-400 font-bold">REACT_APP_JAO_MINT_ADDRESS={pairData.baseToken.address}</div>
              </div>
              <button
                onClick={() => copyToClipboard(`REACT_APP_JAO_MINT_ADDRESS=${pairData.baseToken.address}`, 'env')}
                className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto"
              >
                {copied === 'env' ? <CheckCircle size={16} /> : <Copy size={16} />}
                Copy Environment Variable
              </button>
            </div>

            <div className="mt-6 text-center">
              <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
                <p className="text-blue-200 mb-2">
                  <strong>Next Step:</strong> After adding the mint address to your .env.local file, 
                  restart your development server and refresh the page.
                </p>
                <p className="text-blue-300 text-sm">
                  The staking interface will automatically load once the mint address is detected!
                </p>
              </div>
            </div>
          </div>
        )}

        {!pairData && !loading && (
          <div className="text-center">
            <div className="bg-gray-800 rounded-lg p-6">
              <p className="text-gray-300 mb-4">
                👆 Click the button above to fetch your JAO token details from the trading pair
              </p>
              <p className="text-gray-400 text-sm">
                This will give us the actual token mint address needed for balance checking and staking
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JAOMintFinder;

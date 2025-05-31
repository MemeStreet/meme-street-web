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
          <h2 className="text-2xl font-bold text-white mb-4">Find JAO Token Mint Address</h2>
          <p className="text-blue-200">Get your actual token mint from the trading pair</p>
        </div>

        <div className="text-center mb-6">
          <button
            onClick={fetchPairData}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Loading...
              </>
            ) : (
              <>
                <Search size={16} />
                Find JAO Mint Address
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-6">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {pairData && (
          <div className="bg-green-900/30 border border-green-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-100 mb-4">✅ Found JAO Token Details!</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">JAO Token:</h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm text-blue-200">Symbol:</label>
                    <p className="font-medium text-white">{pairData.baseToken.symbol}</p>
                  </div>
                  <div>
                    <label className="text-sm text-blue-200">Mint Address:</label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="bg-gray-800 px-2 py-1 rounded text-xs text-green-400 break-all">
                        {pairData.baseToken.address}
                      </code>
                      <button
                        onClick={() => copyToClipboard(pairData.baseToken.address, 'mint')}
                        className="p-1 hover:bg-gray-600 rounded"
                      >
                        {copied === 'mint' ? <CheckCircle size={14} className="text-green-400" /> : <Copy size={14} className="text-white" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">Price Info:</h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm text-blue-200">Price USD:</label>
                    <p className="font-medium text-white">${pairData.priceUsd}</p>
                  </div>
                  <div>
                    <label className="text-sm text-blue-200">24h Change:</label>
                    <p className={`font-medium ${(pairData.priceChange?.h24 || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {pairData.priceChange?.h24 ? `${pairData.priceChange.h24.toFixed(2)}%` : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <div># Copy this to your .env.local file:</div>
              <div>REACT_APP_JAO_MINT_ADDRESS={pairData.baseToken.address}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JAOMintFinder;

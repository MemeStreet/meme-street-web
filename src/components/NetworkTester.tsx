import React, { useState } from 'react';
import { Wifi, AlertCircle, CheckCircle } from 'lucide-react';

const NetworkTester: React.FC = () => {
  const [results, setResults] = useState<any>({});
  const [testing, setTesting] = useState(false);

  const testEndpoints = async () => {
    setTesting(true);
    const testResults: any = {};

    // Test 1: Basic internet connectivity
    try {
      const response = await fetch('https://httpbin.org/get', { method: 'GET' });
      testResults.internet = response.ok ? 'Working' : 'Failed';
    } catch (e) {
      testResults.internet = 'Failed';
    }

    // Test 2: Solana RPC endpoints
    const rpcEndpoints = [
      'https://api.mainnet-beta.solana.com',
      'https://rpc.ankr.com/solana',
      'https://solana-mainnet.rpc.extrnode.com'
    ];

    for (const endpoint of rpcEndpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'getVersion'
          })
        });
        
        const data = await response.json();
        testResults[endpoint] = response.ok && data.result ? 'Working' : 'Failed';
      } catch (e) {
        testResults[endpoint] = 'Failed';
      }
    }

    // Test 3: External APIs
    try {
      const response = await fetch('https://api.dexscreener.com/latest/dex/tokens/So11111111111111111111111111111111111111112');
      testResults.dexscreener = response.ok ? 'Working' : 'Failed';
    } catch (e) {
      testResults.dexscreener = 'Failed';
    }

    try {
      const response = await fetch('https://public-api.solscan.io/chaininfo');
      testResults.solscan = response.ok ? 'Working' : 'Failed';
    } catch (e) {
      testResults.solscan = 'Failed';
    }

    setResults(testResults);
    setTesting(false);
  };

  const testSpecificWallet = async (walletAddress: string) => {
    if (!walletAddress) {
      alert('Please enter a wallet address');
      return;
    }

    console.log('Testing wallet:', walletAddress);

    // Try the simplest possible API call
    try {
      console.log('Testing Solscan API...');
      const response = await fetch(`https://public-api.solscan.io/account/tokens?account=${walletAddress}`);
      console.log('Solscan response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Solscan data:', data);
        alert(`Found ${data.length} tokens in wallet via Solscan`);
      } else {
        console.log('Solscan failed with status:', response.status);
        alert('Solscan API failed');
      }
    } catch (e) {
      console.error('Solscan error:', e);
      alert('Solscan API error: ' + e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <Wifi size={32} />
            Network Connectivity Test
          </h2>
          <p className="text-blue-200">
            Let's test if the APIs are working from your location
          </p>
        </div>

        <div className="space-y-6">
          <button
            onClick={testEndpoints}
            disabled={testing}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-lg font-semibold"
          >
            {testing ? 'Testing APIs...' : 'Test All Endpoints'}
          </button>

          {Object.keys(results).length > 0 && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-white font-bold mb-4">Test Results:</h3>
              <div className="space-y-2">
                {Object.entries(results).map(([endpoint, status]) => (
                  <div key={endpoint} className="flex items-center justify-between">
                    <span className="text-gray-300">{endpoint}</span>
                    <div className="flex items-center gap-2">
                      {status === 'Working' ? (
                        <CheckCircle className="text-green-400" size={16} />
                      ) : (
                        <AlertCircle className="text-red-400" size={16} />
                      )}
                      <span className={status === 'Working' ? 'text-green-400' : 'text-red-400'}>
                        {status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-white/20 pt-6">
            <h3 className="text-white font-bold mb-4">Manual Wallet Test:</h3>
            <WalletTester onTest={testSpecificWallet} />
          </div>
        </div>
      </div>
    </div>
  );
};

const WalletTester: React.FC<{ onTest: (address: string) => void }> = ({ onTest }) => {
  const [address, setAddress] = useState('');

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter your wallet address..."
        className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-blue-200"
      />
      <button
        onClick={() => onTest(address)}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold"
      >
        Test This Wallet
      </button>
      
      <div className="text-sm text-gray-300">
        <p><strong>Example wallet format:</strong></p>
        <code className="bg-gray-700 px-2 py-1 rounded text-xs">
          2Sm7QGsnmLDxkMcmKG7H9dMkVMSgFoGmbSYLuCv65f3u
        </code>
      </div>
    </div>
  );
};

export default NetworkTester;

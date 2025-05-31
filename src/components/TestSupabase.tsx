import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_REACT_APP_SUPABASE_URL,
  import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY
);

const TestSupabase: React.FC = () => {
  const [pools, setPools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPools();
  }, []);

  const fetchPools = async () => {
    try {
      const { data, error } = await supabase
        .from('staking_pools')
        .select('*');
      
      if (error) {
        setError(error.message);
        console.error('Error:', error);
      } else {
        setPools(data || []);
        console.log('Pools loaded:', data);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 bg-white dark:bg-dark-800 rounded-lg shadow">
        <div className="animate-pulse text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white dark:bg-dark-800 rounded-lg shadow">
        <div className="text-red-600 dark:text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white dark:bg-dark-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">JAO Staking Pools</h2>
      <div className="grid gap-6">
        {pools.map(pool => (
          <div 
            key={pool.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {pool.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {pool.description}
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">APY Rate</p>
                <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                  {pool.apy_rate}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Minimum Stake</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {pool.min_stake_amount.toLocaleString()} JAO
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Lock Period</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {pool.lock_period_days} days
                </p>
              </div>
            </div>
          </div>
        ))}
        {pools.length === 0 && (
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">
            No staking pools available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default TestSupabase;
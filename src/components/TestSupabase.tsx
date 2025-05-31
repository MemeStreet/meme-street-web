import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_REACT_APP_SUPABASE_URL,
  import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY
);

const TestSupabase: React.FC = () => {
  const [status, setStatus] = useState<string>('Testing connection...');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('test')
          .select('*')
          .limit(1);

        if (error) {
          setStatus(`Connection error: ${error.message}`);
          console.error('Supabase connection error:', error);
        } else {
          setStatus('Successfully connected to Supabase!');
          console.log('Test data:', data);
        }
      } catch (err) {
        setStatus(`Unexpected error: ${err instanceof Error ? err.message : String(err)}`);
        console.error('Unexpected error:', err);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4 bg-white dark:bg-dark-800 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Supabase Connection Test</h2>
      <p className={`${
        status.includes('error') 
          ? 'text-red-600 dark:text-red-400' 
          : status.includes('Success')
          ? 'text-green-600 dark:text-green-400'
          : 'text-gray-600 dark:text-gray-400'
      }`}>
        {status}
      </p>
    </div>
  );
};

export default TestSupabase;
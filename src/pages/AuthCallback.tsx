import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Auth callback error:', error);
          navigate('/');
          return;
        }

        if (data.session) {
          // User is authenticated, redirect to main app
          navigate('/');
        } else {
          // No session, redirect to login
          navigate('/');
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Auth callback error:', error.message);
        } else {
          console.error('Auth callback error:', error);
        }
        navigate('/');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-white text-xl">Completing authentication...</div>
    </div>
  );
};

export default AuthCallback;

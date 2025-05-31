import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../lib/supabase';

const AuthForm: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to JAO Staking
          </h1>
          <p className="text-blue-200">
            Sign in to start staking your JAO tokens and earn rewards
          </p>
        </div>

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#3b82f6',
                  brandAccent: '#2563eb',
                  brandButtonText: 'white',
                  defaultButtonBackground: 'transparent',
                  defaultButtonBackgroundHover: '#374151',
                  defaultButtonBorder: '#6b7280',
                  defaultButtonText: 'white',
                  dividerBackground: '#374151',
                  inputBackground: 'rgba(255, 255, 255, 0.1)',
                  inputBorder: 'rgba(255, 255, 255, 0.2)',
                  inputBorderHover: 'rgba(255, 255, 255, 0.4)',
                  inputBorderFocus: '#3b82f6',
                  inputText: 'white',
                  inputLabelText: '#e5e7eb',
                  inputPlaceholder: '#9ca3af',
                }
              }
            },
            className: {
              anchor: 'text-blue-300 hover:text-blue-200',
              button: 'px-4 py-2 rounded-lg font-semibold transition-all',
              container: 'space-y-4',
              divider: 'my-6',
              input: 'w-full px-4 py-2 rounded-lg border backdrop-blur-sm',
              label: 'block text-sm font-medium mb-2',
              loader: 'animate-spin rounded-full border-b-2 border-white',
              message: 'p-3 rounded-lg text-sm'
            }
          }}
          providers={['google', 'github']}
          redirectTo={`${window.location.origin}/auth/callback`}
          onlyThirdPartyProviders={false}
          magicLink={true}
          showLinks={true}
        />

        <div className="mt-8 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
          <p className="text-blue-200 text-sm">
            💡 <strong>New to JAO?</strong> Create an account to start staking your tokens and earning rewards in our ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

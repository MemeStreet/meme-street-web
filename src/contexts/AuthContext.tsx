// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

// Types
interface Profile {
  id: string;
  wallet_address?: string;
  username?: string;
  total_jao_balance: number;
  total_staked: number;
  total_rewards_earned: number;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<{ error: any }>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ data: Profile | null; error: any }>;
  fetchProfile: (userId: string) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => ({ error: null }),
  updateProfile: async () => ({ data: null, error: null }),
  fetchProfile: async () => {},
});

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      }
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create it
        await createProfile(userId);
      } else if (data) {
        setProfile(data as Profile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const createProfile = async (userId: string): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([
          {
            id: userId,
            username: user?.email?.split('@')[0] || 'User',
            total_jao_balance: 0,
            total_staked: 0,
            total_rewards_earned: 0
          }
        ])
        .select()
        .single();

      if (error) throw error;
      setProfile(data as Profile);
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  const signOut = async (): Promise<{ error: any }> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      return { error };
    }
    return { error: null };
  };

  const updateProfile = async (updates: Partial<Profile>): Promise<{ data: Profile | null; error: any }> => {
    try {
      if (!user) {
        throw new Error('No authenticated user');
      }

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      setProfile(data as Profile);
      return { data: data as Profile, error: null };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { data: null, error };
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    loading,
    signOut,
    updateProfile,
    fetchProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

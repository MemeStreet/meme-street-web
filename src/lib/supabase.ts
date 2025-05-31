// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// Configuration with your actual JAO mint address
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://klawqaocicsyppdyvbey.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsYXdxYW9jaWNzeXBwZHl2YmV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NjMyMDUsImV4cCI6MjA2NDIzOTIwNX0.CuPK2w-NBXEOyL7wzZzXIk6FaubwG7Un73TFFIMZ2pg'

// Your JAO token configuration
export const JAO_CONFIG = {
  MINT_ADDRESS: process.env.REACT_APP_JAO_MINT_ADDRESS || 'EGzvPfc54EBvS3M6MKXWixDK32T7pVxXB8dZ7AW5bACr',
  PAIR_ADDRESS: 'H4B45vgJ5hLqmnUJPpaFfy2Z2uWrY1Xww8bvLom8Lfgz',
  SYMBOL: 'JAO',
  NAME: 'Jeets Are Out',
  DECIMALS: 9
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Debug info
console.log('JAO Config:', JAO_CONFIG)

// Database Types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          wallet_address: string | null
          username: string | null
          total_jao_balance: number
          total_staked: number
          total_rewards_earned: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          wallet_address?: string | null
          username?: string | null
          total_jao_balance?: number
          total_staked?: number
          total_rewards_earned?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          wallet_address?: string | null
          username?: string | null
          total_jao_balance?: number
          total_staked?: number
          total_rewards_earned?: number
          created_at?: string
          updated_at?: string
        }
      }
      staking_pools: {
        Row: {
          id: string
          name: string
          description: string | null
          apy_rate: number
          min_stake_amount: number
          max_stake_amount: number | null
          total_staked: number
          total_stakers: number
          is_active: boolean
          lock_period_days: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          apy_rate: number
          min_stake_amount?: number
          max_stake_amount?: number | null
          total_staked?: number
          total_stakers?: number
          is_active?: boolean
          lock_period_days?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          apy_rate?: number
          min_stake_amount?: number
          max_stake_amount?: number | null
          total_staked?: number
          total_stakers?: number
          is_active?: boolean
          lock_period_days?: number
          created_at?: string
        }
      }
      user_stakes: {
        Row: {
          id: string
          user_id: string
          pool_id: string
          amount: number
          staked_at: string
          unstaked_at: string | null
          last_reward_calculation: string
          accumulated_rewards: number
          is_active: boolean
          can_unstake_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          pool_id: string
          amount: number
          staked_at?: string
          unstaked_at?: string | null
          last_reward_calculation?: string
          accumulated_rewards?: number
          is_active?: boolean
          can_unstake_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          pool_id?: string
          amount?: number
          staked_at?: string
          unstaked_at?: string | null
          last_reward_calculation?: string
          accumulated_rewards?: number
          is_active?: boolean
          can_unstake_at?: string | null
        }
      }
      reward_transactions: {
        Row: {
          id: string
          user_id: string
          stake_id: string
          amount: number
          transaction_type: 'reward_earned' | 'reward_claimed' | 'stake_created' | 'stake_withdrawn'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stake_id: string
          amount: number
          transaction_type: 'reward_earned' | 'reward_claimed' | 'stake_created' | 'stake_withdrawn'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stake_id?: string
          amount?: number
          transaction_type?: 'reward_earned' | 'reward_claimed' | 'stake_created' | 'stake_withdrawn'
          created_at?: string
        }
      }
    }
  }
}

// types/index.ts
import { PublicKey } from '@solana/web3.js'

export interface User {
  id: string
  wallet_address: string
  created_at: string
  updated_at: string
}

export interface StakingPool {
  id: string
  name: string
  token_mint: string
  reward_token_mint: string
  apy: number
  total_staked: number
  max_stake_per_user?: number
  min_stake_amount: number
  is_active: boolean
  created_at: string
}

export interface Stake {
  id: string
  user_id: string
  pool_id: string
  amount: number
  staked_at: string
  unstaked_at?: string
  is_active: boolean
  transaction_signature?: string
  rewards_claimed: number
  staking_pools?: StakingPool
}

export interface Reward {
  id: string
  stake_id: string
  amount: number
  claimed_at: string
  transaction_signature?: string
}

export interface RPCEndpoint {
  name: string
  url: string
  status: 'working' | 'failed' | 'backup'
  responseTime?: number
}

export interface RPCHealthCheck {
  isWorking: boolean
  responseTime: number
  error?: string
}

export interface StakeResult {
  signature: string
  userId: string
}

export interface TransactionResult {
  signature: string
  success: boolean
  error?: string
}

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<User, 'id'>>
      }
      staking_pools: {
        Row: StakingPool
        Insert: Omit<StakingPool, 'id' | 'created_at'>
        Update: Partial<Omit<StakingPool, 'id'>>
      }
      stakes: {
        Row: Stake
        Insert: Omit<Stake, 'id' | 'staked_at' | 'is_active' | 'rewards_claimed'>
        Update: Partial<Omit<Stake, 'id'>>
      }
      rewards: {
        Row: Reward
        Insert: Omit<Reward, 'id' | 'claimed_at'>
        Update: Partial<Omit<Reward, 'id'>>
      }
    }
  }
}

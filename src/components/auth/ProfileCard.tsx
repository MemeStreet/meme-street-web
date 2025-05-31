import React, { useState, ChangeEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Wallet, Settings, LogOut, Edit3, Save, X } from 'lucide-react';

// Define interfaces for user and profile data
interface Profile {
  username?: string;
  wallet_address?: string;
  total_jao_balance?: number;
  total_staked?: number;
  total_rewards_earned?: number;
}

interface AuthUser {
  email?: string;
}

interface EditData {
  username: string;
  wallet_address: string;
}

const ProfileCard: React.FC = () => {
  const { user, profile, signOut, updateProfile } = useAuth() as {
    user: AuthUser | null;
    profile: Profile | null;
    signOut: () => Promise<void>;
    updateProfile: (data: EditData) => Promise<{ error?: string }>;
  };

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editData, setEditData] = useState<EditData>({
    username: profile?.username || '',
    wallet_address: profile?.wallet_address || ''
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleSave = async () => {
    setLoading(true);
    const { error } = await updateProfile(editData);
    if (!error) {
      setIsEditing(false);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setEditData({
      username: profile?.username || '',
      wallet_address: profile?.wallet_address || ''
    });
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
            <User className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-white font-semibold">
              {profile?.username || 'User'}
            </h3>
            <p className="text-blue-200 text-sm">{user?.email}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Edit3 className="text-blue-300" size={16} />
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={loading}
                className="p-2 hover:bg-green-500/20 rounded-lg transition-colors"
              >
                <Save className="text-green-400" size={16} />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <X className="text-red-400" size={16} />
              </button>
            </div>
          )}
          <button
            onClick={handleSignOut}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
          >
            <LogOut className="text-red-400" size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-blue-200 text-sm block mb-2">Username</label>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={editData.username}
              onChange={handleChange}
              className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-blue-200"
              placeholder="Enter username"
            />
          ) : (
            <p className="text-white">{profile?.username || 'Not set'}</p>
          )}
        </div>

        <div>
          <label className="text-blue-200 text-sm block mb-2">Wallet Address</label>
          {isEditing ? (
            <input
              type="text"
              name="wallet_address"
              value={editData.wallet_address}
              onChange={handleChange}
              className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-blue-200 font-mono text-sm"
              placeholder="Connect your Solana wallet"
            />
          ) : (
            <p className="text-white font-mono text-sm">
              {profile?.wallet_address 
                ? `${profile.wallet_address.slice(0, 8)}...${profile.wallet_address.slice(-8)}`
                : 'Not connected'
              }
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
          <div className="text-center">
            <p className="text-blue-200 text-xs">JAO Balance</p>
            <p className="text-white font-semibold">
              {profile?.total_jao_balance?.toLocaleString() || '0'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-blue-200 text-xs">Total Staked</p>
            <p className="text-white font-semibold">
              {profile?.total_staked?.toLocaleString() || '0'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-blue-200 text-xs">Rewards Earned</p>
            <p className="text-green-400 font-semibold">
              {profile?.total_rewards_earned?.toFixed(4) || '0'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

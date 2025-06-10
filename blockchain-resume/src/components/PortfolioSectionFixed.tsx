"use client";

import React, { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity,
  ExternalLink,
  Coins
} from 'lucide-react';
import axios from 'axios';
import dynamic from 'next/dynamic';

// Dynamically import recharts components to avoid SSR issues
const LineChart = dynamic(
  () => import('recharts').then((mod) => mod.LineChart),
  { ssr: false }
);
const Line = dynamic(
  () => import('recharts').then((mod) => mod.Line),
  { ssr: false }
);
const XAxis = dynamic(
  () => import('recharts').then((mod) => mod.XAxis),
  { ssr: false }
);
const YAxis = dynamic(
  () => import('recharts').then((mod) => mod.YAxis),
  { ssr: false }
);
const CartesianGrid = dynamic(
  () => import('recharts').then((mod) => mod.CartesianGrid),
  { ssr: false }
);
const Tooltip = dynamic(
  () => import('recharts').then((mod) => mod.Tooltip),
  { ssr: false }
);
const ResponsiveContainer = dynamic(
  () => import('recharts').then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);

interface TokenBalance {
  mint: string;
  amount: number;
  decimals: number;
  name?: string;
  symbol?: string;
  logoURI?: string;
}

interface Transaction {
  signature: string;
  blockTime: number;
  amount: number;
  type: 'sent' | 'received';
}

interface PriceData {
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
}

const PortfolioSectionFixed: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number>(0);
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [portfolioValue, setPortfolioValue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [priceHistory, setPriceHistory] = useState<Array<{ time: string; price: number }>>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch SOL price data
  const fetchPriceData = async () => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_last_updated_at=true'
      );
      
      const solData = response.data.solana;
      setPriceData({
        price: solData.usd,
        change24h: solData.usd_24h_change || 0,
        high24h: solData.usd + (solData.usd * 0.05), // Mock data
        low24h: solData.usd - (solData.usd * 0.03), // Mock data
      });

      // Generate price history for the last 24 hours
      const history = [];
      const now = new Date();
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
        history.push({
          time: time.toISOString().split('T')[1].split(':')[0] + ':00',
          price: solData.usd * (1 + variation)
        });
      }
      setPriceHistory(history);
    } catch (error) {
      console.error('Error fetching price data:', error);
    }
  };

  // Fetch wallet balance
  const fetchBalance = async () => {
    if (!publicKey || !connection) return;

    try {
      setLoading(true);
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mock transaction data
  const generateMockTransactions = () => {
    const mockTxs: Transaction[] = [
      {
        signature: 'mock_signature_1',
        blockTime: Date.now() - 3600000,
        amount: 0.5,
        type: 'received'
      },
      {
        signature: 'mock_signature_2',
        blockTime: Date.now() - 7200000,
        amount: 0.2,
        type: 'sent'
      }
    ];
    setTransactions(mockTxs);
  };

  useEffect(() => {
    fetchPriceData();
    const interval = setInterval(fetchPriceData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (connected && publicKey) {
      fetchBalance();
      generateMockTransactions();
    }
  }, [connected, publicKey]);

  useEffect(() => {
    if (priceData && balance) {
      setPortfolioValue(balance * priceData.price);
    }
  }, [priceData, balance]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatSOL = (amount: number) => {
    return `${amount.toFixed(4)} SOL`;
  };

  return (
    <div className="bg-black backdrop-blur-sm rounded-xl p-8 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 font-[family-name:var(--font-orbitron)]">
        <Wallet className="text-purple-400" />
        Solana Wallet Portfolio (Fixed)
      </h2>
      
      {/* Wallet Connection */}
      <div className="mb-6">
        <WalletMultiButton />
      </div>

      {connected ? (
        <div className="space-y-6">
          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* SOL Balance */}
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-6 rounded-lg border border-purple-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">SOL Balance</p>
                  <p className="text-2xl font-bold text-white">
                    {loading ? 'Loading...' : formatSOL(balance)}
                  </p>
                </div>
                <Coins className="text-purple-400" size={32} />
              </div>
            </div>

            {/* Portfolio Value */}
            <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 p-6 rounded-lg border border-green-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Portfolio Value</p>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(portfolioValue)}
                  </p>
                </div>
                <DollarSign className="text-green-400" size={32} />
              </div>
            </div>

            {/* SOL Price */}
            <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-6 rounded-lg border border-blue-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">SOL Price</p>
                  <p className="text-2xl font-bold text-white">
                    {priceData ? formatCurrency(priceData.price) : 'Loading...'}
                  </p>
                  {priceData && (
                    <div className="flex items-center gap-1 mt-1">
                      {priceData.change24h >= 0 ? (
                        <TrendingUp className="text-green-400" size={16} />
                      ) : (
                        <TrendingDown className="text-red-400" size={16} />
                      )}
                      <span className={`text-sm ${priceData.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {priceData.change24h.toFixed(2)}%
                      </span>
                    </div>
                  )}
                </div>
                <Activity className="text-blue-400" size={32} />
              </div>
            </div>
          </div>

          {/* Price Chart */}
          {isClient && priceHistory.length > 0 && (
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">24H Price Chart</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#8B5CF6" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Recent Transactions */}
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {transactions.map((tx, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      {tx.type === 'received' ? (
                        <TrendingUp className="text-white" size={20} />
                      ) : (
                        <TrendingDown className="text-white" size={20} />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {tx.type === 'received' ? 'Received' : 'Sent'} {formatSOL(tx.amount)}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {new Date(tx.blockTime).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button className="text-purple-400 hover:text-purple-300">
                    <ExternalLink size={20} />
                  </button>
                </div>
              ))}
              {transactions.length === 0 && (
                <p className="text-gray-400 text-center py-4">No recent transactions</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Wallet className="mx-auto text-gray-600 mb-4" size={64} />
          <p className="text-gray-400 text-lg">Connect your wallet to view portfolio</p>
        </div>
      )}
    </div>
  );
};

export default PortfolioSectionFixed;

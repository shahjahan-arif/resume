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
// Temporarily disable recharts until we fix the SSR issue
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DynamicLineChart } from './DynamicChart';
import axios from 'axios';

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

const PortfolioSection: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number>(0);
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [portfolioValue, setPortfolioValue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [priceHistory, setPriceHistory] = useState<Array<{ name: string; price: number }>>([]);

  // Fetch SOL price data
  useEffect(() => {
    // Mock price history data for demonstration
    const mockPriceHistory = [
      { name: '00:00', price: 23.45 },
      { name: '04:00', price: 24.12 },
      { name: '08:00', price: 23.89 },
      { name: '12:00', price: 25.34 },
      { name: '16:00', price: 24.76 },
      { name: '20:00', price: 25.12 },
      { name: '24:00', price: 24.89 },
    ];

    const fetchSolPrice = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true'
        );
        
        const solData = response.data.solana;
        setPriceData({
          price: solData.usd,
          change24h: solData.usd_24h_change,
          high24h: solData.usd * 1.05, // Mock high
          low24h: solData.usd * 0.95, // Mock low
        });
        setPriceHistory(mockPriceHistory.map(item => ({ ...item, price: solData.usd + (Math.random() - 0.5) * 2 })));
      } catch (error) {
        console.error('Error fetching SOL price:', error);
        // Fallback mock data
        setPriceData({
          price: 24.89,
          change24h: 2.34,
          high24h: 25.67,
          low24h: 23.12,
        });
        setPriceHistory(mockPriceHistory);
      }
    };

    fetchSolPrice();
    const interval = setInterval(fetchSolPrice, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Fetch wallet data when connected
  useEffect(() => {
    if (!connected || !publicKey) {
      setBalance(0);
      setTokenBalances([]);
      setTransactions([]);
      setPortfolioValue(0);
      return;
    }

    const fetchWalletData = async () => {
      setLoading(true);
      try {
        // Fetch SOL balance
        const solBalance = await connection.getBalance(publicKey);
        const solAmount = solBalance / LAMPORTS_PER_SOL;
        setBalance(solAmount);

        // Calculate portfolio value
        if (priceData) {
          setPortfolioValue(solAmount * priceData.price);
        }

        // Fetch recent transactions
        const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 10 });
        const recentTxs: Transaction[] = signatures.map((sig, index) => ({
          signature: sig.signature,
          blockTime: sig.blockTime || Date.now() / 1000,
          amount: Math.random() * 0.5 + 0.1, // Mock amount
          type: index % 2 === 0 ? 'received' : 'sent',
        }));
        setTransactions(recentTxs);

        // Mock token balances for demonstration
        const mockTokens: TokenBalance[] = [
          {
            mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
            amount: 150.50,
            decimals: 6,
            name: 'USD Coin',
            symbol: 'USDC',
            logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
          },
          {
            mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
            amount: 89.23,
            decimals: 6,
            name: 'Tether USD',
            symbol: 'USDT',
            logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.png'
          }
        ];
        setTokenBalances(mockTokens);

      } catch (error) {
        console.error('Error fetching wallet data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [connected, publicKey, connection, priceData]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(num);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (!connected) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-3 font-[family-name:var(--font-orbitron)]">
          <Wallet className="text-black" />
          Solana Portfolio
        </h2>
        <div className="text-center py-8">
          <Wallet className="mx-auto text-gray-600 mb-4" size={48} />
          <p className="text-black mb-6">Connect your Solana wallet to view your portfolio</p>
          <WalletMultiButton className="!bg-black hover:!bg-gray-800" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-black">
      {/* Wallet Connection & Overview */}
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-2xl font-bold text-black mb-4 md:mb-0 flex items-center gap-3 font-[family-name:var(--font-orbitron)]">
            <Wallet className="text-black" />
            Solana Portfolio
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <WalletMultiButton className="!bg-black hover:!bg-gray-800" />
            {publicKey && (
              <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 px-4 py-2 rounded-lg">
                <span className="text-gray-700 text-sm">
                  {truncateAddress(publicKey.toString())}
                </span>
                <ExternalLink size={14} className="text-gray-600" />
              </div>
            )}
          </div>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700">Total Value</span>
              <DollarSign className="text-black" size={20} />
            </div>
            <div className="text-2xl font-bold text-black">
              {loading ? '...' : formatCurrency(portfolioValue)}
            </div>
            <div className="text-sm text-gray-600">
              {balance > 0 && `${formatNumber(balance)} SOL`}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700">SOL Price</span>
              <TrendingUp className="text-black" size={20} />
            </div>
            <div className="text-2xl font-bold text-black">
              {priceData ? formatCurrency(priceData.price) : '...'}
            </div>
            <div className={`text-sm flex items-center gap-1 ${
              priceData && priceData.change24h > 0 ? 'text-green-700' : 'text-red-700'
            }`}>
              {priceData && priceData.change24h > 0 ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              {priceData ? `${priceData.change24h.toFixed(2)}%` : '...'}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700">Tokens</span>
              <Coins className="text-black" size={20} />
            </div>
            <div className="text-2xl font-bold text-black">
              {tokenBalances.length + 1}
            </div>
            <div className="text-sm text-gray-600">
              Including SOL
            </div>
          </div>
        </div>

        {/* Price Chart - Temporarily disabled due to SSR issues */}
        {priceHistory.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-black mb-4">SOL Price (24h)</h3>
            <DynamicLineChart 
              data={priceHistory} 
              dataKey="price" 
              stroke="#10b981" 
              className="h-64"
            />
          </div>
        )}
      </div>

      {/* Token Holdings */}
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <h3 className="text-xl font-bold text-black mb-6 flex items-center gap-3">
          <Coins className="text-black" />
          Token Holdings
        </h3>
        <div className="space-y-4">
          {/* SOL Balance */}
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">SOL</span>
              </div>
              <div>
                <h4 className="text-black font-semibold">Solana</h4>
                <p className="text-gray-600 text-sm">SOL</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-black font-semibold">{formatNumber(balance)}</p>
              <p className="text-gray-600 text-sm">
                {priceData ? formatCurrency(balance * priceData.price) : '...'}
              </p>
            </div>
          </div>

          {/* Other Tokens */}
          {tokenBalances.map((token, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">{token.symbol}</span>
                </div>
                <div>
                  <h4 className="text-black font-semibold">{token.name}</h4>
                  <p className="text-gray-600 text-sm">{token.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-black font-semibold">{formatNumber(token.amount)}</p>
                <p className="text-gray-600 text-sm">
                  {token.symbol === 'USDC' || token.symbol === 'USDT' 
                    ? formatCurrency(token.amount) 
                    : 'Value N/A'
                  }
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <h3 className="text-xl font-bold text-black mb-6 flex items-center gap-3">
          <Activity className="text-black" />
          Recent Transactions
        </h3>
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No recent transactions</p>
          ) : (
            transactions.map((tx, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    tx.type === 'received' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {tx.type === 'received' ? '↓' : '↑'}
                  </div>
                  <div>
                    <p className="text-black font-medium capitalize">{tx.type}</p>
                    <p className="text-gray-600 text-sm">
                      {new Date(tx.blockTime * 1000).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    tx.type === 'received' ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {tx.type === 'received' ? '+' : '-'}{formatNumber(tx.amount)} SOL
                  </p>
                  <p className="text-gray-600 text-sm">
                    {truncateAddress(tx.signature)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioSection;

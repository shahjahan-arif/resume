"use client";

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3,
  Zap,
  Coins,
  Timer,
  Target
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  volume_24h: number;
  high_24h: number;
  low_24h: number;
  image?: string;
}

interface PricePoint {
  time: string;
  price: number;
  volume: number;
}

const LiveTradingDashboard: React.FC = () => {
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<string>('solana');
  const [priceHistory, setPriceHistory] = useState<PricePoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Featured cryptocurrencies to track
  const featuredCryptos = ['solana', 'bitcoin', 'ethereum', 'cardano', 'polygon-pos', 'chainlink'];

  // Mock trading statistics
  const tradingStats = {
    totalTrades: 1247,
    successRate: 87.3,
    totalProfitLoss: 15847.50,
    avgHoldTime: '4.2 days',
    bestTrade: 2340.00,
    winStreak: 12
  };

  // Fetch crypto prices
  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${featuredCryptos.join(',')}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
        );
        
        setCryptoPrices(response.data);
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
        // Fallback mock data
        const mockData: CryptoPrice[] = [
          {
            id: 'solana',
            symbol: 'sol',
            name: 'Solana',
            current_price: 24.89,
            price_change_percentage_24h: 2.34,
            market_cap: 10567890123,
            volume_24h: 834567890,
            high_24h: 25.67,
            low_24h: 23.12
          },
          {
            id: 'bitcoin',
            symbol: 'btc',
            name: 'Bitcoin',
            current_price: 43250.00,
            price_change_percentage_24h: -1.23,
            market_cap: 846789123456,
            volume_24h: 15678901234,
            high_24h: 44100.00,
            low_24h: 42800.00
          },
          {
            id: 'ethereum',
            symbol: 'eth',
            name: 'Ethereum',
            current_price: 2567.89,
            price_change_percentage_24h: 3.45,
            market_cap: 308567890123,
            volume_24h: 8765432109,
            high_24h: 2645.00,
            low_24h: 2489.00
          }
        ];
        setCryptoPrices(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoPrices();
    const interval = setInterval(fetchCryptoPrices, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Generate mock price history for selected crypto
  useEffect(() => {
    const generateMockHistory = () => {
      const selectedCoin = cryptoPrices.find(coin => coin.id === selectedCrypto);
      if (!selectedCoin) return;

      const history: PricePoint[] = [];
      const now = new Date();
      const basePrice = selectedCoin.current_price;

      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
        const price = basePrice * (1 + variation);
        const volume = Math.random() * 1000000 + 500000;

        history.push({
          time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          price: Number(price.toFixed(2)),
          volume: Number(volume.toFixed(0))
        });
      }

      setPriceHistory(history);
    };

    if (cryptoPrices.length > 0) {
      generateMockHistory();
    }
  }, [selectedCrypto, cryptoPrices]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatPercentage = (percent: number) => {
    const sign = percent >= 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-black backdrop-blur-sm rounded-xl p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-2xl font-bold text-white mb-4 md:mb-0 flex items-center gap-3 font-[family-name:var(--font-orbitron)]">
            <BarChart3 className="text-yellow-400" />
            Live Market Dashboard
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Timer size={16} />
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
        </div>

        {/* Trading Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 p-4 rounded-lg border border-green-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Target className="text-green-400" size={16} />
              <span className="text-gray-300 text-sm">Total Trades</span>
            </div>
            <div className="text-xl font-bold text-white">{tradingStats.totalTrades}</div>
          </div>

          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 p-4 rounded-lg border border-blue-500/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-blue-400" size={16} />
              <span className="text-gray-300 text-sm">Success Rate</span>
            </div>
            <div className="text-xl font-bold text-white">{tradingStats.successRate}%</div>
          </div>

          <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 p-4 rounded-lg border border-purple-500/30">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="text-purple-400" size={16} />
              <span className="text-gray-300 text-sm">P&L</span>
            </div>
            <div className="text-xl font-bold text-green-400">
              +{formatCurrency(tradingStats.totalProfitLoss)}
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 p-4 rounded-lg border border-orange-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Timer className="text-orange-400" size={16} />
              <span className="text-gray-300 text-sm">Avg Hold</span>
            </div>
            <div className="text-xl font-bold text-white">{tradingStats.avgHoldTime}</div>
          </div>

          <div className="bg-gradient-to-r from-pink-600/20 to-rose-600/20 p-4 rounded-lg border border-pink-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="text-pink-400" size={16} />
              <span className="text-gray-300 text-sm">Best Trade</span>
            </div>
            <div className="text-xl font-bold text-green-400">
              +{formatCurrency(tradingStats.bestTrade)}
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-600/20 to-amber-600/20 p-4 rounded-lg border border-yellow-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Target className="text-yellow-400" size={16} />
              <span className="text-gray-300 text-sm">Win Streak</span>
            </div>
            <div className="text-xl font-bold text-white">{tradingStats.winStreak}</div>
          </div>
        </div>
      </div>

      {/* Crypto Prices Grid */}
      <div className="bg-black backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <Coins className="text-gold-400" />
          Market Overview
        </h3>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cryptoPrices.map((crypto) => (
              <div 
                key={crypto.id}
                className={`p-6 rounded-lg border transition-all duration-300 cursor-pointer hover:scale-105 ${
                  selectedCrypto === crypto.id 
                    ? 'bg-yellow-600/20 border-yellow-500/50' 
                    : 'bg-gray-800/50 border-gray-700/50 hover:border-yellow-400/50'
                }`}
                onClick={() => setSelectedCrypto(crypto.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {crypto.symbol.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{crypto.name}</h4>
                      <p className="text-gray-400 text-sm">{crypto.symbol.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className={`p-2 rounded-full ${
                    crypto.price_change_percentage_24h >= 0 
                      ? 'bg-green-600/20 text-green-400' 
                      : 'bg-red-600/20 text-red-400'
                  }`}>
                    {crypto.price_change_percentage_24h >= 0 ? (
                      <TrendingUp size={16} />
                    ) : (
                      <TrendingDown size={16} />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Price</span>
                    <span className="text-white font-bold">
                      {formatCurrency(crypto.current_price)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">24h Change</span>
                    <span className={`font-semibold ${
                      crypto.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {formatPercentage(crypto.price_change_percentage_24h)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Market Cap</span>
                    <span className="text-white text-sm">
                      {formatLargeNumber(crypto.market_cap)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Volume</span>
                    <span className="text-white text-sm">
                      {formatLargeNumber(crypto.volume_24h)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Chart */}
      {priceHistory.length > 0 && (
        <div className="bg-black backdrop-blur-sm rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <BarChart3 className="text-yellow-400" />
              {cryptoPrices.find(c => c.id === selectedCrypto)?.name} Price Chart (24h)
            </h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-yellow-600 text-white rounded text-sm">24H</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm">7D</button>
              <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm">30D</button>
            </div>
          </div>
          
          <div className="h-80 bg-gray-800/50 rounded-lg p-4">
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
                  formatter={(value, name) => [
                    name === 'price' ? formatCurrency(Number(value)) : formatLargeNumber(Number(value)),
                    name === 'price' ? 'Price' : 'Volume'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveTradingDashboard;

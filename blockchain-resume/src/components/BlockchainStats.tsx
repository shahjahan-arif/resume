"use client";

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Zap, 
  Users, 
  Code, 
  GitBranch,
  Star,
  Activity,
  Shield,
  Cpu,
  Globe
} from 'lucide-react';
// Temporarily disable recharts until we fix the SSR issue
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { DynamicLineChart, DynamicBarChart } from './DynamicChart';

interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalCommits: number;
  totalContributions: number;
  languages: Array<{ name: string; percentage: number; color: string }>;
}

interface BlockchainMetrics {
  totalTransactions: number;
  totalValueLocked: number;
  contractsDeployed: number;
  gasOptimization: number;
  securityScore: number;
  networkUptime: number;
}

const BlockchainStats: React.FC = () => {
  const githubStats: GitHubStats = {
    totalRepos: 47,
    totalStars: 234,
    totalCommits: 1847,
    totalContributions: 2150,
    languages: [
      { name: 'TypeScript', percentage: 35, color: '#3178C6' },
      { name: 'JavaScript', percentage: 25, color: '#F7DF1E' },
      { name: 'Rust', percentage: 20, color: '#000000' },
      { name: 'Solidity', percentage: 15, color: '#627EEA' },
      { name: 'Python', percentage: 5, color: '#3776AB' },
    ]
  };

  const blockchainMetrics: BlockchainMetrics = {
    totalTransactions: 15847,
    totalValueLocked: 2400000,
    contractsDeployed: 23,
    gasOptimization: 94.5,
    securityScore: 98.2,
    networkUptime: 99.97
  };

  const [contributionData, setContributionData] = useState<Array<{ name: string; contributions: number }>>([]);
  const [performanceData, setPerformanceData] = useState<Array<{ name: string; value: number; target: number }>>([]);

  useEffect(() => {
    // Mock contribution data for the last 12 months
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const mockContributions = months.map(month => ({
      name: month,
      contributions: Math.floor(Math.random() * 100) + 50
    }));
    setContributionData(mockContributions);

    // Mock performance metrics
    const mockPerformance = [
      { name: 'Code Quality', value: 95, target: 90 },
      { name: 'Test Coverage', value: 88, target: 80 },
      { name: 'Security', value: 98, target: 95 },
      { name: 'Performance', value: 92, target: 85 },
      { name: 'Documentation', value: 87, target: 80 },
    ];
    setPerformanceData(mockPerformance);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="bg-black backdrop-blur-sm rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 font-[family-name:var(--font-orbitron)]">
          <Activity className="text-cyan-400" />
          Blockchain Development Metrics
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 p-6 rounded-lg border border-cyan-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Total Transactions</span>
              <Activity className="text-cyan-400" size={20} />
            </div>
            <div className="text-2xl font-bold text-white">
              {formatNumber(blockchainMetrics.totalTransactions)}
            </div>
            <div className="text-sm text-cyan-400">+12% this month</div>
          </div>

          <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 p-6 rounded-lg border border-green-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Value Locked</span>
              <TrendingUp className="text-green-400" size={20} />
            </div>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(blockchainMetrics.totalValueLocked)}
            </div>
            <div className="text-sm text-green-400">+25% growth</div>
          </div>

          <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 p-6 rounded-lg border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Smart Contracts</span>
              <Code className="text-purple-400" size={20} />
            </div>
            <div className="text-2xl font-bold text-white">
              {blockchainMetrics.contractsDeployed}
            </div>
            <div className="text-sm text-purple-400">Deployed & Verified</div>
          </div>

          <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 p-6 rounded-lg border border-orange-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Security Score</span>
              <Shield className="text-orange-400" size={20} />
            </div>
            <div className="text-2xl font-bold text-white">
              {blockchainMetrics.securityScore}%
            </div>
            <div className="text-sm text-orange-400">Audit Grade A+</div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">Monthly Contributions</h3>
            <DynamicLineChart 
              data={contributionData} 
              dataKey="contributions" 
              stroke="#06b6d4" 
              className="h-64"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
            <DynamicBarChart 
              data={performanceData} 
              dataKey="value" 
              fill="#8b5cf6"
              className="h-64"
            />
          </div>
        </div>
      </div>

      {/* GitHub Stats */}
      <div className="bg-black backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <GitBranch className="text-gray-400" />
          GitHub Activity
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Code className="text-blue-400" size={20} />
              <span className="text-gray-300">Repositories</span>
            </div>
            <div className="text-2xl font-bold text-white">{githubStats.totalRepos}</div>
          </div>

          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Star className="text-yellow-400" size={20} />
              <span className="text-gray-300">Stars Earned</span>
            </div>
            <div className="text-2xl font-bold text-white">{githubStats.totalStars}</div>
          </div>

          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <GitBranch className="text-green-400" size={20} />
              <span className="text-gray-300">Commits</span>
            </div>
            <div className="text-2xl font-bold text-white">{formatNumber(githubStats.totalCommits)}</div>
          </div>

          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Users className="text-purple-400" size={20} />
              <span className="text-gray-300">Contributions</span>
            </div>
            <div className="text-2xl font-bold text-white">{formatNumber(githubStats.totalContributions)}</div>
          </div>
        </div>

        {/* Language Distribution */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Language Distribution</h4>
          <div className="space-y-3">
            {githubStats.languages.map((lang, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300">{lang.name}</span>
                  <span className="text-gray-400">{lang.percentage}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${lang.percentage}%`, 
                      backgroundColor: lang.color 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Excellence */}
      <div className="bg-black backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <Cpu className="text-pink-400" />
          Technical Excellence
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-pink-600/20 to-rose-600/20 p-6 rounded-lg border border-pink-500/30">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="text-pink-400" size={24} />
              <h4 className="text-white font-semibold">Gas Optimization</h4>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {blockchainMetrics.gasOptimization}%
            </div>
            <p className="text-gray-300 text-sm">
              Average gas savings across all deployed contracts
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-600/20 to-teal-600/20 p-6 rounded-lg border border-green-500/30">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="text-green-400" size={24} />
              <h4 className="text-white font-semibold">Network Uptime</h4>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {blockchainMetrics.networkUptime}%
            </div>
            <p className="text-gray-300 text-sm">
              Reliability across all deployed infrastructure
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-6 rounded-lg border border-blue-500/30">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-blue-400" size={24} />
              <h4 className="text-white font-semibold">Security Rating</h4>
            </div>
            <div className="text-3xl font-bold text-white mb-2">A+</div>
            <p className="text-gray-300 text-sm">
              Third-party security audits and code reviews
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainStats;

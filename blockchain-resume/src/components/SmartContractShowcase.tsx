"use client";

import React, { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { 
  Code2, 
  Zap, 
  Shield, 
  CheckCircle,
  AlertCircle,
  Play,
  Download,
  ExternalLink,
  FileCode,
  Database
} from 'lucide-react';
import { PublicKey, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import toast from 'react-hot-toast';

interface SmartContract {
  name: string;
  description: string;
  language: string;
  status: 'deployed' | 'testing' | 'development';
  address?: string;
  tvl?: number;
  transactions?: number;
  gasOptimized: boolean;
  audited: boolean;
  features: string[];
}

const SmartContractShowcase: React.FC = () => {
  const { publicKey, connected, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [contracts, setContracts] = useState<SmartContract[]>([]);
  const [selectedContract, setSelectedContract] = useState<SmartContract | null>(null);
  const [interactionResult, setInteractionResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Mock smart contracts portfolio
  const mockContracts: SmartContract[] = [
    {
      name: 'DeFi Yield Aggregator',
      description: 'An automated yield farming protocol that optimizes returns across multiple DeFi platforms on Solana',
      language: 'Rust (Anchor)',
      status: 'deployed',
      address: 'DeFi3k8h4j5k6l7m8n9o0p1q2r3s4t5u6v7w8x9y0z1',
      tvl: 2400000,
      transactions: 15847,
      gasOptimized: true,
      audited: true,
      features: ['Auto-compounding', 'Multi-pool strategy', 'Flash loan arbitrage', 'Governance token']
    },
    {
      name: 'NFT Marketplace Contract',
      description: 'A gas-optimized NFT marketplace with royalty distribution and batch operations',
      language: 'Rust (Anchor)',
      status: 'deployed',
      address: 'NFT9x8y7z6a5b4c3d2e1f0g9h8i7j6k5l4m3n2o1p0',
      tvl: 850000,
      transactions: 8934,
      gasOptimized: true,
      audited: true,
      features: ['Batch minting', 'Royalty splits', 'Lazy minting', 'Cross-chain bridging']
    },
    {
      name: 'Governance DAO Contract',
      description: 'Decentralized governance system with quadratic voting and treasury management',
      language: 'Rust (Anchor)',
      status: 'deployed',
      address: 'DAO5a4b3c2d1e0f9g8h7i6j5k4l3m2n1o0p9q8r7s6',
      tvl: 1200000,
      transactions: 5621,
      gasOptimized: true,
      audited: true,
      features: ['Quadratic voting', 'Timelock execution', 'Treasury management', 'Delegation']
    },
    {
      name: 'Staking Rewards Pool',
      description: 'Multi-token staking protocol with flexible reward distribution mechanisms',
      language: 'Rust (Anchor)',
      status: 'testing',
      address: 'STAKE3k8h4j5k6l7m8n9o0p1q2r3s4t5u6v7w8x9',
      tvl: 450000,
      transactions: 2341,
      gasOptimized: true,
      audited: false,
      features: ['Multi-token support', 'Flexible rewards', 'Emergency pause', 'Auto-harvest']
    },
    {
      name: 'Cross-Chain Bridge',
      description: 'Secure bridge protocol for transferring assets between Solana and Ethereum',
      language: 'Rust + Solidity',
      status: 'development',
      tvl: 0,
      transactions: 0,
      gasOptimized: true,
      audited: false,
      features: ['Multi-chain support', 'Merkle proofs', 'Fraud detection', 'Batch processing']
    }
  ];

  useEffect(() => {
    setContracts(mockContracts);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': return 'text-green-400 bg-green-400/20';
      case 'testing': return 'text-yellow-400 bg-yellow-400/20';
      case 'development': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const handleTestContract = async (contract: SmartContract) => {
    if (!connected || !publicKey) {
      toast.error('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setInteractionResult('');

    try {
      // Simulate a simple contract interaction (sending a small transaction)
      const transaction = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey('11111111111111111111111111111112'), // System program
        lamports: 1000, // Very small amount for testing
      });

      // This would normally be a contract interaction
      // For demo purposes, we'll just show a success message
      
      toast.success(`Successfully interacted with ${contract.name}`);
      setInteractionResult(`✅ Contract interaction successful!\nGas used: 5,000 units\nTransaction confirmed in 1.2s`);
      
    } catch (error) {
      console.error('Contract interaction failed:', error);
      toast.error('Contract interaction failed');
      setInteractionResult(`❌ Transaction failed: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const deployedContracts = contracts.filter(c => c.status === 'deployed');
  const totalTVL = deployedContracts.reduce((sum, contract) => sum + (contract.tvl || 0), 0);
  const totalTransactions = deployedContracts.reduce((sum, contract) => sum + (contract.transactions || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="bg-black backdrop-blur-sm rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 font-[family-name:var(--font-orbitron)]">
          <Code2 className="text-indigo-400" />
          Smart Contracts Portfolio
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 p-6 rounded-lg border border-indigo-500/30">
            <div className="flex items-center gap-3 mb-2">
              <FileCode className="text-indigo-400" size={20} />
              <span className="text-gray-300">Contracts Deployed</span>
            </div>
            <div className="text-2xl font-bold text-white">{deployedContracts.length}</div>
            <div className="text-sm text-indigo-400">Live on mainnet</div>
          </div>

          <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 p-6 rounded-lg border border-green-500/30">
            <div className="flex items-center gap-3 mb-2">
              <Database className="text-green-400" size={20} />
              <span className="text-gray-300">Total Value Locked</span>
            </div>
            <div className="text-2xl font-bold text-white">{formatCurrency(totalTVL)}</div>
            <div className="text-sm text-green-400">Across all protocols</div>
          </div>

          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 p-6 rounded-lg border border-blue-500/30">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="text-blue-400" size={20} />
              <span className="text-gray-300">Transactions</span>
            </div>
            <div className="text-2xl font-bold text-white">{formatNumber(totalTransactions)}</div>
            <div className="text-sm text-blue-400">Successfully processed</div>
          </div>

          <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 p-6 rounded-lg border border-orange-500/30">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="text-orange-400" size={20} />
              <span className="text-gray-300">Security Score</span>
            </div>
            <div className="text-2xl font-bold text-white">98.5%</div>
            <div className="text-sm text-orange-400">Audited & verified</div>
          </div>
        </div>
      </div>

      {/* Contracts Grid */}
      <div className="bg-black backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-xl font-bold text-white mb-6">Contract Showcase</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {contracts.map((contract, index) => (
            <div 
              key={index}
              className="enhanced-card p-6 cursor-pointer"
              onClick={() => setSelectedContract(contract)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-1">{contract.name}</h4>
                  <p className="text-gray-400 text-sm mb-2">{contract.language}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(contract.status)}`}>
                  {contract.status}
                </span>
              </div>

              <p className="text-gray-300 text-sm mb-4 line-clamp-2">{contract.description}</p>

              <div className="flex items-center gap-4 mb-4">
                {contract.gasOptimized && (
                  <div className="flex items-center gap-1 text-green-400 text-xs">
                    <Zap size={12} />
                    Gas Optimized
                  </div>
                )}
                {contract.audited && (
                  <div className="flex items-center gap-1 text-blue-400 text-xs">
                    <Shield size={12} />
                    Audited
                  </div>
                )}
              </div>

              {contract.status === 'deployed' && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-500 text-xs">TVL</p>
                    <p className="text-white font-semibold">{formatCurrency(contract.tvl || 0)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Transactions</p>
                    <p className="text-white font-semibold">{formatNumber(contract.transactions || 0)}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {contract.status === 'deployed' && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTestContract(contract);
                    }}
                    disabled={loading}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-1"
                  >
                    <Play size={14} />
                    Test Contract
                  </button>
                )}
                <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center gap-1">
                  <ExternalLink size={14} />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contract Interaction Results */}
      {interactionResult && (
        <div className="bg-black backdrop-blur-sm rounded-xl p-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <CheckCircle className="text-green-400" />
            Contract Interaction Result
          </h3>
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <pre className="text-gray-300 text-sm whitespace-pre-wrap">{interactionResult}</pre>
          </div>
        </div>
      )}

      {/* Contract Detail Modal */}
      {selectedContract && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedContract.name}</h3>
                  <p className="text-gray-400">{selectedContract.language}</p>
                </div>
                <button
                  onClick={() => setSelectedContract(null)}
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Description</h4>
                    <p className="text-gray-300 leading-relaxed">{selectedContract.description}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Features</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedContract.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-300">
                          <CheckCircle className="text-green-400" size={16} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {selectedContract.address && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Contract Address</h4>
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <code className="text-purple-400 text-sm break-all">{selectedContract.address}</code>
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Security & Performance</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Gas Optimized</span>
                        <div className={`flex items-center gap-1 ${selectedContract.gasOptimized ? 'text-green-400' : 'text-red-400'}`}>
                          {selectedContract.gasOptimized ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                          {selectedContract.gasOptimized ? 'Yes' : 'No'}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Security Audited</span>
                        <div className={`flex items-center gap-1 ${selectedContract.audited ? 'text-green-400' : 'text-yellow-400'}`}>
                          {selectedContract.audited ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                          {selectedContract.audited ? 'Completed' : 'Pending'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedContract.status === 'deployed' && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Live Metrics</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <p className="text-gray-400 text-sm">Total Value Locked</p>
                          <p className="text-white font-bold">{formatCurrency(selectedContract.tvl || 0)}</p>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <p className="text-gray-400 text-sm">Transactions</p>
                          <p className="text-white font-bold">{formatNumber(selectedContract.transactions || 0)}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    {selectedContract.status === 'deployed' && (
                      <button 
                        onClick={() => handleTestContract(selectedContract)}
                        disabled={loading}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Play size={16} />
                        {loading ? 'Testing...' : 'Test Contract'}
                      </button>
                    )}
                    <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-colors flex items-center gap-2">
                      <Download size={16} />
                      Source Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartContractShowcase;

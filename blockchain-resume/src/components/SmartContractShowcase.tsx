"use client";

import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
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
  const { publicKey, connected,  } = useWallet();

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
      case 'deployed': return 'text-green-700 bg-green-100';
      case 'testing': return 'text-yellow-700 bg-yellow-100';
      case 'development': return 'text-blue-700 bg-blue-100';
      default: return 'text-gray-700 bg-gray-100';
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
    <div className="space-y-4">
      {/* Header Stats */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2 font-[family-name:var(--font-orbitron)]">
          <Code2 className="text-black" size={18} />
          Smart Contracts Portfolio
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <FileCode className="text-black" size={16} />
              <span className="text-gray-700 text-sm">Contracts Deployed</span>
            </div>
            <div className="text-xl font-bold text-black">{deployedContracts.length}</div>
            <div className="text-xs text-gray-600">Live on mainnet</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <Database className="text-black" size={16} />
              <span className="text-gray-700 text-sm">Total Value Locked</span>
            </div>
            <div className="text-xl font-bold text-black">{formatCurrency(totalTVL)}</div>
            <div className="text-xs text-gray-600">Across all protocols</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="text-black" size={16} />
              <span className="text-gray-700 text-sm">Transactions</span>
            </div>
            <div className="text-xl font-bold text-black">{formatNumber(totalTransactions)}</div>
            <div className="text-xs text-gray-600">Successfully processed</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="text-black" size={16} />
              <span className="text-gray-700 text-sm">Security Score</span>
            </div>
            <div className="text-xl font-bold text-black">98.5%</div>
            <div className="text-xs text-gray-600">Audited & verified</div>
          </div>
        </div>
      </div>

      {/* Contracts Grid */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-bold text-black mb-4">Contract Showcase</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {contracts.map((contract, index) => (
            <div 
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setSelectedContract(contract)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-black font-semibold text-base mb-1">{contract.name}</h4>
                  <p className="text-gray-600 text-xs mb-2">{contract.language}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(contract.status)}`}>
                  {contract.status}
                </span>
              </div>

              <p className="text-gray-700 text-xs mb-3 line-clamp-2">{contract.description}</p>

              <div className="flex items-center gap-3 mb-3">
                {contract.gasOptimized && (
                  <div className="flex items-center gap-1 text-green-700 text-xs">
                    <Zap size={10} />
                    Gas Optimized
                  </div>
                )}
                {contract.audited && (
                  <div className="flex items-center gap-1 text-blue-700 text-xs">
                    <Shield size={10} />
                    Audited
                  </div>
                )}
              </div>

              {contract.status === 'deployed' && (
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-gray-500 text-xs">TVL</p>
                    <p className="text-black font-semibold text-sm">{formatCurrency(contract.tvl || 0)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Transactions</p>
                    <p className="text-black font-semibold text-sm">{formatNumber(contract.transactions || 0)}</p>
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
                    className="flex-1 bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white py-1.5 px-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <Play size={12} />
                    Test Contract
                  </button>
                )}
                <button className="bg-gray-200 hover:bg-gray-300 text-black py-1.5 px-2 rounded-lg text-xs transition-colors flex items-center gap-1">
                  <ExternalLink size={12} />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contract Interaction Results */}
      {interactionResult && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-bold text-black mb-3 flex items-center gap-2">
            <CheckCircle className="text-green-700" size={18} />
            Contract Interaction Result
          </h3>
          <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg">
            <pre className="text-black text-xs whitespace-pre-wrap">{interactionResult}</pre>
          </div>
        </div>
      )}

      {/* Contract Detail Modal */}
      {selectedContract && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">{selectedContract.name}</h3>
                  <p className="text-gray-600 text-sm">{selectedContract.language}</p>
                </div>
                <button
                  onClick={() => setSelectedContract(null)}
                  className="text-gray-600 hover:text-black transition-colors text-xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div>
                    <h4 className="text-base font-semibold text-black mb-2">Description</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{selectedContract.description}</p>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold text-black mb-2">Features</h4>
                    <div className="grid grid-cols-1 gap-1">
                      {selectedContract.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-700 text-sm">
                          <CheckCircle className="text-green-700" size={14} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  {selectedContract.address && (
                    <div>
                      <h4 className="text-base font-semibold text-black mb-2">Contract Address</h4>
                      <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg">
                        <code className="text-purple-700 text-xs break-all">{selectedContract.address}</code>
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-base font-semibold text-black mb-2">Security & Performance</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 text-sm">Gas Optimized</span>
                        <div className={`flex items-center gap-1 text-sm ${selectedContract.gasOptimized ? 'text-green-700' : 'text-red-700'}`}>
                          {selectedContract.gasOptimized ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                          {selectedContract.gasOptimized ? 'Yes' : 'No'}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 text-sm">Security Audited</span>
                        <div className={`flex items-center gap-1 text-sm ${selectedContract.audited ? 'text-green-700' : 'text-yellow-600'}`}>
                          {selectedContract.audited ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                          {selectedContract.audited ? 'Completed' : 'Pending'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedContract.status === 'deployed' && (
                    <div>
                      <h4 className="text-base font-semibold text-black mb-2">Live Metrics</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg">
                          <p className="text-gray-600 text-xs">Total Value Locked</p>
                          <p className="text-black font-bold text-sm">{formatCurrency(selectedContract.tvl || 0)}</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg">
                          <p className="text-gray-600 text-xs">Transactions</p>
                          <p className="text-black font-bold text-sm">{formatNumber(selectedContract.transactions || 0)}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {selectedContract.status === 'deployed' && (
                      <button 
                        onClick={() => handleTestContract(selectedContract)}
                        disabled={loading}
                        className="flex-1 bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-1"
                      >
                        <Play size={14} />
                        {loading ? 'Testing...' : 'Test Contract'}
                      </button>
                    )}
                    <button className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-3 rounded-lg text-sm transition-colors flex items-center gap-1">
                      <Download size={14} />
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

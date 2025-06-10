"use client";

import React from 'react';
import { 
  TrendingUp, 
  Shield, 
  Zap, 
  Award,
  DollarSign,
  Code,
  Users,
  Star,
  Target,
  Rocket
} from 'lucide-react';

const ImpactSummary: React.FC = () => {
  const impactMetrics = [
    {
      icon: DollarSign,
      label: "Total Value Secured",
      value: "$4.9M+",
      description: "Across all deployed smart contracts",
      color: "text-green-400",
      bgColor: "from-green-600/20 to-emerald-600/20",
      borderColor: "border-green-500/30"
    },
    {
      icon: Shield,
      label: "Security Score",
      value: "98.5%",
      description: "Average across all audited contracts",
      color: "text-blue-400",
      bgColor: "from-blue-600/20 to-indigo-600/20",
      borderColor: "border-blue-500/30"
    },
    {
      icon: Zap,
      label: "Gas Optimization",
      value: "94.5%",
      description: "Average gas savings implemented",
      color: "text-yellow-400",
      bgColor: "from-yellow-600/20 to-orange-600/20",
      borderColor: "border-yellow-500/30"
    },
    {
      icon: Code,
      label: "Smart Contracts",
      value: "23+",
      description: "Successfully deployed and verified",
      color: "text-purple-400",
      bgColor: "from-purple-600/20 to-indigo-600/20",
      borderColor: "border-purple-500/30"
    },
    {
      icon: Users,
      label: "Active Users",
      value: "12.5K+",
      description: "Interacting with deployed dApps",
      color: "text-cyan-400",
      bgColor: "from-cyan-600/20 to-blue-600/20",
      borderColor: "border-cyan-500/30"
    },
    {
      icon: TrendingUp,
      label: "Transaction Volume",
      value: "32K+",
      description: "Processed successfully",
      color: "text-pink-400",
      bgColor: "from-pink-600/20 to-rose-600/20",
      borderColor: "border-pink-500/30"
    }
  ];

  const achievements = [
    "🏆 Top 1% Solana Developer (DeFiLlama)",
    "🔐 Zero security incidents across all deployments", 
    "⚡ Industry-leading gas optimization techniques",
    "🌐 Multi-chain deployment expertise",
    "📈 $4.9M+ Total Value Locked secured",
    "🛡️ 100% audit pass rate on security reviews"
  ];

  const technologies = [
    { name: "Solana/Rust", expertise: 95 },
    { name: "Ethereum/Solidity", expertise: 90 },
    { name: "Web3.js/Ethers", expertise: 92 },
    { name: "React/Next.js", expertise: 88 },
    { name: "Node.js/Express", expertise: 85 },
    { name: "DeFi Protocols", expertise: 93 }
  ];

  return (
    <div className="space-y-6">
      {/* Impact Metrics */}
      <div className="bg-black backdrop-blur-sm rounded-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-orbitron)]">
            <span className="holographic-text">Blockchain Impact Summary</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Delivering secure, scalable, and innovative blockchain solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {impactMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div 
                key={index}
                className={`bg-gradient-to-r ${metric.bgColor} p-6 rounded-xl border ${metric.borderColor} enhanced-card floating`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-lg bg-gray-800/50 ${metric.color}`}>
                    <IconComponent size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{metric.label}</h3>
                    <p className="text-gray-400 text-sm">{metric.description}</p>
                  </div>
                </div>
                <div className={`text-3xl font-bold ${metric.color}`}>
                  {metric.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Achievements */}
      <div className="bg-black backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Award className="text-yellow-400" />
          Key Achievements
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300 glow-on-hover"
            >
              <div className="text-2xl">{achievement.split(' ')[0]}</div>
              <span className="text-gray-200">{achievement.substring(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Expertise */}
      <div className="bg-black backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Target className="text-green-400" />
          Technology Expertise
        </h3>
        
        <div className="space-y-4">
          {technologies.map((tech, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">{tech.name}</span>
                <span className="text-green-400 font-semibold">{tech.expertise}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${tech.expertise}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-8 border border-purple-500/30">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Rocket className="text-purple-400" />
            Ready to Build the Future
          </h3>
          <p className="text-gray-300 text-lg mb-6">
            Let's collaborate on your next blockchain project. From DeFi protocols to NFT marketplaces, 
            I bring proven expertise in secure, scalable smart contract development.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 glow-on-hover">
              Start a Project
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
              View Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactSummary;

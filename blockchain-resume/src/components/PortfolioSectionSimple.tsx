"use client";

import React from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const PortfolioSectionSimple: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();

  return (
    <div className="bg-black backdrop-blur-sm rounded-xl p-8 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6">
        Solana Wallet Portfolio (Simple)
      </h2>
      
      <div className="mb-6">
        <WalletMultiButton />
      </div>
      
      {connected ? (
        <div className="text-green-400">
          <p>Wallet Connected!</p>
          <p className="text-sm text-gray-400">
            {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-8)}
          </p>
        </div>
      ) : (
        <p className="text-gray-400">Connect your wallet to view portfolio</p>
      )}
    </div>
  );
};

export default PortfolioSectionSimple;

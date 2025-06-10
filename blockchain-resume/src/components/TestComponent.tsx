"use client";

import React from 'react';

// First test: Just import the hooks
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Second test: Import the UI component
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const TestComponent: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl text-white">Test Component</h2>
      <p className="text-gray-300">This is a test to isolate the import issue.</p>
    </div>
  );
};

export default TestComponent;

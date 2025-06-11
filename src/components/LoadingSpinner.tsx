"use client";

import React from 'react';
import { Wallet, Zap, Code, TrendingUp } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Loading...", 
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const icons = [Wallet, Zap, Code, TrendingUp];

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative mb-4">
        {/* Rotating icons */}
        <div className="absolute inset-0 animate-spin">
          <div className={`${sizeClasses[size]} blockchain-spinner`}></div>
        </div>
        
        {/* Floating icons around the spinner */}
        <div className="relative">
          {icons.map((Icon, index) => (
            <div
              key={index}
              className={`absolute animate-pulse text-purple-400`}
              style={{
                top: `${Math.sin((index * Math.PI) / 2) * 30 - 10}px`,
                left: `${Math.cos((index * Math.PI) / 2) * 30 - 10}px`,
                animationDelay: `${index * 0.2}s`
              }}
            >
              <Icon size={16} />
            </div>
          ))}
        </div>
      </div>
      
      <p className="text-gray-300 text-sm animate-pulse">{message}</p>
      
      {/* Progress dots */}
      <div className="flex space-x-1 mt-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;

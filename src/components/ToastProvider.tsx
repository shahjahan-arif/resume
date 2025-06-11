"use client";

import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastProvider: React.FC = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1F2937',
          color: '#FFFFFF',
          border: '1px solid #374151',
          borderRadius: '12px',
          fontSize: '14px',
          maxWidth: '400px',
        },
        success: {
          iconTheme: {
            primary: '#10B981',
            secondary: '#FFFFFF',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: '#FFFFFF',
          },
        },
        loading: {
          iconTheme: {
            primary: '#3B82F6',
            secondary: '#FFFFFF',
          },
        },
      }}
    />
  );
};

export default ToastProvider;

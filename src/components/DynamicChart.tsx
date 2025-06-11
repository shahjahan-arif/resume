"use client";

import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

// Loading skeleton component
const ChartSkeleton = () => (
  <div className="h-64 bg-gray-800/50 rounded-lg p-4 flex items-center justify-center animate-pulse">
    <div className="text-center">
      <Activity className="mx-auto text-purple-400 mb-2" size={48} />
      <p className="text-gray-400">Loading chart...</p>
    </div>
  </div>
);

interface ChartData {
  name?: string;
  [key: string]: string | number | undefined;
}

interface DynamicLineChartProps {
  data: ChartData[];
  dataKey: string;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
}

export const DynamicLineChart: React.FC<DynamicLineChartProps> = ({ 
  data, 
  dataKey, 
  stroke = "#8b5cf6", 
  strokeWidth = 2,
  className = "h-64"
}) => {
  const [isMounted, setIsMounted] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Recharts, setRecharts] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
    import('recharts').then((recharts) => {
      setRecharts(recharts);
    }).catch(() => {
      // Fallback if recharts fails to load
      setRecharts(null);
    });
  }, []);

  if (!isMounted || !Recharts) {
    return <ChartSkeleton />;
  }

  const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = Recharts;

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="name" 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <YAxis 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F9FAFB'
            }}
          />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={stroke} 
            strokeWidth={strokeWidth}
            dot={{ fill: stroke, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: stroke }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

interface DynamicBarChartProps {
  data: ChartData[];
  dataKey: string;
  fill?: string;
  className?: string;
}

export const DynamicBarChart: React.FC<DynamicBarChartProps> = ({ 
  data, 
  dataKey, 
  fill = "#8b5cf6",
  className = "h-64"
}) => {
  const [isMounted, setIsMounted] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Recharts, setRecharts] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
    import('recharts').then((recharts) => {
      setRecharts(recharts);
    }).catch(() => {
      setRecharts(null);
    });
  }, []);

  if (!isMounted || !Recharts) {
    return <ChartSkeleton />;
  }

  const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = Recharts;

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="name" 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <YAxis 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F9FAFB'
            }}
          />
          <Bar dataKey={dataKey} fill={fill} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

interface DynamicAreaChartProps {
  data: ChartData[];
  dataKey: string;
  stroke?: string;
  fill?: string;
  className?: string;
}

export const DynamicAreaChart: React.FC<DynamicAreaChartProps> = ({ 
  data, 
  dataKey, 
  stroke = "#8b5cf6",
  fill = "url(#colorGradient)",
  className = "h-64"
}) => {
  const [isMounted, setIsMounted] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Recharts, setRecharts] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
    import('recharts').then((recharts) => {
      setRecharts(recharts);
    }).catch(() => {
      setRecharts(null);
    });
  }, []);

  if (!isMounted || !Recharts) {
    return <ChartSkeleton />;
  }

  const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = Recharts;

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={stroke} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={stroke} stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="name" 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <YAxis 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F9FAFB'
            }}
          />
          <Area 
            type="monotone" 
            dataKey={dataKey} 
            stroke={stroke} 
            fill={fill}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const DynamicChartComponents = {
  DynamicLineChart,
  DynamicBarChart,
  DynamicAreaChart
};

export default DynamicChartComponents;

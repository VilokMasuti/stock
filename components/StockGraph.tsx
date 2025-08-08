/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Badge } from './ui/badge';

export interface PriceDataGraphItem {
  open: number;
  high: number;
  low: number;
  close: number;
  date: string;
  volume: number;
  symbol: string;
}

type PriceDataGraph = PriceDataGraphItem[];

interface StockGraphProps {
  priceDataGraph: PriceDataGraph;
  symbol: string;
}

const StockGraph = ({ priceDataGraph, symbol }: StockGraphProps) => {
  const chartData = React.useMemo(() => {
    if (!priceDataGraph || priceDataGraph.length === 0) {
      return [];
    }

    const formatted = priceDataGraph
      .map((item) => {
        const price = Number(item.close);

        const originalDate = item.date;
        const parsableDate = originalDate.split('T')[0];
        const dateObj = new Date(parsableDate);
        const label = dateObj.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        const timestamp = dateObj.getTime();

        return { date: label, timestamp, price };
      })
      .filter((d) => Number.isFinite(d.price) && Number.isFinite(d.timestamp))
      .sort((a, b) => a.timestamp - b.timestamp);

    // No need to clear the timer here; it's handled by the effect's nature.
    return formatted;
  }, [priceDataGraph]);

  const { minPrice, maxPrice } = React.useMemo(() => {
    if (chartData.length === 0) return { minPrice: 0, maxPrice: 0 };
    const prices = chartData.map((d) => d.price);
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };
  }, [chartData]);

  // --- RENDER LOGIC ---

  if (chartData.length === 0) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center rounded-lg border-2 border-dashed border-muted">
        <p className="text-muted-foreground">
          No price data available for {symbol}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              strokeOpacity={0.5}
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
              minTickGap={60} // Increase gap to prevent label collision
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `₹${Number(value).toFixed(0)}`}
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(200, 200, 200, 0.5)',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value) => [`₹${Number(value).toFixed(2)}`, 'Price']}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Area
              dataKey="price"
              type="monotone"
              stroke="#2563eb"
              strokeWidth={2}
              fill="url(#colorPrice)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="font-medium">Symbol:</span>
          <Badge variant="secondary">{symbol}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Data Points:</span>
          <Badge variant="outline" className="font-mono">
            {chartData.length}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Price Range:</span>
          <Badge variant="destructive" className="font-mono">
            ₹{minPrice.toFixed(2)} - ₹{maxPrice.toFixed(2)}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default StockGraph;

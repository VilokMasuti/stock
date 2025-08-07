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
import { Skeleton } from '../components/ui/skeleton';


export interface PriceDataGraphItem {
  open: number;
  high: number;
  low: number;
  close: number;
  date: any;
  volume: number;
  symbol: string;
}

type PriceDataGraph = PriceDataGraphItem[];



const StockGraph = ({
  priceDataGraph,
  symbol,
}: {
  priceDataGraph: PriceDataGraph;
  symbol: string;
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [chartData, setChartData] = React.useState<
    { date: any; timestamp: number; price: number }[]
  >([]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (priceDataGraph && priceDataGraph.length > 0) {
        const formatted = priceDataGraph
          .map((item) => {
            const price = Number(item.close);
            const label = item.date?.split(' ')[1] || item.date;
            const timestamp = new Date(item.date).getTime();
            return { date: label, timestamp, price };
          })
          .filter(
            (d) => Number.isFinite(d.price) && Number.isFinite(d.timestamp)
          )
          .sort((a, b) => a.timestamp - b.timestamp);

        console.log(
          `[StockGraph] Final formatted chartData for ${symbol}:`,
          formatted
        );
        setChartData(formatted);
      } else {
        setChartData([]);
      }
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [priceDataGraph, symbol]);

  if (isLoading) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  if (chartData.length === 0) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center rounded-lg border border-dashed">
        <p className="text-muted-foreground">
          No price data available for {symbol}
        </p>
      </div>
    );
  }

  const minPrice = Math.min(...chartData.map((d) => d.price));
  const maxPrice = Math.max(...chartData.map((d) => d.price));

  console.log(
    `[StockGraph] RENDER: chartData points=${chartData.length}, min=${minPrice}, max=${maxPrice}`
  );

  return (
    <div className="w-full">
      <div style={{ width: '100%', height: '400px', overflow: 'visible' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `₹${value.toFixed(0)}`}
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            <Tooltip
              formatter={(value) => [`₹${Number(value).toFixed(2)}`, 'Price']}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Area
              dataKey="price"
              type="monotone"
              stroke="#2563eb"
              strokeWidth={2}
              fill="#93c5fd"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        Showing {chartData.length} points for {symbol} — Range: ₹
        {minPrice.toFixed(2)} - ₹{maxPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default StockGraph;

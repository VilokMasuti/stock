'use client';
import dynamic from 'next/dynamic';
import { Skeleton } from './ui/skeleton';

const StockGraph = dynamic(
  () => import('../components/StockGraph').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-[420px]">
        <Skeleton className="h-[400px] w-full" />
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Loading chart...
        </div>
      </div>
    ),
  }
);

export const StockGraphClient = StockGraph;

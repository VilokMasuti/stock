'use client';
import dynamic from 'next/dynamic';
const StockGraph = dynamic(
  () => import('../components/StockGraph').then((mod) => mod.default),
  {
    ssr: false,
  }
);

export const StockGraphClient = StockGraph;

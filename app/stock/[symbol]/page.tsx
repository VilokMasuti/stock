import Link from 'next/link';

import { PackageOpen, TrendingDown, TrendingUp } from 'lucide-react';

import { StockGraphClient } from '../../../components/StockGraphClient';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { getStockPrices, searchStocks } from '../../../lib/api'; // Adjust path if needed
import StockPageHeader from '../StockPageHeader';

// Metadata generation (fixed params)
export async function generateMetadata({
  params,
}: {
  params: { symbol: string };
}) {
  const symbol = (params.symbol || '').toUpperCase();
  const results = await searchStocks(symbol, 1);
  const stockInfo = results.find((s) => s.symbol === symbol);
  const title = stockInfo ? `${stockInfo.name} (${symbol})` : symbol;
  return {
    title: `${title} | Stock Ticker`,
    description: `View real-time stock price data, charts, and analysis for ${symbol}.`,
    keywords: `${symbol}, stock price, stock chart, financial data, investment`,
  };
}

export default async function StockPage({
  params,
}: {
  params: { symbol: string };
}) {
  const symbol = (params?.symbol || '').toUpperCase();

  const [searchResults, rawPriceData] = await Promise.all([
    searchStocks(symbol, 1),
    getStockPrices(symbol),
  ]);

  const stockInfo = searchResults.find((s) => s.symbol === symbol);

  if (!stockInfo) {
    return (
      <main className="container grid place-content-center min-h-screen text-center py-8">
        <div>
          <PackageOpen className="mx-auto h-16 w-16 text-muted-foreground" />
          <h1 className="mt-4 text-2xl font-bold">Stock Not Found: {symbol}</h1>
          <p className="text-muted-foreground mt-2 mb-6">
            The stock you&apos;re looking for doesn&apos;t exist Sorry
          </p>
          <Button asChild>
            <Link href="/">← Back to Search</Link>
          </Button>
        </div>
      </main>
    );
  }

  // Safely sort the price data
  const priceData = Array.isArray(rawPriceData)
    ? rawPriceData
        .slice()
        .sort(
          (a, b) =>
            new Date(a.date.replace(' ', 'T')).getTime() -
            new Date(b.date.replace(' ', 'T')).getTime()
        )
    : [];

  const currentPrice = priceData.length
    ? priceData[priceData.length - 1]
    : null;
  const openPrice = priceData.length ? priceData[0] : null;

  const priceChange =
    openPrice && currentPrice
      ? (currentPrice.close - openPrice.close).toFixed(2)
      : '0.00';


  const percentChange =
    openPrice && currentPrice
      ? (
          ((currentPrice.close - openPrice.close) / openPrice.close) *
          100
        ).toFixed(2)
      : '0.00';


  const changeType = parseFloat(priceChange) >= 0 ? 'up' : 'down';

  return (
    <main className="flex-1 bg-background">
      <div className="container py-8 md:py-12">
        <StockPageHeader stockInfo={stockInfo} symbol={symbol} />

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Current Price</CardDescription>
              <CardTitle
                className={`text-3xl ${
                  changeType === 'up' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                ₹{currentPrice?.close?.toFixed(2) ?? 'N/A'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-sm font-medium flex items-center ${
                  changeType === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {changeType === 'up' ? (
                  <TrendingUp className="mr-2 h-4 w-4" />
                ) : (
                  <TrendingDown className="mr-2 h-4 w-4" />
                )}
                <span>
                  ₹{priceChange} ({percentChange}%) Today
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Day High</CardDescription>
              <CardTitle className="text-2xl">
                ₹{currentPrice?.high?.toFixed(2) ?? 'N/A'}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Day Low</CardDescription>
              <CardTitle className="text-2xl">
                ₹{currentPrice?.low?.toFixed(2) ?? 'N/A'}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Volume</CardDescription>
              <CardTitle className="text-2xl">
                {currentPrice?.volume?.toLocaleString() ?? 'N/A'}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Chart Section */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle> Price Chart</CardTitle>
            <CardDescription>
              Visualizing today&apos;s price movements for {symbol}.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-6">
            <StockGraphClient
              priceDataGraph={priceData.map((item) => ({ ...item, symbol }))}
              symbol={symbol}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

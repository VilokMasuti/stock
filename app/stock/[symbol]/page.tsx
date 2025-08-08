import Link from 'next/link';

import { PackageOpen, TrendingDown, TrendingUp } from 'lucide-react';

import StockGraph from '../../../components/StockGraph';
import { Badge } from '../../../components/ui/badge';
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

// Metadata generation -seo
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

  // sort the price data
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
    <main className="flex-1 bg-background  shadow-lg  bg-slate-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <StockPageHeader stockInfo={stockInfo} symbol={symbol} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <Badge variant="secondary" className="w-fit bg-black text-white ">
                Current Price
              </Badge>

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
              <Badge variant="secondary" className="w-fit bg-green-500">
                {' '}
                Day High
              </Badge>
              <CardTitle className="text-2xl">
                ₹{currentPrice?.high?.toFixed(2) ?? 'N/A'}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Badge variant="destructive" className="w-fit ">
                {' '}
                Day Low
              </Badge>
              <CardTitle className="text-2xl">
                ₹{currentPrice?.low?.toFixed(2) ?? 'N/A'}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Badge
                variant="secondary"
                className="w-fit bg-blue-500 text-white "
              >
                {' '}
                Volume
              </Badge>

              <CardTitle className="text-2xl">
                {currentPrice?.volume?.toLocaleString() ?? 'N/A'}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Price Chart</CardTitle>
            <CardDescription>
              Visualizing today&apos;s price movements for {symbol}.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-6">
            <StockGraph
              priceDataGraph={priceData.map((item) => ({ ...item, symbol }))}
              symbol={symbol}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

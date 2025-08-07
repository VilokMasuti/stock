import { Toaster } from 'sonner';
import FavoriteStocks from '../components/FavoriteStock';
import StockSearch from '../components/StockSearch';

export default function Home() {
  return (
    <main className="flex-1 min-h-screen bg-background">
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto flex w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl flex-col items-center text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-snug">
            Stock Ticker
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-prose">
            Search for any stock by symbol or company name.
          </p>
          <div className="mt-8 sm:mt-10 w-full sm:max-w-md lg:max-w-lg space-y-4">
            <StockSearch />
          </div>
        </div>
        <div className="mx-auto mt-16 w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
          <FavoriteStocks />
        </div>
        <Toaster position="bottom-right" />
      </div>
    </main>
  );
}

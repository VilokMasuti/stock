import { Toaster } from 'sonner';
import FavoriteStocks from '../components/FavoriteStock';
import StockSearch from '../components/StockSearch';

export default async function Home() {
  return (
    <main className="flex-1  bg-zinc-100  relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16 sm:py-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-gray-950 antialiased">
            The Stock Ticker
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Search for any stock by symbol or company name..!
          </p>
          <div className="mt-8 mx-auto w-full max-w-lg ">
            <StockSearch />
          </div>
        </div>

        <div className="mx-auto  w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl   shadow-lg  rounded-t-[10rem] rounded-b-[10rem]  rounded-r-[10rem]   rounded-l-[10rem] shadow-zinc-950">
          <FavoriteStocks />
        </div>
        <Toaster position="bottom-right" />
      </div>
      <Toaster position="bottom-right" />
    </main>
  );
}

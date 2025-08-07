/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Search, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { searchStocks } from '../lib/api';
import { Input } from './ui/input';
import { Skeleton } from './ui/skeleton';

const StockSearch = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!query) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError(null);

      const searchResults = await searchStocks(query);
      if (!searchResults || searchResults.length === 0) {
        setError('No results found');
      }
      setResults(searchResults || []);
      setShowDropdown(true);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (symbol: string) => {
    setShowDropdown(false);
    setQuery('');
    router.push(`/stock/${symbol}`);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for a stock..."
          className="w-full h-12 pl-10 text-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setShowDropdown(true)}
          aria-autocomplete="list"
          aria-controls="stock-results"
        />
      </div>

      {showDropdown && (
        <div
          id="stock-results"
          role="listbox"
          className="
            absolute z-10 w-full mt-1
            bg-white border border-gray-200 rounded-md shadow-lg
            max-h-60 overflow-y-auto
            dark:bg-gray-800 dark:border-gray-700
            transition-colors
          "
        >
          {loading && (
            <div className="p-4 space-y-2">
              <Skeleton className="h-8 w-full rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <Skeleton className="h-8 w-full rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <Skeleton className="h-8 w-full rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse" />
            </div>
          )}

          {error && !loading && (
            <p className="p-4 text-center text-sm text-gray-600 dark:text-gray-400">
              {error}
            </p>
          )}

          {!loading && results.length > 0 && (
            <ul className="py-1">
              {results.map((stock) => (
                <li
                  key={stock.symbol}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSelect(stock.symbol);
                  }}
                  className="
                    flex items-center px-4 py-2 cursor-pointer
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    focus:bg-gray-100 dark:focus:bg-gray-700
                    text-gray-900 dark:text-white
                    transition-colors
                  "
                  onClick={() => handleSelect(stock.symbol)}
                >
                  <TrendingUp className="mr-3 h-4 w-4 text-muted-foreground" />
                  <div className="flex-grow">
                    <p className="font-semibold">{stock.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {stock.symbol}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {!loading && results.length === 0 && query.trim() && !error && (
            <p className="p-4 text-center text-sm text-gray-600 dark:text-gray-400">
              No results found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default StockSearch;

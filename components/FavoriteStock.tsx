'use client';

import { Star, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Skeleton } from './ui/skeleton';

export default function FavoriteStocks() {
  const [favoriteSymbols, setFavoriteSymbols] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem('favoriteStocks') || '[]'
    );
    setFavoriteSymbols(storedFavorites);
    setLoading(false);
  }, []);

  const removeFavorite = (symbolToRemove: string) => {
    const updatedFavorites = favoriteSymbols.filter(
      (symbol) => symbol !== symbolToRemove
    );
    localStorage.setItem('favoriteStocks', JSON.stringify(updatedFavorites));
    setFavoriteSymbols(updatedFavorites);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Favorite Stocks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Favorite Stocks</CardTitle>
        <CardDescription>Your saved stocks for quick access.</CardDescription>
      </CardHeader>
      <CardContent>
        {favoriteSymbols.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 p-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Star className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold">No Favorites Yet</h3>
            <p className="text-muted-foreground">
              Add stocks to your favorites to see them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {favoriteSymbols.map((symbol) => (
              <Card key={symbol} className="flex flex-col justify-between p-4">
                <div className="flex items-start justify-between">
                  <Link href={`/stock/${symbol}`} className="hover:underline">
                    <p className="text-lg font-bold">{symbol}</p>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFavorite(symbol)}
                    className="-mt-2 -mr-2 h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">View Details →</p>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

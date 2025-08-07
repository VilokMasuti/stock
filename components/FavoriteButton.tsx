'use client';

import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

interface FavoriteButtonProps {
  symbol: string;
}

export default function FavoriteButton({ symbol }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // On mount, read the current favorite status
  useEffect(() => {
    const saved: string[] = JSON.parse(
      localStorage.getItem('favoriteStocks') || '[]'
    );
    setIsFavorite(saved.includes(symbol));
  }, [symbol]);

  const toggleFavorite = () => {

    const current = JSON.parse(
      localStorage.getItem('favoriteStocks') || '[]'
    );
    let updated

    if (isFavorite) {
      // Removing
      updated = current.filter((s:string) => s !== symbol);
      localStorage.setItem('favoriteStocks', JSON.stringify(updated));

      toast.error(`Removed ${symbol} from favorites.`, {
        icon: '🗑️',
      });
    } else {
      // Adding
      updated = [...current, symbol];
      localStorage.setItem('favoriteStocks', JSON.stringify(updated));

      toast.success(`Added ${symbol} to favorites.`, {
        icon: '⭐',
      });
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <Button
      onClick={toggleFavorite}
      aria-pressed={isFavorite}
      variant={isFavorite ? 'ghost' : 'outline'}
      size="icon"
      className={`
        transition-colors duration-200
        ${isFavorite
          ? 'text-amber-500 hover:text-amber-600'
          : 'text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400'}
      `}
    >
      <Star
        className={`
          h-5 w-5
          ${isFavorite ? 'fill-amber-400 text-amber-500' : 'stroke-current'}
        `}
      />
    </Button>
  );
}

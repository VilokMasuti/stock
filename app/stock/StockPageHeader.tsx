import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';
import FavoriteButton from '../../components/FavoriteButton';
import { Button } from '../../components/ui/button';

interface StockPageHeaderProps {
  stockInfo?: {
    name: string;
  };
  symbol: string;
}

const StockPageHeader = ({ stockInfo, symbol }: StockPageHeaderProps) => {
  return (
    <div className="mb-8 p-6 bg-card border rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            {stockInfo?.name || symbol}
          </h1>
          <p  className="text-xl text-muted-foreground  md:pl-[1rem]">
            {symbol}
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <FavoriteButton symbol={symbol} />
          <Button asChild variant="ghost">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeftCircle className="h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default StockPageHeader;

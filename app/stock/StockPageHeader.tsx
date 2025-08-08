import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';
import FavoriteButton from '../../components/FavoriteButton';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';

interface StockPageHeaderProps {
  stockInfo?: {
    name: string;
  };
  symbol: string;
}

const StockPageHeader = ({ stockInfo, symbol }: StockPageHeaderProps) => {
  return (
    <div className="mb-8 p-6 border rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white  sm:text-3xl  sm:leading-snug  antialiased  font-sans tracking-tight">
            {stockInfo?.name || symbol}
          </h1>
          <Badge className="mt-2  ">{symbol}</Badge>
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

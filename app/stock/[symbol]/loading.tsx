// app/stock/[symbol]/loading.tsx

import { Skeleton } from '../../../components/ui/skeleton'; //

export default function StockPageLoading() {
  return (
    <main className="flex-1 bg-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Skeleton for the Header */}
        <div className="mb-8">
          <Skeleton className="h-10 w-3/4 rounded-lg" />
          <Skeleton className="mt-2 h-8 w-24 rounded-lg" />
        </div>

        {/* Skeleton for the Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Skeleton className="h-[120px] w-full rounded-xl" />
          <Skeleton className="h-[120px] w-full rounded-xl" />
          <Skeleton className="h-[120px] w-full rounded-xl" />
          <Skeleton className="h-[120px] w-full rounded-xl" />
        </div>

        {/* Skeleton for the Chart Section */}
        <Skeleton className="h-[500px] w-full rounded-xl" />
      </div>
    </main>
  );
}

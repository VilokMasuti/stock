A simple stock ticker app built with Next.js It lets you search for stocks, view a details page and see a basic price chart. You can also save favorite stocks in your browser.

What I Built--->
Search stocks with autocomplete
Stock details page using a dynamic route (/stock/[symbol])
Basic line chart for price history (Recharts)
SEO meta tags on the details page
Favorites (save/remove) using localStorage
Loading skeletons while data is fetching
Responsive UI with Tailwind CSS


Tech Used--->
Next.js 15
TypeScript
Tailwind CSS + Shadcn-Ui
Recharts (for the chart)
LocalStorage (favorites)



Project Structure --->
app/page.tsx — Home page (search + favorites)
app/stock/[symbol]/page.tsx — Stock details page
app/stock/[symbol]/loading.tsx — Loading UI for details page
components/StockSearch.tsx — Search with autocomplete
components/StockGraph.tsx — Price chart
components/FavoriteStock.tsx — List of saved stocks
components/ui/* — Small UI pieces (Badge, Skeleton, etc.)
lib/api.ts — API calls and simple fallbacks


APIs  -->
Search: GET /api/assignment/search?TCS - example
Prices: [GET /api/assignment/stock/](https://portal.tradebrains.in/api/assignment/stock/TCS/prices?days=1&format=json&limit=100&type=INTRADAY) -example
Movers: Was returning 404


Setup-->
Install
npm install
Run Dev
npm run dev
Open http://localhost:3000


Usage--->
Search for a stock by symbol or company name
Click a result to open the details page
See current price, day high/low, volume, and the chart
Click “Add to Favorites” to save it
Go back to home to see your favorites list



Data Flow--->

User → Home → type → Search API → select → /stock/[symbol]
Server page → fetch stock info + prices → render UI
Chart → uses provided price array → format date/time → draw line

Loading UX-->
Next.js loading.tsx shows skeletons while data loads
Stock details

Favorites-->
Save/remove symbols in localStorage.
ome shows your saved stocks


That’s it Thanks for reviewing && Thanks for your Time.

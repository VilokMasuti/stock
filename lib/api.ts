const API_BASE_URL = 'https://portal.tradebrains.in/api/assignment';

// fallback data in case api  is falid

const FALLBACK_SEARCH = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
];

const FALLBACK_PRICE = [
  {
    open: 150,
    close: 154.75,
    high: 155.5,
    low: 149.25,
    date: '2024-01-01T09:30:00Z',
    volume: 100000,
  },
  {
    open: 154.75,
    close: 157.8,
    high: 158.2,
    low: 153.1,
    date: '2024-01-01T10:30:00Z',
    volume: 95000,
  },
];

// searches for stocks aPI CALL

export async function searchStocks(keyword: string, length = 10) {
  const url = `${API_BASE_URL}/search?keyword=${encodeURIComponent(
    keyword
  )}&length=${length}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error('Invalid response:', res);
      return FALLBACK_SEARCH; // return falback data  error.
    }
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      console.warn('No data found, returning fallback:', data);
      return FALLBACK_SEARCH;
    }
    // if all ok it mease succses

    return data
      .filter((item) => item.symbol) // filter out reslts without  symbol
      .map((item) => ({
        symbol: item.symbol,
        name: item.company || 'Unknown Company',
      }));
  } catch (error) {
    console.error('Fetch failed:', error);
    return FALLBACK_SEARCH; // return falback on failure.
  }
}

// get stock price

export async function getStockPrices(symbol: string) {
  // Don't  fetch if no symbol is provided.
  if (!symbol) {
    return [];
  }
  const url = `${API_BASE_URL}/stock/${symbol}/prices?days=1&type=INTRADAY&limit=100`;
  console.log(`getStockPrices Fetching: ${url}`);
  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error('Invalid response:', res);
      return FALLBACK_PRICE;
    }
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      console.log('No data foud, returnng fallback:', data);
      return FALLBACK_PRICE;
    }
    return data.map((item) => ({
      open: Number(item.open),
      high: Number(item.high),
      low: Number(item.low),
      close: Number(item.close),
      date: item.date,
      volume: item.volume ? Number(item.volume) : 0,
    }));
  } catch (error) {
    console.error('Fetch failed:', error);
    return FALLBACK_PRICE;
  }
}

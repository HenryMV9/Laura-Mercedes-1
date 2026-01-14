const CURRENCIES = {
  NGN: { symbol: '₦', name: 'Nigerian Naira', countries: ['NG', 'Nigeria'] },
  USD: { symbol: '$', name: 'US Dollar', countries: ['US', 'United States'] },
  GBP: { symbol: '£', name: 'British Pound', countries: ['GB', 'UK', 'United Kingdom'] },
  EUR: { symbol: '€', name: 'Euro', countries: ['FR', 'ES', 'DE', 'IT', 'France', 'Spain', 'Germany', 'Italy'] }
};

const STORAGE_KEY = 'preferred_currency';
const RATES_CACHE_KEY = 'exchange_rates_cache';
const CACHE_DURATION = 3600000;

let exchangeRates = null;
let currentCurrency = 'NGN';

export async function initializeCurrency() {
  const savedCurrency = localStorage.getItem(STORAGE_KEY);

  if (savedCurrency && CURRENCIES[savedCurrency]) {
    currentCurrency = savedCurrency;
  } else {
    const detectedCurrency = await detectCurrencyFromLocation();
    currentCurrency = detectedCurrency;
    localStorage.setItem(STORAGE_KEY, currentCurrency);
  }

  await fetchExchangeRates();

  return currentCurrency;
}

export async function detectCurrencyFromLocation() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    const countryCode = data.country_code;

    for (const [currency, info] of Object.entries(CURRENCIES)) {
      if (info.countries.includes(countryCode)) {
        return currency;
      }
    }
  } catch (error) {
    console.warn('Failed to detect location:', error);
  }

  return 'NGN';
}

export async function fetchExchangeRates() {
  const cached = localStorage.getItem(RATES_CACHE_KEY);

  if (cached) {
    try {
      const { rates, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        exchangeRates = rates;
        return rates;
      }
    } catch (error) {
      console.warn('Failed to parse cached rates:', error);
    }
  }

  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const apiUrl = `${supabaseUrl}/functions/v1/get-exchange-rates`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.success && data.rates) {
      exchangeRates = data.rates;

      localStorage.setItem(RATES_CACHE_KEY, JSON.stringify({
        rates: exchangeRates,
        timestamp: Date.now()
      }));

      return exchangeRates;
    }
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
  }

  exchangeRates = {
    NGN: 1,
    USD: 0.0012,
    GBP: 0.00095,
    EUR: 0.0011
  };

  return exchangeRates;
}

export function convertPrice(priceInNGN, targetCurrency) {
  if (!exchangeRates) {
    return priceInNGN;
  }

  const rate = exchangeRates[targetCurrency] || 1;
  return priceInNGN * rate;
}

export function formatCurrency(priceInNGN, currency = currentCurrency) {
  const convertedPrice = convertPrice(priceInNGN, currency);
  const currencyInfo = CURRENCIES[currency];

  if (!currencyInfo) {
    return `₦${priceInNGN.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  let formattedNumber;

  switch (currency) {
    case 'NGN':
      formattedNumber = convertedPrice.toLocaleString('en-NG', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      break;
    case 'USD':
      formattedNumber = convertedPrice.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      break;
    case 'GBP':
      formattedNumber = convertedPrice.toLocaleString('en-GB', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      break;
    case 'EUR':
      formattedNumber = convertedPrice.toLocaleString('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      break;
    default:
      formattedNumber = convertedPrice.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
  }

  return `${currencyInfo.symbol}${formattedNumber}`;
}

export function setCurrentCurrency(currency) {
  if (CURRENCIES[currency]) {
    currentCurrency = currency;
    localStorage.setItem(STORAGE_KEY, currency);
    return true;
  }
  return false;
}

export function getCurrentCurrency() {
  return currentCurrency;
}

export function getCurrencies() {
  return CURRENCIES;
}

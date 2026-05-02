let currentCurrency = 'NGN';

export async function initializeCurrency() {
  const saved = localStorage.getItem('selectedCurrency');
  if (saved) {
    currentCurrency = saved;
  }
}

export function formatCurrency(amount) {
  const num = parseFloat(amount);
  if (currentCurrency === 'USD') {
    return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `₦${num.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function setCurrency(currency) {
  currentCurrency = currency;
  localStorage.setItem('selectedCurrency', currency);
}

export function getCurrency() {
  return currentCurrency;
}

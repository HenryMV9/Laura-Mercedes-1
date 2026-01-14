import { getCurrencies, getCurrentCurrency, setCurrentCurrency } from './currency.js';

export function createCurrencySelector(onCurrencyChange) {
  const currencies = getCurrencies();
  const currentCurrency = getCurrentCurrency();

  const wrapper = document.createElement('div');
  wrapper.className = 'currency-selector-wrapper';

  const label = document.createElement('span');
  label.className = 'currency-label';
  label.textContent = 'Currency:';

  const select = document.createElement('select');
  select.className = 'currency-select';
  select.setAttribute('aria-label', 'Select currency');

  const currencyOptions = [
    { code: 'NGN', label: 'Nigeria (NGN)' },
    { code: 'USD', label: 'United States (USD)' },
    { code: 'GBP', label: 'United Kingdom (GBP)' },
    { code: 'EUR', label: 'France (EUR)' },
    { code: 'EUR', label: 'Spain (EUR)', value: 'EUR' },
    { code: 'EUR', label: 'Germany (EUR)', value: 'EUR' },
    { code: 'EUR', label: 'Italy (EUR)', value: 'EUR' }
  ];

  const addedCurrencies = new Set();

  currencyOptions.forEach(({ code, label, value }) => {
    const optionValue = value || code;
    const optionKey = `${optionValue}-${label}`;

    if (!addedCurrencies.has(optionKey)) {
      const option = document.createElement('option');
      option.value = optionValue;
      option.textContent = label;

      if (optionValue === currentCurrency) {
        option.selected = true;
      }

      select.appendChild(option);
      addedCurrencies.add(optionKey);
    }
  });

  select.addEventListener('change', (e) => {
    const newCurrency = e.target.value;
    if (setCurrentCurrency(newCurrency)) {
      if (onCurrencyChange) {
        onCurrencyChange(newCurrency);
      }
    }
  });

  wrapper.appendChild(label);
  wrapper.appendChild(select);

  return wrapper;
}

export function updateCurrencySelector(selector, currency) {
  const select = selector.querySelector('.currency-select');
  if (select) {
    select.value = currency;
  }
}

import { setCurrency, getCurrency } from './currency.js';

export function createCurrencySelector(onChangeCallback) {
  const selector = document.createElement('select');
  selector.className = 'currency-select';
  selector.innerHTML = `
    <option value="NGN">NGN (₦)</option>
    <option value="USD">USD ($)</option>
  `;

  selector.value = getCurrency();

  selector.addEventListener('change', (e) => {
    setCurrency(e.target.value);
    onChangeCallback(e.target.value);
  });

  return selector;
}

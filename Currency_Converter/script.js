const amount = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const showResult = document.querySelector('.show-result');
const exchangeIcon = document.querySelector('.icon-wrapper');
const btn = document.querySelector('.btn');
let conversionRate;
// setting default value for amount
amount.value = 1;

fetchURL();

function fetchURL(baseCurrency = 'USD') {
    // let baseCurrency = 'USD'; // setting initial base currency
    let url = `https://v6.exchangerate-api.com/v6/0d312d6cf9f267f06b3dad5e/latest/${baseCurrency}`;
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then((data) => {
            // conversionRate = data.conversion_rates;
            // setupCurrencySelectors();
            // generateRate();
            conversionRate = data.conversion_rates;
            setupCurrencySelectors();
            generateRate();
            setupEventListeners();


        }).catch(error => {
            showResult.textContent = 'Failed to fetch exchange rates. Please try again later.';
        });

}

function setupCurrencySelectors() {
    // 🔁 Save currently selected values
    const currentFrom = fromCurrency.value || 'USD';
    const currentTo = toCurrency.value || 'INR';

    // 🔄 Clear existing options (so you don't duplicate)
    fromCurrency.innerHTML = '';
    toCurrency.innerHTML = '';

    // 🔁 Rebuild options with selected values preserved
    for (const currency_code in conversionRate) {
        // For fromCurrency
        const fromSelected = currency_code === currentFrom ? 'selected' : '';
        const fromOption = `<option value="${currency_code}" ${fromSelected}>${currency_code}</option>`;
        fromCurrency.insertAdjacentHTML('beforeend', fromOption);

        // For toCurrency
        const toSelected = currency_code === currentTo ? 'selected' : '';
        const toOption = `<option value="${currency_code}" ${toSelected}>${currency_code}</option>`;
        toCurrency.insertAdjacentHTML('beforeend', toOption);
    }
}

// ✅ Wrap listener setup in a closure (runs only once)
let listenersBound = false;
function setupEventListeners() {
    if (listenersBound) return; // ✅ prevent rebinding
    listenersBound = true;

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        generateRate();
    });

    fromCurrency.addEventListener('change', () => {
        fetchURL(fromCurrency.value);
    });

    // toCurrency.addEventListener('change', () => {
    //     // generateRate();
    // });

}

function generateRate() {
    if (!conversionRate) return;
    if (isNaN(amount.value) || amount.value <= 0) {
        showResult.textContent = 'Please enter a valid amount.';
        return;
    }
    
    let result = (amount.value * conversionRate[toCurrency.value]).toFixed(2);
    showResult.textContent = `${amount.value} ${fromCurrency.value} = ${result} ${toCurrency.value}`;
 
}



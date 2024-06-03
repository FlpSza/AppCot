const currencyToCountryCode = {
    USD: 'US', // Dólar Americano
    EUR: 'EU', // Euro
    GBP: 'GB', // Libra Esterlina
    JPY: 'JP', // Iene Japonês
    AUD: 'AU', // Dólar Australiano
    CAD: 'CA', // Dólar Canadense
    CHF: 'CH', // Franco Suíço
    CNY: 'CN', // Renminbi Chinês (Yuan)
    NZD: 'NZ', // Dólar Neozelandês
    BRL: 'BR'  // Real Brasileiro
};

// Função para atualizar a cotação da moeda na interface do usuário
function updateCurrencyValue(currencyValue) {
    const currencyValueElement = document.getElementById('currency-value');
    currencyValueElement.textContent = currencyValue.toFixed(2); // Formata com duas casas decimais
}

// Função para atualizar a bandeira do país na interface do usuário
function updateCountryFlag(currencyCode) {
    const countryCode = currencyToCountryCode[currencyCode];
    if (countryCode) {
        const countryFlagElement = document.getElementById('country-flag');
        countryFlagElement.src = `https://flagsapi.com/${countryCode}/flat/32.png`;
    } else {
        console.error('Código de país não encontrado para a moeda:', currencyCode);
    }
}

// Função para buscar a cotação da moeda a partir de uma API
async function fetchCurrencyValue(targetCurrency) {
    const apiKey = '7e0c451e2bcb4b64ba9e9d46eab0c789';
    const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.rates) {
            const brlRate = data.rates.BRL;
            const targetRate = data.rates[targetCurrency];
            const conversionRate = brlRate / targetRate;
            updateCurrencyValue(conversionRate);
        } else {
            console.error('Erro ao buscar a cotação:', data);
        }
    } catch (error) {
        console.error('Erro na requisição à API:', error);
    }
}

// Atualiza a cotação da moeda ao selecionar um país
document.getElementById('country-select').addEventListener('change', (event) => {
    const targetCurrency = event.target.value;
    fetchCurrencyValue(targetCurrency);
    updateCountryFlag(targetCurrency);
});

// Atualiza a cotação da moeda ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const defaultCurrency = document.getElementById('country-select').value;
    fetchCurrencyValue(defaultCurrency);
    updateCountryFlag(defaultCurrency);
});

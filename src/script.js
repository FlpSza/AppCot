// Função para atualizar a cotação da moeda na interface do usuário
function updateCurrencyValue(currencyValue) {
    const currencyValueElement = document.getElementById('currency-value');
    currencyValueElement.textContent = currencyValue;
}

// Função para atualizar a bandeira do país na interface do usuário
function updateCountryFlag(countryCode) {
    const countryFlagElement = document.getElementById('country-flag');
    countryFlagElement.src = `https://www.countryflags.io/${countryCode}/flat/64.png`;
}

// Chamada de função de exemplo
updateCurrencyValue(5.75); // Altere para a cotação da moeda em relação ao real
updateCountryFlag('US'); // Altere para o código do país

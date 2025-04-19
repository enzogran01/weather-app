// Elementos no HTML
const cityName = document.getElementById("cityName");
const weather = document.getElementById("weather");
const temperature = document.getElementById("temp");
const weatherIcon = document.getElementById("weatherIcon");
const errorDiv = document.getElementById("error");
const searchButton = document.getElementById("searchButton");
const tempUnit = document.getElementById("tempUnit");

// Função pra mostrar o clima
function mostrarClima(dados, state, country) {
    const nomeCidade = dados.name;
    const temp = dados.main.temp;
    const descricao = dados.weather[0].description;
    const icone = dados.weather[0].icon;
    const urlIcone = `https://openweathermap.org/img/wn/${icone}@2x.png`;

    const localFormatado = `${nomeCidade}, ${state} | ${country}`;

    cityName.innerHTML = `${localFormatado}`;
    weather.innerHTML = `Clima: ${descricao}`;
    temperature.innerHTML = formatTemp(temp, tempUnit.value);
    weatherIcon.setAttribute('src', urlIcone);
}

// Função de formatar a temperatura baseado na unidade
function formatTemp (temp, unit) {
    if (unit === 'metric') {
        return `${temp}°C`;
    } else if (unit === 'imperial') {
        return `${temp}°F`;
    } else {
        return `${temp}K`;
    }
}

// Função para procurar coordenadas baseado na cidade (GEOCODING API)
async function searchCoord() {
    const city = document.getElementById("city").value;
    const apiKey = 'e4c99e72d5a371d2d0a1acaa06a0aa15';
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        if (resposta.ok) {
            const lat = dados[0].lat;
            const lon = dados[0].lon;
            const state = dados[0].state;
            const country = dados[0].country;

            searchWeather(lat, lon, state, country);
        } else {
            console.log(`Erro: ${dados.message}`);
        }

    } catch (erro) {
        console.error(erro);
    }
}

// Função para procurar dados de clima baseado nas coordenadas (OPENWEATHER API)
async function searchWeather (lat, lon, state, country) {
    const apiKey = 'e4c99e72d5a371d2d0a1acaa06a0aa15';
    const selectedUnit = tempUnit.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&appid=${apiKey}&lang=pt_br&units=${selectedUnit}`;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
    
        if (resposta.ok) {
            mostrarClima(dados, state, country);
        } else {
            console.log(`Erro: ${dados.message}`);
        }
    } catch (erro) {
        console.error(erro);
    }
}

searchButton.addEventListener("click", () => {
    searchCoord();
})

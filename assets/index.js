// Elementos no HTML
const cityName = document.getElementById("cityName");
const weather = document.getElementById("weather");
const temperature = document.getElementById("temp");
const weatherIcon = document.getElementById("weatherIcon");
const errorDiv = document.getElementById("error");
const searchButton = document.getElementById("searchButton");
const tempUnit = document.getElementById("tempUnit");
const moreInfo = document.querySelector(".more-info");
const infoToggleButton = document.getElementById("infoToggleButton");

// Elementos informações adicionais
const feelsLike = document.getElementById("feelsLike");
const pressure = document.getElementById("pressure");
const windSpeed = document.getElementById("windSpeed");
const humidity = document.getElementById("humidity");
const seaLevel = document.getElementById("seaLevel");
const cloundiness = document.getElementById("cloundiness");
const precipitation = document.getElementById("precipitation");

// Função pra exibir mais informações
function infoToggle() {
    infoToggleButton.innerHTML === "Mostrar mais" ? moreInfo.style.animation = "fadeInFromRight 1s forwards" : moreInfo.style.animation = "fadeOutToRight 1s forwards";
    infoToggleButton.innerHTML === "Mostrar mais" ? infoToggleButton.innerHTML = "Mostrar menos"  : infoToggleButton.innerHTML = "Mostrar mais";
}

// Função pra mostrar o clima
function mostrarClima(dados, state, country) {
    const nomeCidade = dados.name;
    const descricao = dados.weather[0].description;
    const temp = dados.main.temp;
    const icone = dados.weather[0].icon;
    const urlIcone = `https://openweathermap.org/img/wn/${icone}@2x.png`;

    const sensacaoTermica = dados.main.feels_like;
    const pressao = dados.main.pressure;
    const rajada = dados.wind.speed;
    const umidade = dados.main.humidity;
    const nivelDoMar = dados.main.sea_level;
    const nebulosidade = dados.clouds.all;
    const precipitacao = dados.rain;

    cityName.innerHTML = `${nomeCidade}, ${state} | ${country}`;
    weather.innerHTML = `Clima: ${descricao}`;
    temperature.innerHTML = formatTemp(temp, tempUnit.value);
    weatherIcon.setAttribute('src', urlIcone);

    feelsLike.innerHTML = `Sensação térmica: ${formatTemp(sensacaoTermica, tempUnit.value)}`;
    pressure.innerHTML = `Pressão atmosférica: ${pressao} mb`;
    windSpeed.innerHTML = `Rajadas de vento: ${rajada} m/s`;
    humidity.innerHTML = `Umidade: ${umidade}%`;
    seaLevel.innerHTML = `Nível do mar: ${nivelDoMar} mb`;
    cloundiness.innerHTML = `Nebulosidade: ${nebulosidade}%`;
    precipitation.innerHTML = precipitacao ? `Precipitação: ${precipitacao} mm/h` : `Precipitação: Não disponível.`;
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
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

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

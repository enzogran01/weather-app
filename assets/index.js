const cityName = document.getElementById("cityName");
const weather = document.getElementById("weather");
const temperature = document.getElementById("temp");
const weatherIcon = document.getElementById("weatherIcon");



function mostrarClima(dados) {
    console.log(dados);
    const nomeCidade = dados.name;
    const temp = dados.main.temp;
    const descricao = dados.weather[0].description;
    const icone = dados.weather[0].icon;
    const urlIcone = `https://openweathermap.org/img/wn/${icone}@2x.png`;

    cityName.innerHTML = `${nomeCidade}`;
    weather.innerHTML = `${descricao}`;
    temperature.innerHTML = `${temp}°C`;
    weatherIcon.innerHTML = `${urlIcone}`;
}

async function searchWeather () {
    const city = document.getElementById("city").value;
    const apiKey = 'e4c99e72d5a371d2d0a1acaa06a0aa15';
    const url = `https://api.openweathermap.org/data/2.5/weather?&lat=-23.9618&lon=-46.3322&appid=${apiKey}&lang=pt_br&units=metric`;

    const errorDiv = document.getElementById("error");

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
    
        if (resposta.ok) {
          mostrarClima(dados);
        } else {
            setTimeout(() => {
                errorDiv.classList.remove('error');
                errorDiv.innerHTML = `Erro: ${dados.message}`;
                errorDiv.classList.add('hidden');
              }, 2000);
        }
    } catch (erro) {
        setTimeout(() => {
            errorDiv.classList.remove('error');
            errorDiv.innerHTML = 'Erro na requisição.';
            console.error(erro);
            errorDiv.classList.add('hidden');
          }, 2000);
    }
}

searchWeather();

const apiKey = 'fdf8166eb9b1eeb4d066a265cf25fe79';
const $currentBtn = $('#submit');
const cityInput = $('.city-entry');
function getWeather(city) {
    const firstURL = `https://api.openweathermap.org/data/2.5/weather?q=${city.val()}&appid=${apiKey}&units=imperial`;//Input gets the city
    return $.get(firstURL);
}

function outputCurrentWeather(currentData) {
    return currentData.coord;
}//coordinates of the city are gotten

function getForecastReport(locationData) { //because the forecast needs the lat an lon. City name can't be put in directly
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${locationData.lat}&lon=${locationData.lon}&appid=${apiKey}&units=imperial`;

    return $.get(forecastURL);
    
}



function outputWeatherForecast(data) {

    const $forcastOutput = $('.weather');
    const filtered = data.list.filter(function(weatherObj){
        if(weatherObj.dt_txt.includes('12:00')) return true;//needs to be 12:00 because if it happens to be the 12th, will output all times
    });
    $forcastOutput.empty();
    filtered.forEach(function (weatherObj) {
        $forcastOutput.append(`
            <div>
                <h2>${weatherObj.dt_txt}</h2>
                <h3>Temp: ${weatherObj.main.temp}&deg;</h2>
                <h3>Wind: ${weatherObj.wind.speed} mph</h2>
                <h3>Humidity: ${weatherObj.main.humidity}%</h2>
                <img src="https://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png" alt="Weather logo">
            <div>
            `)
    })
    //Setting weather to local Storage, and then setting it to the side
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    const cityBox = document.querySelector('.city-box');
    if (!cities.include(city.val())){//no repeat function
        cities.push(cityInput.val());
        const jsonArray = JSON.stringify(cities);
        localStorage.setItem('cities', jsonArray);
        outputSearchHistory();
    }
    function outputSearchHistory() {
        for (const city of cities) {
            cityBox.insertAdjacentHTML('beforeend',`
                    <button>${city}</button>
                `);
        }
    }
}

$currentBtn.on('click', function(event){
    event.preventDefault();
    getWeather(cityInput)
        .then(outputCurrentWeather)
        .then(getForecastReport)
        .then(outputWeatherForecast);
})

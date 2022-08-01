import './style.css';

/*-----UI VARIABLE DECLARATIONS-----*/

const locationSearchDiv = document.getElementById('location-search-content');
const locationSearchForm = document.querySelector('[data-search-form]');
const locationSearchFormInput = document.getElementById('search');
const locationSearchFormBtn = document.getElementById('search-button');
const errorMsg = document.getElementById('error');
const resultScreenDiv = document.getElementById('result-screen');
const returnBtn = document. getElementById('return-button');
const temperatureResult = document.getElementById('result-temp');
const placeResult = document.getElementById('result-place');
const convertUnitsBtn = document.getElementById('convert-units-btn');
const weatherResult = document.getElementById('result-weather');
const weatherDescResult = document.getElementById('result-weather-desc');
const feelingResult = document.getElementById('result-feeling');
const humidityResult = document.getElementById('result-humidity');
//const changeOfRainResult = document.getElementById('result-chance-of-rain');
const windSpeedResult = document.getElementById('result-wind-speed');
const openDetailsBtn = document.getElementById('open-details-btn');
const cityName = document.querySelector('[data-city-name]');
const overlayWindow = document.getElementById('overlay-window');
const weatherDetailsModal = document.getElementById('city-forecast-info-modal');
const weatherDetailsModalDesc = document.querySelector('[data-city-card-detail]');
const weatherDetailsModalMinTemp = document.querySelector('[data-city-card-min-temp]');
const weatherDetailsModalMaxTemp = document.querySelector('[data-city-card-max-temp]');
const weatherDetailsModalVisibility = document.querySelector('[data-city-card-visibility]');
//const weatherDetailsModalCloudiness = document.querySelector('[data-city-card-cloudiness]');
const weatherDetailsModalSunRise = document.querySelector('[data-city-card-sun-rise]');
const weatherDetailsModalSunSet = document.querySelector('[data-city-card-sun-set]');
const weatherDetailsModalPressure = document.querySelector('[data-city-card-pressure]');
/*
const weeklyForecastDay1 = document.querySelector('[data-city-forecast-day1]');
const weeklyForecastDay2 = document.querySelector('[data-city-forecast-day2]');
const weeklyForecastDay3 = document.querySelector('[data-city-forecast-day3]');
const weeklyForecastDay4 = document.querySelector('[data-city-forecast-day4]');
const weeklyForecastDay5 = document.querySelector('[data-city-forecast-day5]');
const weeklyForecastDay6 = document.querySelector('[data-city-forecast-day6]');
const weeklyForecastDay7 = document.querySelector('[data-city-forecast-day7]');
const weeklyForecastValue1 = document.querySelector('[data-city-forecast-value1]');
const weeklyForecastValue2 = document.querySelector('[data-city-forecast-value2]');
const weeklyForecastValue3 = document.querySelector('[data-city-forecast-value3]');
const weeklyForecastValue4 = document.querySelector('[data-city-forecast-value4]');
const weeklyForecastValue5 = document.querySelector('[data-city-forecast-value5]');
const weeklyForecastValue6 = document.querySelector('[data-city-forecast-value6]');
const weeklyForecastValue7 = document.querySelector('[data-city-forecast-value7]');
*/

function openResultScreen() {
    locationSearchDiv.classList.add('passive');
    resultScreenDiv.classList.add('active');
}

function closeResultScreen() {
    locationSearchDiv.classList.remove('passive');
    resultScreenDiv.classList.remove('active');
}

function toggleTemperatureUnits(data) {
    convertUnitsBtn.textContent = convertUnitsBtn.textContent === 'C°' ? 'F°' : 'C°';
    temperatureResult.textContent = temperatureResult.textContent === `${data.temperature} °C` ? `(${data.temperature} * 1.8 + 32) °F` : `${data.temperature} °C`;
    feelingResult.textContent = feelingResult.textContent === `${data.feelsLike} °C` ? `(${data.feelsLike} * 1.8 + 32) °F` : `${data.feelsLike} °C`;
    weatherDetailsModalMinTemp.textContent = weatherDetailsModalMinTemp.textContent === `${data.minTemperature} °C` ? `(${data.minTemperature} * 1.8 + 32) °F` : `${data.minTemperature} °C`;
    weatherDetailsModalMaxTemp.textContent = weatherDetailsModalMaxTemp.textContent === `${data.maxTemperature} °C` ? `(${data.maxTemperature} * 1.8 + 32) °F` : `${data.maxTemperature} °C`;
}

function openWeatherDetailsModal() {
    overlayWindow.classList.add('active');
    weatherDetailsModal.classList.add('active');
    setWeatherDetails();
}

function closeWeatherDetailsModal() {
    overlayWindow.classList.remove('active');
    weatherDetailsModal.classList.remove('active');
}

function handleKeyboardInput(e) { //Enables users to close modals by Escape key
    if (e.key === 'Escape') 
    closeWeatherDetailsModal()
}

function createWeatherDataObject(data) {
    const {
      name: cityName,
      sys: { country, sunrise, sunset },
      main: { temp: temperature, temp_max: maxTemperature, temp_min: minTemperature, feels_like: feelsLike, humidity, pressure },
      visibility: visibility,
      wind: { speed: windSpeed },
    } = data;
    const description = data["weather"][0]["description"];
    const iconSrc = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.weather[0]["icon"]}.svg`;
    return { cityName, country, sunrise, sunset, temperature, maxTemperature, minTemperature, feelsLike, humidity, pressure, visibility, windSpeed, description, iconSrc};
}

async function getWeatherData(city) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=bbea7694c66d062ebb3f9152bd60caee`, { mode: "cors" });
      const data = await response.json()
      console.log(data);
      createWeatherDataObject(data);
      openResultScreen();
      setSearchResults(data);
      setWeatherDetails(data);
    } catch {
        addErrorMessage();
    }
    locationSearchForm.reset();
}

function setSearchResults(data) {
    if (!data) return;

    cityName.textContent = `${data.cityName}`;
    temperatureResult.textContent = `${data.temperature} °C`;
    placeResult.textContent = `${data.cityName}, ${data.country}`;
    weatherResult.src = `${data.iconSrc}`;
    weatherDescResult.textContent = `${data.description}`;
    feelingResult.textContent = `${data.feelsLike} °C`;
    humidityResult.textContent = `${data.humidity} %`;
    windSpeedResult.textContent = `${data.windSpeed} km/h`;
}

function setWeatherDetails(data) {
    if (!data) return;

    weatherDetailsModalDesc.textContent = `${data.description}`;
    weatherDetailsModalMinTemp.textContent = `${data.minTemperature} °C`;
    weatherDetailsModalMaxTemp.textContent = `${data.maxTemperature} °C`;
    weatherDetailsModalVisibility.textContent = `${data.visibility}`;
    weatherDetailsModalSunRise.textContent = `${data.sunrise}`;
    weatherDetailsModalSunSet.textContent = `${data.sunset}`;
    weatherDetailsModalPressure.textContent = `${data.pressure}`;
}

function addErrorMessage() {
    errorMsg.classList.add('active');
}

function removeErrorMessage() {
    errorMsg.classList.remove('active');
}

locationSearchForm.addEventListener('submit', (e) => { //allowing to search city by using both enter key or Go button
    e.preventDefault(); //preventing unwanted entries
});

locationSearchFormBtn.addEventListener('click', async () => {
    if (locationSearchFormInput.value === '') return;
    await getWeatherData(locationSearchFormInput.value);
});

returnBtn.addEventListener('click', closeResultScreen);

convertUnitsBtn.addEventListener('click', toggleTemperatureUnits);

openDetailsBtn.addEventListener('click', openWeatherDetailsModal);

overlayWindow.addEventListener('click', closeWeatherDetailsModal);

document.addEventListener('keydown', handleKeyboardInput) //onload event listener for escape key

locationSearchFormInput.addEventListener('click', removeErrorMessage);
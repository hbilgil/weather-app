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
const minTempResult = document.getElementById('result-min-temp');
const maxTempResult = document.getElementById('result-max-temp');
const degreeMetrics = document.querySelectorAll('[data-degree-metric]');
const windSpeedResult = document.getElementById('result-wind-speed');
const openDetailsBtn = document.getElementById('open-details-btn');
const cityName = document.querySelector('[data-city-name]');
const overlayWindow = document.getElementById('overlay-window');
const weatherDetailsModal = document.getElementById('city-forecast-info-modal');
const weatherDetailsModalDesc = document.querySelector('[data-city-card-detail]');
const weatherDetailsModalHumidity = document.querySelector('[data-city-card-humidity]');
const weatherDetailsModalPressure = document.querySelector('[data-city-card-pressure]');
const weatherDetailsModalVisibility = document.querySelector('[data-city-card-visibility]');
const weatherDetailsModalSunRise = document.querySelector('[data-city-card-sun-rise]');
const weatherDetailsModalSunSet = document.querySelector('[data-city-card-sun-set]');

/*-----FUNCTION DECLARATIONS-----*/

function openResultScreen() { //allowing to change contents dynamically
    locationSearchDiv.classList.add('passive');
    resultScreenDiv.classList.add('active');
}

function closeResultScreen() { //allowing to clear results and return to search form

    locationSearchDiv.classList.remove('passive');
    resultScreenDiv.classList.remove('active');

    closeWeatherDetailsModal();

    //All result contents are cleared off and returned to default values for the next search for a new city

    temperatureResult.textContent = null;
    placeResult.textContent = null;
    weatherResult.src = '#';
    weatherDescResult.textContent = null;
    feelingResult.textContent = null;
    minTempResult.textContent = null;
    maxTempResult.textContent = null;
    degreeMetrics.forEach((degreeMetric) => {
        degreeMetric.textContent = '°C' 
    });
    convertUnitsBtn.textContent = '°C';
    windSpeedResult.textContent = null;
    cityName.textContent = null;
    weatherDetailsModalDesc.textContent = null;
    weatherDetailsModalHumidity.textContent = null;
    weatherDetailsModalPressure.textContent = null;
    weatherDetailsModalVisibility.textContent = null;
    weatherDetailsModalSunRise.textContent = null;
    weatherDetailsModalSunSet.textContent = null;
}

function toggleTemperatureUnits(e) { //allowing to convert values and degree metrics between each other

    convertUnitsBtn.textContent = convertUnitsBtn.textContent === '°C' ? '°F' : '°C';
    degreeMetrics.forEach((degreeMetric) => {
        degreeMetric.textContent = degreeMetric.textContent === '°C' ? '°F' : '°C' 
    });

    //All values are selected according to their places compared to convert button

    let tempResultTextContent = e.target.parentNode.firstElementChild.firstElementChild.textContent;
    let tempResultNum = Number(tempResultTextContent); //strings are made numbers

    let feelingResultTextContent = e.target.parentNode.parentNode.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.textContent;
    let feelingResultNum = Number(feelingResultTextContent); //strings are made numbers

    let minTempResultTextContent = e.target.parentNode.parentNode.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.textContent;
    let minTempResultNum = Number(minTempResultTextContent); //strings are made numbers

    let maxTempResultTextContent = e.target.parentNode.parentNode.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.textContent;
    let maxTempResultNum = Number(maxTempResultTextContent); //strings are made numbers

    if(convertUnitsBtn.textContent === '°F') { //if else statement for making conversions
        tempResultNum = convertFromCelToFah(tempResultNum);
        feelingResultNum = convertFromCelToFah(feelingResultNum);
        minTempResultNum = convertFromCelToFah(minTempResultNum);
        maxTempResultNum = convertFromCelToFah(maxTempResultNum);
    } else {
        tempResultNum = convertFromFahToCel(tempResultNum);
        feelingResultNum = convertFromFahToCel(feelingResultNum);
        minTempResultNum = convertFromFahToCel(minTempResultNum);
        maxTempResultNum = convertFromFahToCel(maxTempResultNum);
    }

    tempResultTextContent = tempResultNum.toString(); //numbers are made string for recursive toggling between metrics
    temperatureResult.textContent = tempResultTextContent;

    feelingResultTextContent = feelingResultNum.toString();//numbers are made string for recursive toggling between metrics
    feelingResult.textContent = feelingResultTextContent;

    minTempResultTextContent = minTempResultNum.toString();//numbers are made string for recursive toggling between metrics
    minTempResult.textContent = minTempResultTextContent;
    
    maxTempResultTextContent = maxTempResultNum.toString();//numbers are made string for recursive toggling between metrics
    maxTempResult.textContent = maxTempResultTextContent;
}

function convertFromCelToFah(Number) { //allowing to convert from celcius to fahrenheit
    return Math.round((Number * 1.8) + 32);
}

function convertFromFahToCel(Number) { //allowing to convert from fahrenheit to celcius 
    return Math.round((Number - 32) / 1.8);
}

function openWeatherDetailsModal() { //allowing to see weather details
    overlayWindow.classList.add('active');
    weatherDetailsModal.classList.add('active');
}

function closeWeatherDetailsModal() { //closes weather details table
    overlayWindow.classList.remove('active');
    weatherDetailsModal.classList.remove('active');
}

function handleKeyboardInput(e) { //Enables users to close weather details modal by Escape key
    if (e.key === 'Escape') 
    closeWeatherDetailsModal()
}

function createWeatherData(data) { //allowing to allocate values by the data derived from fetching by async func

    const city = data.name;
    const country = data.sys.country;
    const temperature = Math.round(data.main.temp); //rounding decimal values
    const maxTemperature = Math.round(data.main.temp_max); //rounding decimal values
    const minTemperature = Math.round(data.main.temp_min); //rounding decimal values
    const feelsLike = Math.round(data.main.feels_like); //rounding decimal values
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const visibility = data.visibility;
    const windSpeed = data.wind.speed;
    const sunRise = data.sys.sunrise;
    const sunRiseHours = new Date(sunRise * 1000).toString().substring(16, 21); //deriving a string of hour and minutes
    const sunSet = data.sys.sunset;
    const sunSetHours = new Date(sunSet * 1000).toString().substring(16, 21); //deriving a string of hour and minutes
    const description = data.weather[0].description;
    const descriptionWithCapitalizedFirstLetter = description.charAt(0).toUpperCase() + description.slice(1);
    const iconSrc = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.weather[0].icon}.svg`;
    
    //Allocating values

    cityName.textContent = `${city}`;
    temperatureResult.textContent = `${temperature}`;
    placeResult.textContent = `${city}, ${country}`;
    weatherResult.src = `${iconSrc}`;
    weatherDescResult.textContent = `${descriptionWithCapitalizedFirstLetter}`;
    feelingResult.textContent = `${feelsLike}`;
    minTempResult.textContent = `${minTemperature}`;
    maxTempResult.textContent = `${maxTemperature}`;
    windSpeedResult.textContent = `${windSpeed} km/h`;
    weatherDetailsModalDesc.textContent = `${descriptionWithCapitalizedFirstLetter}`;
    weatherDetailsModalHumidity.textContent = `${humidity} %`;
    weatherDetailsModalPressure.textContent = `${pressure} hPa`;
    weatherDetailsModalVisibility.textContent = `${visibility} m`;
    weatherDetailsModalSunRise.textContent = `${sunRiseHours}`;
    weatherDetailsModalSunSet.textContent = `${sunSetHours}`;
}

async function getWeatherData(city) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=bbea7694c66d062ebb3f9152bd60caee`, { mode: 'cors' });
      const data = await response.json();
      createWeatherData(data);
      openResultScreen();
    } catch (error) {
        addErrorMessage();
    }
    locationSearchForm.reset();
}

function addErrorMessage() { //allowing to throw an error message if searched place can not be founded
    errorMsg.classList.add('active');
}

function removeErrorMessage() { //clears off error message to continue
    errorMsg.classList.remove('active');
}

locationSearchForm.addEventListener('submit', (e) => { //allowing to search city by using both enter key or Go button
    e.preventDefault(); //preventing unwanted entries
});

locationSearchFormBtn.addEventListener('click', async () => {
    if (locationSearchFormInput.value === '') return;
    await getWeatherData(locationSearchFormInput.value);
});

/*-----EVENT LISTENER DECLARATIONS-----*/

returnBtn.addEventListener('click', closeResultScreen);

convertUnitsBtn.addEventListener('click', toggleTemperatureUnits);

openDetailsBtn.addEventListener('click', openWeatherDetailsModal);

locationSearchFormInput.addEventListener('keydown', removeErrorMessage);

overlayWindow.addEventListener('click', closeWeatherDetailsModal); //no need to add a close button for weather details modal

document.addEventListener('keydown', handleKeyboardInput) //onload event listener for escape key
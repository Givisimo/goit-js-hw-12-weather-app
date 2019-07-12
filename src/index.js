'use strict';

import getGeoPosition from './getGeoPosition';
import fetchWeather from './fetchWeather';
import './css/styles.css';
import alertOn from './Pnotify'



const weatherWrapper = document.querySelector('#weather');
const locationValue = document.querySelector('span[data-field="location"]');
const tempValue = document.querySelector('span[data-field="temp"]');
const humidityValue = document.querySelector('span[data-field="humidity"]');
const windValue = document.querySelector('span[data-field="wind"]');
const conditionsValue = document.querySelector('span[data-field="conditions"]');
const imgOfConditionValue = document.querySelector('.icon');
const searchForm = document.querySelector('#search-form');

function markup(weather) {
  weatherWrapper.classList.remove('is-hidden');
  locationValue.textContent = weather.location.name;
  tempValue.textContent = weather.current.temp_c;
  humidityValue.textContent = weather.current.humidity;
  windValue.textContent = weather.current.wind_kph;
  conditionsValue.textContent = weather.current.condition.text;
  imgOfConditionValue.setAttribute('src', weather.current.condition.icon);
}

function handleClick(event) {
  event.preventDefault();
  fetchWeather(event.currentTarget.elements.city.value).then(weather => {
    markup(weather);
  });
}

getGeoPosition()
  .then(location => {
    fetchWeather(
      `${location.coords.latitude},${location.coords.longitude}`,
    ).then(weather => {
      markup(weather);
    });
  })
  .catch(() => {
    alertOn;
    searchForm.addEventListener('submit', handleClick);
  });

'use strict';

import getGeoPosition from './getGeoPosition';
import fetchWeather from './fetchWeather';
import './css/reset.css';
import './css/styles.css';

import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';
PNotify.defaults.delay -= 6000;
const optionsPNotify = {
  text: "Нет прав доступа к геопозиции, используйте поиск по имени города!",
  context: document.getElementById('search-form'),
  stack: {
    'dir1': 'down',
    'firstpos1': 25
  }
};

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
  tempValue.textContent = `${weather.current.temp_c}\xB0`;
  humidityValue.textContent = `${weather.current.humidity}\u0025`;
  windValue.textContent = `${weather.current.wind_kph} kph`;
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
    PNotify.info(optionsPNotify);
    searchForm.addEventListener('submit', handleClick);
  });

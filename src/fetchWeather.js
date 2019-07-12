'use strict';

export default fetchWeather;

function fetchWeather(query) {
  return fetch(
    `https://api.apixu.com/v1//current.json?key=2eb7d60abecf4583bb3222242191007&q=${query}`,
  ).then(response => response.json());
}

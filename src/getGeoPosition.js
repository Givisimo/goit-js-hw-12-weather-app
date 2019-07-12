'use strict';

function getGeoPosition() {
  const options = {
    maximumAge: 1800000,
  };
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options),
  );
}

export default getGeoPosition;

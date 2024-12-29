const request = require('postman-request');

const geocode = (address, cb) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoiamFzb25pZSIsImEiOiJjbHFmdW1qYTEwMjlzMmpwaGZhc25hbW5wIn0.KhKZNjyT_K2ggBvuhVvIPg&limit=1';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      cb('Unable to connect to location services');
    } else if (body.features.length === 0) {
      cb('Unable to find location. Try another search.');
    } else {
      cb(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;

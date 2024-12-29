const request = require('postman-request');

const forecast = (lat, long, cb) => {
  const url =
    'http://api.weatherstack.com/current?access_key=911c192bbe58d276cdeb52925875e3b6&query=' +
    lat +
    ',' +
    long +
    '&units=f';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      cb('Unable to connect to weather services.');
    } else if (body.error) {
      cb(body.error.info);
    } else {
      cb(
        undefined,
        body.current.weather_descriptions[0] +
          '. It is currently ' +
          body.current.temperature +
          ' degrees out. There is a ' +
          body.current.precip +
          '% chance of rain.'
      );
    }
  });
};

module.exports = forecast;

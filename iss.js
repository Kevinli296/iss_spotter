const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (error, response, body) => {

    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const data = JSON.parse(body);
    callback(null, data.ip);

  });

};

const fetchCoordsByIP = (IP, callback) => {
  request(`http://api.ipstack.com/${IP}?access_key=c9300e36aed586ffb9fce836a61d306a&format=1`, (error, response, body) => {

    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates from IP: ${body}`), null);
      return;
    }

    const data = JSON.parse(body);
    const latitude = data.latitude;
    const longitude = data.longitude;
    const coords = {latitude, longitude};
    callback(null, coords);

  });

};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching fly over times from coordinates: ${body}`), null);
      return;
    }

    const data = JSON.parse(body);
    const flyOverTimes = data.response;
    callback(null, flyOverTimes);


  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, IP) => {

    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(IP, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {

        if (error) {
          return callback(error, null);
        }

        // first attempt:
        // for (response of flyOverTimes) {
        //   const time = new Date(response.risetime * 1000);
        //   console.log(`Next pass at ${time} for ${response.duration} seconds!`)
        // }

        callback(null, flyOverTimes);

      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
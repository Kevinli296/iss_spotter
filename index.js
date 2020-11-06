// const { fetchMyIP } = require('./iss');
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('24.80.81.108', (error, coords) => {
//     if (error) {
//         console.log("It didn't work!" , error);
//         return;
//     }

//     console.log('It worked! Returned Coordinates by IP: ', coords);
// });

// fetchISSFlyOverTimes({latitude: 49.29270935058594, longitude: -123.04773712158203}, (error, flyOverTimes) => {
//     if (error) {
//         console.log("It didn't work!" , error);
//         return;
//     }

//     console.log('It worked! Returned fly over times by coordinates: \n', flyOverTimes)
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (let response of passTimes) {
    const time = new Date(response.risetime * 1000);
    console.log(`Next pass at ${time} for ${response.duration} seconds!`);
  }

//   console.log(passTimes);
});
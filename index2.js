const { nextISSTimesForMyLocation } = require('./iss_promised');

// fetchMyIP()
// .then(fetchCoordsByIP)
// .then(fetchISSFlyOverTimes)
// .then(body => console.log(body));

const printPassTimes = (passTimes) => {
  for (let response of passTimes) {
    const time = new Date(response.risetime * 1000);
    console.log(`Next pass time at ${time} for ${response.duration} seconds!`);
  }
};


nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  });
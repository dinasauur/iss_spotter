// will require and run our main function
//const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

/*
//STEP 1

fetchMyIP((error, ip) => {
  if (error) {
    console.log(`Oops, something went wrong: `, error);
    return;
  }
  console.log(`It worked! Returned IP: `, ip);
});
*/


/////////////////////////////////////////////////////////////////
// STEP 2
// https://ipwho.is/42 --> Incorrect URL

/*
fetchCoordsByIP('162.245.144.188', (error, ip) => {
  if (error) {
    console.log(`Oops! Something went wrong: `, error);
    return;
  }
  console.log(`It worked! Returned IP: `, ip);
});

*/

/////////////////////////////////////////////////////////////////
// STEP 3
/*
const coords = { latitude: 49.2827291, longitude: -123.1207375 };
fetchISSFlyOverTimes(coords, (error, passTimes) => {
  if (error) {
    console.log(`Oops! Something went wrong: `, error);
    return;
  }
  console.log(`It worked! Returned flyover times: ${passTimes}`);
});

*/

/////////////////////////////////////////////////////////////////

// Next pass at Fri Jun 01 2021 13:01:35 GMT-0700 (Pacific Daylight Time) for 465 seconds!

const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const value of passTimes) {
    const risetime = value.risetime;
    const dateTime = new Date();
    dateTime.setUTCSeconds(risetime);

    const duration = value.duration;

    console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
  }
};



nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log(`Oops! Something went wrong: ${error}`);
    return;
  }

  printPassTimes(passTimes);
});


module.exports = { printPassTimes };
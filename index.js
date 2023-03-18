// will require and run our main function
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

/*

fetchMyIP((error, ip) => {
  if (error) {
    console.log(`Oops, something went wrong: `, error);
    return;
  }
  console.log(`It worked! Returned IP: `, ip);
});

*/

/////////////////////////////////////////////////////////////////
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

const coords = { latitude: 49.2827291, longitude: -123.1207375 };
fetchISSFlyOverTimes(coords, (error, arrayData) => {
  if (error) {
    console.log(`Oops! Something went wrong: `, error);
    return;
  }
  console.log(`It worked! Returned flyover times: ${arrayData}`);
});

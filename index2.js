const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printPassTimes } = require('./index');

// see index.js for printPassTimes 
// copy it from there, or better yet, moduralize and require it in both files

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log(`Oops! Something went wrong: ${error.message}`);
  })
  



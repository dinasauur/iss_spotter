// will require and run our main function
const { fetchMyIP } = require('./iss');


fetchMyIP((error, ip) => {
  if (error) {
    console.log(`Oops, something went wrong: `, error);
    return;
  }

  console.log(`It worked! Returned IP: `, ip);
});


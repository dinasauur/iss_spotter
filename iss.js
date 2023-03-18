// contain most of the logic for fetching the data from each API endpoint

// Step 1, fetch our public IP Address, which will later help (approximately) locate us geographically
//// Define a function fetchMyIP which will asynchronously return our IP Address using an API
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require(`request`);

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  const url = `https://api.ipify.org?format=json`;
  request(url, (error, response, body) => {

    const statusCode = response.statusCode;

    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.
    if (error) return callback(error, null);

    // Error Handling -> if non-200 status, assume server error
    if (statusCode !== 200) {
      const msg = `Status Code ${statusCode} when fetching IP. Response: ${body}`;
      callback(msg, null); // Can also do callback(Error(msg), null) -> this basically prints out all the error (normal and written). What we did was basically pass the msg as the value to the error parameter in the callback function.
      return;
    }

    const ip = JSON.parse(body);
    // Happy Path
    callback(null, ip);

  });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Step 2 - API call #2 - Fetch GEO Coordinates By IP
// Our next function, fetchCoordsByIP will be one that takes in an IP address and returns the latitude and longitude for it

const fetchCoordsByIP = function(ip, callback) {
  const url = `http://ipwho.is/${ip}`;
  request(url, (error, response, body) => {
    // This code checks for errors in our request callback, it's always the first set of checks before we try to parse the body.
    if (error) {
      callback(error, null);
      return;
    }

    // Parse the returned body
    const data = JSON.parse(body);

    // Error Handling - Invalid IP value
    /// check if parsed body/ data (in this case) is success or not
    if (!data.success) {
      const msg = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}.`;
      callback(msg, null);
      return;
    }

    // Retrieve latitude and longitude
    //// NEW: Deconstructuring. This is called binding... each individual property is bound to the variable data.
    const { latitude, longitude } = data;

    // Happy Path
    callback(null, { latitude, longitude });
  });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Step 3 - Fetch the next ISS flyovers for our geo coordinates;
/// Given a location on earth (lat, long, alt), this API will compute the next number of times that the ISS will be overhead
// input: latitude/longitude pair, an altitude, and how many results to return
// output: get the same inputs back (for checking), a time stamp when the API ran, success/failure message, list of passes (each pass has duration in second and a rise time as a unix time stamp)

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const statusCode = response.statusCode;
    if (statusCode !== 200) {
      const msg = `Status Code ${statusCode} when fetching IP. Response: ${body}`;
      callback(msg, null); // Can also do callback(Error(msg), null) -> this basically prints out all the error (normal and written). What we did was basically pass the msg as the value to the error parameter in the callback function.
      return;
    }

    // parse the returned body and access the response property
    const data = JSON.parse(body).response;

    // Happy Path
    callback(null, data); // !!!!!!!!!! returning It worked! Returned flyover times: [object Object],[object Object],[object Object],[object Object],[object Object]
  });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, location) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(location, (error, passTimes) => {
        if (error) {
          return callback(error, null);
        }

        // Happy Path
        callback(null, passTimes);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };


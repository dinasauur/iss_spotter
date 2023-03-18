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

    // if non-200 status, assume server error
    if (statusCode !== 200) {
      const msg = `Status Code ${statusCode} when fetching IP. Response: ${body}`;
      callback(error(msg), null);
      return;
    }

    const ip = JSON.parse(body);
    // Happy Path
    callback(null, ip);

  });
};

module.exports = { fetchMyIP };
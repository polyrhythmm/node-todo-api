const request = require('request');

const fetch = (encodedURL, callback) => {
  const example = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURL}&key=AIzaSyA9sMaf-KRPsfRJbkTwPrsv_mfn4ZacxYQ`;
  
  request({
    url: example,
    json: true
  }, (error, response, body) => {
    if(error) {
      callback("There was an error");
    } else if(body) {
      callback(undefined, {
        address: body.results[0].formatted_address,
        lat: body.results[0].geometry.location.lat,
        lng: body.results[0].geometry.location.lng
      });
    };
  }
)};

module.exports.fetch = fetch;
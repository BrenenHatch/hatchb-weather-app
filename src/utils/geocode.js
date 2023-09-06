const request = require('request')
require('dotenv').config();

const geocode = (address, callback) => {
    const apiKey = process.env.GEOCODE_API_KEY;
    const url = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json?key=${apiKey}`
    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('Unable to connect to geolocation data', undefined)
        } else if (!body || !body.results || !body.results[0] || !body.results[0].position) {
            callback('Unable to find location')
        } else{
            callback(undefined, {
                latitude: body.results[0].position.lat,
                longitude: body.results[0].position.lon,
                location: body.results[0].address.freeformAddress
            })  
        }
    })
}

module.exports = geocode
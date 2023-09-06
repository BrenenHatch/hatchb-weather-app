const request = require('request')
require('dotenv').config();

const forecast = (lat, lon, callback) => {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${lat},${lon}&units=f`
    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather data', undefined)
        } else if (body.error){
            callback('Unable to find location', undefined)
        } else{
            callback(undefined,`${body.location.name} is ${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} \
degrees out. It feels like ${body.current.feelslike} degrees out`)    
        }
    })
}

module.exports = forecast

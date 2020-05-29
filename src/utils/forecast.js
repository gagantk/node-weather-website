const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=6e5617e45f7636bebedafcbdf52e6078&units=metric'

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.cod === '400') {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.weather[0].main + '. It is currently ' + body.main.temp + '° out. But it feels like ' + body.main.feels_like + '°.')
        }
    })
}

module.exports = forecast
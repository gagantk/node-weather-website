const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=6e5617e45f7636bebedafcbdf52e6078&units=metric'

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.cod === '400') {
            callback('Unable to find location', undefined)
        } else {
            const sunrise = (new Date(body.sys.sunrise * 1000)).toLocaleTimeString()
            const sunset = (new Date(body.sys.sunset * 1000)).toLocaleTimeString()
            callback(undefined, {
                forecast: body.weather[0].main + '. It is currently ' + body.main.temp + '° out. But it feels like ' + body.main.feels_like + '°.',
                sunrise,
                sunset
            })
        }
    })
}

module.exports = forecast
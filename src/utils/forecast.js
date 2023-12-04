const request = require('request');

const forecast = (lan,lon, callback ) => {
    const url = 'http://api.weatherstack.com/current?access_key=0732f1cf309cfe70dbc211329e2a274a&query='+ lan +',' + lon + '&units=f'
    request({url, json:true}, (error, { body })=>{  
        if(error){
            callback('Unable to connect to weather service.', undefined)
        } else if(body.error){  
            callback('Unable to find location',undefined);
        } else{
           callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature  + ' degress out.It feels like its ' + body.current.feelslike  + ' degrees out.')
        }
    })
}

module.exports = forecast
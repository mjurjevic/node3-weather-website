const request = require('request');

const geoCode = (address, callback) =>{
    const url = 'http://api.positionstack.com/v1/forward?access_key=c48bbfd5f77d747b58a92577917e98d7&query='+ address + '&limit=1';

    request({url, json:true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if(body.data === 0){
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label
            })
        }
    })
}


module.exports = geoCode
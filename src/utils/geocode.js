
const request = require('request')

const geocode = (address, callback) => {
    const url1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic29zYWluaSIsImEiOiJjbGxjYWdpcjIwZmt3M2RsMTlnbTUyd3JoIn0.uGZp3XxiaTdkkcPfA4aEGg&limit=1' 

    request({url:url1, json: true}, (error, {body} = {}) => {

        if(error){
            console.log(error)
            callback('Unable to connect to Weather app!' ,undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find the location!', undefined)
        }
        else{
            callback(undefined, {
                Latitude: body.features[0].center[0],
                Longitude: body.features[0].center[1],
                Location: body.features[0].place_name
            })
        }
    })

    


}

module.exports = geocode
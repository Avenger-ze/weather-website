const request = require("request")



const forecast = (address, callback) => {

    url= 'http://api.weatherapi.com/v1/current.json?key=69c4dcb8a62541f08fd132305233007&q='+encodeURIComponent(address)

    request({url,json:true}, (error, {body} = {}) => {
         if(error){
            callback('unable to provide forecast',undefined)
         }
         else if(body.error){
            callback('unable to find the loction',undefined)
        }
        else{
            callback( undefined,"Today's weather will be "+ body.current.condition.text + '. Temperture will be ' + body.current.temp_c + '. feels like ' + body.current.feelslike_c)
        }
    } )
}


module.exports = forecast
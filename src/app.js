const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()


const pubDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views' )
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(pubDirPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name: 'me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        help:'help karo',
        title:'help bsdk'

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        about:'telling weather',
        title:'bad bitches!',
        name: 'me'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Please provide the address'
        })
    }
    geocode(req.query.address, (error, {Location} = {}) => {
        if(error) {
            return res.send({error})
        }
        
        forecast(req.query.address, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            
          res.send([{
            Location,
            forecast: forecastData,
            address: req.query.address
    }   ])
      })
    })   
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        error:'Help article not found'
    } )
})


app.get('*', (req, res) => {
    res.render('error', {
        error:'error 404'
    })
})


app.listen(3000)
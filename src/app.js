const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

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
        name: 'Sourav'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        help:'Contact Us',
        title:'Help page'

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        about:'You can use this website to get the weather forecast for your area',
        title:'About us',
        name: 'Sourav'
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


app.listen(port)

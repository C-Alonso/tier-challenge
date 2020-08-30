const express = require('express')
//Doesn't grab anything. Just ensures connection to the db.
require('./db/mongoose')
//Routers
const addressRouter = require('./routers/address')
const counterRouter = require('./routers/counter')

const app = express()

const path = require('path')
const hbs = require('hbs')



//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

//Used for dynamic content. Setup handlebars engine and views location.
app.set('view engine', 'hbs')
app.set('views', viewsPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.use(express.json())


app.get('', (reqShevo, resShevo) => {
    resShevo.render('index', {
        title: 'TIER URL-Shortener',
        name: 'Carlos Alonso'
    })
})

//Automatically parse incoming JSON
app.use(addressRouter)
app.use(counterRouter)


//Wildcard for matching anything that wasn't matched.
app.get('*', (reqShevo, resShevo) => {
    resShevo.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Carlos Alonso'
    })
})

module.exports = app
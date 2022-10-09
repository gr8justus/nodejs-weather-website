'use strict';

// Modules employed
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url));
import express from 'express';  
import hbs from 'hbs';
import { forecast } from './utils/forecast.js';

const app = express();
const port = process.env.PORT || 3000

// Paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Handlebars setup for dynamic content
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// static content setup
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        headTitle: 'Weather',
        title: 'Weather App',
        name: 'Oluwatobi Oladoye'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        headTitle: 'About',
        title: 'About Me',
        name: 'Oluwatobi Oladoye'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        headTitle: 'Help',
        title: 'Help',
        name: 'Oluwatobi Oladoye'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: 'You need to provide an address'
        })
    }
    forecast(address, (data) => {
        if (!data.location) {
            return res.send({
                error: 'Unable to get location. Try another search.'
            })
        }
        res.send(data)
    })
})

app.get('/help/*', (req, res) => {
    res.render('404-help', {
        headTitle: 404,
        title: 404,
        name: 'Oluwatobi Oladoye'
    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        headTitle: 404,
        title: 404,
        name: 'Oluwatobi Oladoye'
    })
})

app.listen(port, () => {
    console.log('Server running on port ' + port)
})
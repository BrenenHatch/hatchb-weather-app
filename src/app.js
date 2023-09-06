const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3001; // Use Render's port (3001) or default to 3001

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Define your routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Brenen Hatch'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Brenen Hatch'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Brenen Hatch'
    });
});

app.get('/cloud', (req, res) => {
    res.render('cloud', {
        title: 'About Me',
        name: 'Brenen Hatch'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }
    geocode(req.query.address, (geocodeError, { latitude, longitude, location } = {}) => {
        if (geocodeError) {
            return res.send({ error: geocodeError });
        } else {
            forecast(latitude, longitude, (forecastError, forecastData) => {
                if (forecastError) {
                    return res.send({ error: forecastError });
                } else {
                    res.send({
                        forecast: forecastData,
                        location,
                    });
                }
            });
        }
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Brenen Hatch',
        errorMessage: 'Help Article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Brenen Hatch',
        errorMessage: 'Page not found',
    });
});

// Start the server with Render's port and keep-alive settings
const server = app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
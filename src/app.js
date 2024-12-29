const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Configures our server
const app = express();
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Serve up directory, customizes server
app.use(express.static(publicDirPath));

// Set a value for a given express setting
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Let's assume we own the domain app.com
// app.com/about and app.com/help are example routes

// Configures what the server should do when someone tries to 'get' the resource at the speciifc url
// Argument 1: route (partial url, ex: /about, /help) Argument 2: function dscribing what we want to do
//  Function arguments: 1: Object containing info about incoming request to server
//                      2: Response containing methods which are what we send back
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Jason Ie',
  }); // arg1: name of view to render, arg2: object containing values we want view to access
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Jason Ie',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'Welcome to the Help Page ',
    title: 'Help',
    name: 'Jason Ie',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address required',
    });
  }

  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(lat, long, (error, forecastData) => {
      if (error) {
        res.send({ error });
      }
      res.send({
        forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  res.send({
    products: [req.query.search],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Jason Ie',
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Jason Ie',
    errorMessage: 'Page not found',
  });
});

// Starts the server on given port, optional arg2 is cb function which runs when server is running
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

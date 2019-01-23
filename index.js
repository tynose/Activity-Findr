const express = require('express');
const bodyParser = require('body-parser');
const RapidAPI = require('rapidapi-connect');
const path = require('path');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;
require('dotenv').config();
const rapid = new RapidAPI(process.env.DEFAULT_APP, process.env.ACCESS_TOKEN);

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// serves static files from build folder

///////// GET Businesses ///////////

let businesses = [];

app.post('/getbusinesses', (req, res) => {
  businesses = [];
  rapid
    .call('YelpAPI', 'getBusinesses', {
      accessToken: process.env.ACCESS_KEY,
      ...req.body
    })
    .on('success', payload => {
      businesses = payload;
    })
    .on('error', payload => {
      console.error(payload);
    });
});

app.get('/results', (req, res) => {
  res.json(businesses);
});

///////// GET Businesses Reviews ///////////

app.post('/getbusinessreviews', (req, res) => {
  rapid
    .call('YelpAPI', 'getBusinessReviews', {
      accessToken: process.env.ACCESS_KEY,
      ...req.body
    })
    .on('success', payload => {
      res.json(payload);
    })
    .on('error', payload => {
      console.error(payload);
    });
});

// catch all endpoint

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT, err => {
  if (err) {
    return console.log(err);
  }
  console.log(`server is listening on ${PORT}...be careful what you say!`);
});

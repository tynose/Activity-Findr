const express = require('express');
const bodyParser = require('body-parser');
const RapidAPI = require('rapidapi-connect');
const path = require('path');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 8080;
const rapid = new RapidAPI("default-application_5beda1abe4b0d1763ed6f67c", "fd1b0b7e-80a5-4887-9c1d-dd5af98e1ad6");

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
require("dotenv").config();

// serves static files from build folder


///////// GET Businesses ///////////

let businesses = [];

app.post('/getbusinesses', (req, res)=>{  
    businesses = [];
    rapid.call('YelpAPI', 'getBusinesses', {
      'accessToken': 'FlvnN46hij2ovHvyn1GqRMwl5TrGhHvq3hquKB-oBO_CNJxDbjA4qT2rojhqknM7kgn-1ec6HDamXIKhihz1cKpS4XA0I6K4LGMA2lKcBkHnqnxgs-g8HjJlqpntW3Yx',
        ...req.body
        
        
    }).on('success', (payload) => {
        businesses = payload;
    }).on('error', (payload) => {
        console.error(payload);    
    });
});

app.get('/results', (req, res) =>{
    res.json(businesses);
});

///////// GET Businesses Reviews ///////////

app.post('/getbusinessreviews', (req, res) => {
    rapid
    .call("YelpAPI", "getBusinessReviews", {
      accessToken: 'FlvnN46hij2ovHvyn1GqRMwl5TrGhHvq3hquKB-oBO_CNJxDbjA4qT2rojhqknM7kgn-1ec6HDamXIKhihz1cKpS4XA0I6K4LGMA2lKcBkHnqnxgs-g8HjJlqpntW3Yx',
        ...req.body
    })
    .on("success", payload => {
        res.json(payload);
    })
    .on("error", payload => {
        console.error(payload);
    });
})

// catch all endpoint 

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`server is listening on ${PORT}...be careful what you say!`)
})

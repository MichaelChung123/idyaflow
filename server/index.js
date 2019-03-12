const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();

var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);

var cors = require('cors')

app.use(cors())


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(pino);

app.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        greeting: `Hello ${name}!`
    }));
});

app.get('/getTweets', (req, res) => {
    // Set up your search parameters
    var params = {
        q: req.query.ID,
        count: 10,
        result_type: 'recent',
        lang: 'en'
    }
    
    T.get('search/tweets', params, function (err, data, response) {
        if (!err) {
            res.send(data.statuses);
        } else {
            res.send(err);
        }
    });
});

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);
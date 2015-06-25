var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var express = require('express');
var app = express();

require('dotenv').load();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 8000;
var conString = process.env.DATABASE_URL || "postgres://localhost/bewd_twitter";

var pg = require('pg');
var conString = "postgres://"+ process.env.DATABASE_USERNAME + ":" + process.env.DATABASE_PASSWORD + "@localhost/" + process.env.DATABASE_NAME;

app.get('/', function (req, res) {
  res.send('root')
});



// app.post('/tweets', function (req, res) {
//   res.send('POST request to homepage');
// });

app.get('/tweets', function (req, res) {
  pg.connect(conString, function(err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }
    // client.query('SELECT $1::int AS number', ['1'], function(err, result) {
    client.query('SELECT * FROM tweets', function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      // console.log(result.rows[0].number);
      res.json(result.rows);
    });

  });
});

app.post('/tweets', function(req, res) {
  pg.connect(conString, function(err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO tweets (body, created_at) VALUES ($1, now())', [req.body.mytweet] , function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.redirect('/tweets');
    });

  });

});

//boot up the server
app.listen(port);
console.log('The server is listening to ' + port);

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

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

var port = process.env.PORT || 8000;
var conString = process.env.DATABASE_URL || "postgres://fanpfwfgzyodve:EJN5lcErrK-a2XcMVEGpLcMsmH@ec2-54-197-245-93.compute-1.amazonaws.com:5432/dfvkrik29aveht";

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
      res.render('tweets', {data: result});

      // res.json(result.rows);
    });

  });
});

app.post('/tweets', function(req, res) {
  pg.connect(conString, function(err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO tweets (body, username, created_at) VALUES ($1, $2, now())', [req.body.mytweet, req.body.username] , function(err, result) {
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

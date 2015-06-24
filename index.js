var express = require('express');
var app = express();

require('dotenv').load();

var port = process.env.PORT || 8000;
var conString = process.env.DATABASE_URL || "postgres://localhost/bewd_twitter";

app.get('/', function (req, res) {
  res.send('you made it this far');
});

//boot up the server
app.listen(port);
console.log('The server is listening to ' + port);

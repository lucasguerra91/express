const express = require('express');
const logger = require('morgan');
const http = require('http');
const path = require('path');

var app = express();
app.use(logger("short"));

var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.use(function(req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("Looks like you didn't find a static file.");
});

http.createServer(app).listen(3000);

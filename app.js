const express = require('express');
const logger = require('morgan');
const http = require('http');
const path = require('path');

var app = express();
app.use(logger("short"));

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

const EVIL_IP = "192.168.5.120";
// Mi ip segun node ::1

app.use(function(request, response, next) {
   if (request.ip === EVIL_IP) {
      response.status(401).send("Not Allowed!");
   }else {
      next();
   }
});

var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

/**
 * / Routing with express
 */

app.get ("/", function(req, res){
   res.render("index",{
      message: "Hey there i'm using Whatsapp ."
   });
});


 app.get("/about", (req, res) => res.end("Welcome to the about page"))

 app.get("/weather", (req, res) => res.end("The current weather is NICE!"))

 app.get("/hello/:who", function(req, res) {
   res.end("Hello, " + req.params.who + " .")
   // Fun fact: this has some security issues
 });

 app.use(function(req, res) {
   res.statusCode = 404;
   res.end("404!");
 })



http.createServer(app).listen(3000);

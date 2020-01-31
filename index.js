const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const configs = require('./configs/key')
console.log(configs.mongoURI)
mongoose.connect(configs.mongoURI,{useNewUrlParser:true}).then(()=> console.log('connection with DB has been established.')).catch(error => console.error(error))

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const CONFLICT = 409;
const SERVER_ERROR = 500;

const app = express();
  const port = 5000;
  app.locals.port = port;
  app.use(bodyParser.urlencoded({extended:true}))
  app.use(bodyParser.json())
  app.use(cookieParser())
  app.listen(port, function() {
  console.log(`listening on port ${port}`);
  });

app.get('/', function(req,res) {
  res.send("Hey I am responding to your request")
})

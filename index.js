const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const configs = require('./configs/key')
const {User} = require('./model/user')
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

app.post('/api/users/register', (req,res) => {
  const user = new User(req.body)
  user.save((error, data ) => {
    if(error) return res.json({
      sucsess:false,
      error,
    });
     res.status(200).json({
        sucsess:true,
        userData :data
      })
  })
})

app.post('/api/users/login', (req,res) => {

  User.findOne({email: req.body.email}, (err, user) => {
    if(!user) return res.json({
      success:false,
      message: "Login failed, no such email found"
    });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch){
        return res.json({
          success:false,
          message: "Incorrect Password"
        });
      }
    })

    user.generateToken((err, user) => {
      if(err) return res.status(400);
      res.cookie("x_auth", user.token).status(200).json({
        loginSuccess : true
      })
    })
  })
})
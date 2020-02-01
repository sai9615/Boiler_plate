const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const saltRounds = 10;
var jwt = require('jsonwebtoken');


const mySchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    password: {
        type: String,
        minglength: 5
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    role : {
        type:Number,
        default: 0 
    },
    image: String,
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    }
})

mySchema.pre('save', function( next ) {
    var user = this;
    if(user.isModified('password')){    
        console.log('password changed')
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
});

mySchema.methods.comparePassword = function(password, callback){
    bcrypt.compare(password, this.password, function(error, isMatch) {
        if(error) return callback(error);
        callback(null, isMatch)
    })
}

mySchema.methods.generateToken = function(callback){
    var user  = this;
    var token = jwt.sign(user._id.toHexString(),'secrets')
    user.token = token
    user.save(function(error, user) {
        if(error) return callback(error);
        return callback(null, user);
    })
}

mySchema.statics.findByToken = function (token, callback){
    var user = this
    jwt.verify(token, 'secrets', function(error, decode){
        user.findOne({"_id":decode, "token":token}, function(err,user){
            if(err) return callback(err)
            callback(null, user)
        })    
    })
}

const User = mongoose.model('User', mySchema)

module.exports = {User}

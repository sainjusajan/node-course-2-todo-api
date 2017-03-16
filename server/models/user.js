var mongoose = require('mongoose');
const validator = require('validator')
var jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  name: {
    type: String,
    minlength: 1,
    trim: true,
    required: true
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      required: true,
      type: String
    }
  }]
})
UserSchema.methods.toJSON =  function() {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email'])
}
UserSchema.methods.generateToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id, access}, '123abc').toString();

  user.tokens.push({access, token});

  return user.save().then( () => {
    return token;
  })
}

// Creating new User model
var User = mongoose.model('User', UserSchema)

// we do this when variable = variable like module.exports = { User: User}
module.exports = {User}

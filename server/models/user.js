var mongoose = require('mongoose');

// Creating new User model
var User = mongoose.model('User', {
  email: {
    required: true,
    type: String,
    minlength: 1,
    trim: true
  },
  name: {
    type: String,
    minlength: 1,
    trim: true,
    required: true
  }
})

// we do this when variable = variable like module.exports = { User: User}
module.exports = {User}

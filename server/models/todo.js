var mongoose = require('mongoose');

// creating schema for todo collection: creating a model n saving in a variable
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
})

// we do this when variable = variable like module.exports = { User: User}
module.exports = {Todo}

var mongoose = require('mongoose')

// setup promise to builtin promises
mongoose.Promise = global.Promise;

// connnecting to mongodb database
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose}

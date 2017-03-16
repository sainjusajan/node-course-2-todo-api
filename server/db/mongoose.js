var mongoose = require('mongoose')

// setup promise to builtin promises
mongoose.Promise = global.Promise;

// connnecting to mongodb database
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose}

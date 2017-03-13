<!-- Mongoose validation -->
http://mongoosejs.com/docs/validation.html
example:
var schema = new Schema({
      name: {
        type: String,
        required: true
      }
    });


<!-- Mongoose Schema: -->
http://mongoosejs.com/docs/guide.html
example:
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});


<!-- Mongoose update operators -->
https://docs.mongodb.com/manual/reference/operator/update/
you can update the data fetched via update operators like $set: {}, $inc: {}


<!-- to setup testing environment -->
1. required modules: mocha, supertest, expect
2. call test via : mocha server/**/*.test.js
3. we can automate this by specifying in package.json file and running npm run test-watch after
    "scripts": {
        "test": "mocha server/**/*.test.js",
        "test-watch": "nodemon --exec \"npm test\""
      }

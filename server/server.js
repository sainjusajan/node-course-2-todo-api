var app = require('express')();
var bodyParser = require('body-parser');

// object destructuring
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

// using middleware to parse the json to-and-from
app.use(bodyParser.json());

// posting todos api
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then( (doc) => {
    res.send(doc)
  }, (error) => {
    res.status(400).send(error)
  })

})

app.get('/todos', (req, res) => {
  Todo.find().then( (todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e)
  })
})







// listening to the port
app.listen(3000, () => {
  console.log('Server is running on port : 3000')
})

module.exports = {app};

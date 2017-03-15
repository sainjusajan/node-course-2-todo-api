var app = require('express')();
var bodyParser = require('body-parser');

// object destructuring
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var {ObjectID} = require('mongodb')

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


app.post('/events', (req, res) => {
    console.log(req);
})
app.get('/todos', (req, res) => {
  Todo.find().then( (todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e)
  })
})

app.get('/users/:id', (req, res) => {
 var id = req.params.id;
 if(! ObjectID.isValid(id)){
   res.status(404).send({})
 }

  User.findById(id).then( (user) => {
    if(!user){
    return res.status(404).send({})
    }
    res.send({user})
  }, (e) => {
    res.status(400).send({})
    })
})

// listening to the port
app.listen(3000, () => {
  console.log('Server is running on port : 3000')
})

module.exports = {app}

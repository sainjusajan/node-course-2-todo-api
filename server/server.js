require('./../config/config.js')

const _ = require('lodash');
var app = require('express')();

var bodyParser = require('body-parser');
// object destructuring
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
var {ObjectID} = require('mongodb')

const port = process.env.PORT

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
});

// creating new unique user
app.post('/users', (req, res) => {
  var body= _.pick(req.body, ['email', 'password', 'name'])
  var user = new User(body);
  user.save().then( () => {
    return user.generateToken();
    // res.send(user)
  }).then( (token) => {
    res.header('x-auth', token).send(user)
  }).catch( (error) => {
    res.status(400).send(error)
  })
})


// getting all the todos
app.get('/todos', (req, res) => {
  Todo.find().then( (todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e)
  })
})

// getting user by specific id route
app.get('/todos/:id', (req, res) => {
 var id = req.params.id;
 if(! ObjectID.isValid(id)){
   res.status(404).send({})
 }

  Todo.findById(id).then( (todo) => {
    if(!todo){
    return res.status(404).send({})
    }
    res.send({todo})
  }).catch( (e) => {
    res.status(400).send(e)
  })
})


// setting private routes that requires authentication
app.get('/users/me', authenticate,  (req, res) => {

  res.send(req.user);

})

// deleting todo by id route
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if( !ObjectID.isValid(id)){
        return res.status(404).send('Invalid ID')
    }

    Todo.findByIdAndRemove(id).then( (todo) => {
        if(!todo){
            return res.status(404).send({})
        }
        res.send({todo});
    }).catch( (e) => {
        res.send(e);
    })
})

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  // just picking the text and completed values from requested json data
  var body = _.pick(req.body, ['text', 'completed']);
  if(! ObjectID.isValid(id)){
    return res.status(404).send({})
  }
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new:true}).then( (todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo})
  }).catch( (e) => {
    res.status(400).send(e)
  })
})

// listening to the port
app.listen(port, () => {
  console.log(`Server is running on port : ${port}`)
})

module.exports = {app}

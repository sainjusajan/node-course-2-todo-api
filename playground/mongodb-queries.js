const {mongoose} = require('./../server/db/mongoose')
var {ObjectID} = require('mongodb')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

var id = '58c67f8d506d9909e4f89849'
if (! ObjectID.isValid(id)){
  console.log('ID is invalid');
}

// querying all that matches : returns array
Todo.find({
  _id: id
}).then( (todos) => {
  console.log('todos', todos)
})

// Querying by findOne : return one object
Todo.findOne({
  _id : id
}).then( (todo) => {
  console.log(todo)
})

// querying by id : return object
Todo.findById(id).then( (todo) => {
  if(!todo){
    return console.log("id Not Found");
  }
  console.log(todo);
}).catch( (e)=> console.log(e))

var user_id = '58c6408a4146a316bcaaab12'
// querying user by id
User.findById(user_id).then( (user) => {
  if(!user) {
    return console.log("user not Found");
  }
  console.log('User is : ', user.email);
}).catch( (e) => {
  console.log(e);
})

const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const jwt = require('jsonwebtoken');
// clearing database before every test
const todos = [
  {
    _id: new ObjectID(),
    text: "first todo note"
  },
  {
    _id: new ObjectID(),
    text: "second todo note",
    completed: true,
    completedAt: 333
  }
];

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
  {
    _id : userOneId,
    name : 'sajan sainju',
    email: 'tsajansainju@gmail.com',
    password: 'sasa1234',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, '123abc').toString()
    }]
  },
  {
    _id : userTwoId,
    name : 'ram lohala',
    email: 'lohalaramu@gmail.com',
    password: 'sasa1234'
  }
]

const populateTodos = (done) => {
  Todo.remove({}).then( () => {
    return Todo.insertMany(todos);
  }).then( () => done())

  // User.remove({}).then( () => {
  //   return User.insertMany(users)
  // }).then( () => done())

};

const populateUsers = (done) =>  {
  User.remove({}).then( () => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then( () => done()) ;
};

module.exports = {todos, users, populateUsers, populateTodos};

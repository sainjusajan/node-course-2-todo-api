const expect = require('expect')
const request = require('supertest')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')
const {User} = require('./../models/user')
const {ObjectID} = require('mongodb')

// clearing database before every test
const todos = [
  {
    text: "first todo note"
  },
  {
    text: "second todo note"
  }
];

const users = [
  {
    _id : new ObjectID(),
    name : 'sajan sainju',
    email: 'tsajansainju@gmail.com'
  },
  {
    _id : new ObjectID(),
    name : 'ram lohala',
    email: 'lohalaramu@gmail.com'
  }
]

beforeEach( (done) => {
  Todo.remove({}).then( () => {
    return Todo.insertMany(todos)
  });

  User.remove({}).then( () => {
    return User.insertMany(users)
  }).then( () => done())

})

/*
we are going to
1. create a text and save it to var
2. request server i.e app
3. post request to "/todos"
4. expect the status code to be 200
5. expect the response to have the text equals to our text variable
6. end the async code via done() which can be done after we verify entry in db
     i. access the database via Todo.find({})
     ii. expect the only data in collection to have text equals to our text var
     iii. if not , catch error and call done(e)
*/
describe('POST /todos', () => {
  it('should create a Todo in database', (done) => {
    var text = "Test todo text";
    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect( (res) => {
      expect(res.body.text).toBe(text);
    })
    .end( (err, res) => {
      if(err){
        return done(err)
      }
      Todo.find({text}).then( (todos) => {
        expect(todos.length).toBe(1)
        expect(todos[0].text).toBe(text)
        done();
      }).catch( (e) => done(e))
    });
  });

  it('shouldnt create a Todo with invalid body data', (done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end( (err, res) => {
      if(err){
        return done(err)
      }
      Todo.find({}).then( (todos) => {
        expect(todos.length).toBe(2)
        done();
      }).catch( (e) => done(e))
    });
  });
});

describe('GET /todos', () => {
  it('should get all the todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect( (res) => {
      expect(res.body.todos.length).toBe(2)
    })
    .end(done);
  })
})

describe('GET /users/:id', () => {
  it('should get the specific user', (done) => {
    request(app)
    .get(`/users/${users[0]._id}`)
    .expect(200)
    .expect( (res) => {
      expect(res.body.user.email).toBe(users[0].email);
    })
        .end(done);
  });

  it('should return 404 for non object ID', (done) => {
    request(app)
        .get('/users/123abc')
        .expect(404)
        .end(done)
  })
})

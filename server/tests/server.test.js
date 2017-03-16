const expect = require('expect')
const request = require('supertest')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')
const {User} = require('./../models/user')
const {ObjectID} = require('mongodb')

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
    Todo.insertMany(todos)
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

describe('DELETE /todos/:id', () => {
  it('should delete a specific todo', (done) => {
    var id = todos[0]._id;
    request(app)
        .delete(`/todos/${id}`)
        .expect(200)
        .expect( (res) => {
          expect(res.body.todo.text).toBe(todos[0].text)
        })
        .end(done)
  });

  it('should return 404 for todo not found', (done) => {
    var new_id = new ObjectID();
      request(app)
          .delete(`/todos/${new_id}`)
          .expect(404)
          .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
      request(app)
          .delete('/todos/123abc')
          .expect(404)
          .end(done);
  })
})

describe('PATCH /todos/:id', () => {
  it('should update a todo', (done) => {
    var patch_id = todos[0]._id;
    var new_text = "testing purpose update text"
    request(app)
    .patch(`/todos/${patch_id}`)
    .send({
      text: new_text,
      completed: true
    })
    .expect(200)
    .expect( (res) => {
      expect(res.body.todo.text).toBe(new_text);
      expect(res.body.todo.completed).toBe(true);
      expect(res.body.todo.completedAt).toBeA('number')
    })
    .end(done)
  });

  it('should clear completedAt when todo is not completed', (done) => {
    var patch_id = todos[1]._id;
    var new_text = "testing purpose update text";
    request(app)
    .patch(`/todos/${patch_id}`)
    .send({
      text: new_text,
      completed: false
    })
    .expect(200)
    .expect( (res) => {
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toNotExist();
    })
    .end(done)
  });

  it('should')


})

const expect = require('expect')
const request = require('supertest')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')
const {User} = require('./../models/user')
const {ObjectID} = require('mongodb')

const {todos, users, populateTodos, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);
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

describe('GET /todos/:id', () => {
  it('should get the specific todo', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id}`)
    .expect(200)
    .expect( (res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
        .end(done);
  });

  it('should return 404 for non object ID', (done) => {
    request(app)
        .get('/todos/123abc')
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




})

describe('GET /users/me', () =>  {
  it('should return user if authenticated', (done) => {
    request(app)
    .get('/users/me')
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .expect( (res) => {
      expect(res.body._id).toBe(users[0]._id.toHexString());
      expect(res.body.email).toBe(users[0].email)
    })
    .end(done)
  });

  it('should return a 401 if not authenticated', (done) =>  {
    request(app)
    .get('/users/me')
    .expect(401)
    .expect( (res) => {
      expect(res.body).toEqual({})
    })
    .end(done)
  });
});

describe('POST /users', () => {
  it('should create a user', (done) => {
    var email = 'example@example.com';
    var password = 'password';
    var name = 'exam example'
    request(app)
    .post('/users')
    .send({email, password, name})
    .expect(200)
    .expect( (res) => {
      expect(res.headers['x-auth']).toExist();
      expect(res.body._id).toExist();
      expect(res.body.email).toBe(email)
    })
    .end( (err) =>{
      if (err) {
        return done(err)
      }
      User.findOne({email}).then( (user) => {
        expect(user).toExist();
        expect(user.password).toNotBe(password);
        done();
      })
    })
  });

  it('should return validation errors if request invalid', function(done) {
    var email = 'sajansanepal';
    var name = 'sajan sainju';
    var password = 'helloworld';
    request(app)
    .post('/users')
    .send({email, name, password})
    .expect(400)
    .end(done)
  });

  it('should not create a user if email already used', function(done) {
    done()
    var email = 'tsajansainju@gmail.com';
    var name = 'sajan sainju';
    var password = 'sajansainju';
    request(app)
    .post('/users')
    .send({email, name, password})
    .expect(400)
    .end(done)
  });
});

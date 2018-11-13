const expect = require('expect');
const request = require('supertest');
const { app } = require('./../server')
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');

const { todos, populateTodos, users, populateUsers } = require('./seed/seed');
const { ObjectID } = require('mongodb');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
      var text = 'Test todo text';

      request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err) { return done(err) }

        Todo.find({ text }).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch(e => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err) { return done(err) }

        Todo.find().then(todos => {
          expect(todos.length).toBe(2);

          done();
        }).catch(e => done(e))
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done)
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id}`)
      .expect(200)
      .expect(res => {
        var parsed = JSON.parse(res.body.todo);
        expect(parsed.text).toBe(todos[0].text)
      })
      .end(done);
  });

  it('should return 404 if todo not found', done => {
    request(app)
      .get(`/todos/5bd964535a43c9450cfe5ce0`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', done => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should delete and return todo', done => {
    request(app)
      .delete(`/todos/${todos[1]._id}`)
      .expect(200)
      .expect(res => {
        var parsed = JSON.parse(res.body.todo);
        expect(parsed._id).toEqual(todos[1]._id)
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.findById(todos[1]._id).then(todo => {
          expect(todo).toNotExist();
          done();
        }).catch(e => done(e));
      });
  });

  it('should return 404 if todo not found', done => {
      request(app)
        .delete(`/todos/5bd964535a43c9450cfe5ce0`)
        .expect(404)
        .end(done);
  });
  it('should return 404 if objectID is invalid', (done) => {
      request(app)
        .delete(`/todos/123`)
        .expect(404)
        .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', done => {
    var id = todos[0]._id;
    var text = 'This should work';
    request(app)
      .patch(`/todos/${id}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toEqual(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);

  });

  it('should clear completedAt when todo is not completed', done => {
    var id = todos[1]._id;
    var text = 'This should work!!';
    request(app)
      .patch(`/todos/${id}`)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toEqual(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);
  })
})

describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toEqual(users[0]._id);
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  })

  it('should return a 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({})
      })
      .end(done);
  })
})

describe('POST /users', () => {
  it('should create a user', (done) => {
    var email = 'example@example.com'
    var password = 'abc123'

    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end(done);
  })

  it('should return validation errors if request invalid', done => {
    var email = 'example'
    var password = 'abc123'

    request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      .end(done);
  })

  it('should not create user if email is in use', done => {
    var email = 'day_andy@hotmail.com'
    var password = 'abc123'

    request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      .end(done)
  })
})

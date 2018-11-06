const config = require('./config/config');
const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
const { ObjectID } = require('mongodb');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { authenticate } = require('./middleware/authenticate');

var app = new express();
const PORT = process.env.PORT;

app.use(bodyParser.json())

app.post('/todos', (req, res) => {

  var todo = new Todo({
    text: req.body.text
  })

  todo.save().then((doc) => {
    res.send(doc);
  }, (error) => {
    res.status(400).send(error);
  })
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({ todos })
  }, (error) => {
    res.status(400).send(error)
  })
})

app.get('/todos/:id', (req, res) => {

  if(!ObjectID.isValid(req.params.id)) {
    res.status(404).send();
  }

  Todo.findById(req.params.id).then(todo => {
    if(todo) {
      res.status(200).send({todo: JSON.stringify(todo, undefined, 2)});
    } else {
      res.status(404).send();
    }
  }, e => {
    res.status(400).send();
  })
});

app.delete('/todos/:id', (req, res) => {
  if(!ObjectID.isValid(req.params.id)) {
    res.status(404).send();
  }

  Todo.findByIdAndRemove(req.params.id).then(todo => {
    if(todo) {
      res.status(200).send({todo: JSON.stringify(todo, undefined, 2)})
    } else {
      res.status(404).send();
    }
  }, e => {
    res.status(400).send();
  })
})


app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(req.params.id)) {
    res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {
    $set:body
  }, { new: true}).then(todo => {
    if(!todo) {
    return res.status(404).send();
  }
    res.send({todo});
  }).catch(e => {
    res.status(400).send();
  });
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then(token => {
    res.header('x-auth', token).send(user)
  }).catch(e => res.status(400).send(e))
})


app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = { app };

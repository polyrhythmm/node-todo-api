const express = require('express');
const bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
const { ObjectID } = require('mongodb');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = new express();

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

app.listen(3000, () => {
  console.log('listening');
});

module.exports = { app };

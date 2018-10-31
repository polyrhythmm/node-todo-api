const { MongoClient, ObjectID } = require('mongodb');

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (error, client) => {
  if(error) {
    return console.log('Unable to connect to mongodb server');
  }

  console.log('connected to mongodb server');
  const db = client.db('TodoApp');

  db.collection('todos').insertOne({
    text:'Something to do',
    completed: false
  }, (error, result) => {
    if(error) {
      return console.log('Unable to insert todo', error)
    }

    console.log(JSON.stringify(result.ops, undefined, 2));
  })

  db.collection('users').insertOne({
    name:'Andrew',
    age: 37,
    location:'Docklands'
  }, (error, result) => {
    if(error) {
      return console.log('Unable to create user object');
    }

    console.log(JSON.stringify(result.ops, undefined, 2));
  })

  client.close();
})

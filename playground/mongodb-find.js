const { MongoClient, ObjectID } = require('mongodb');

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (error, client) => {
  if(error) {
    return console.log('Unable to connect to mongodb server');
  }

  console.log('connected to mongodb server');
  const db = client.db('TodoApp');

  // db.collection('Todos').find({ _id: new ObjectID('5bd7e4dda1beee50bc333c3c') }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (error) => {
  //   console.log("Unable to fetch", error);
  // })

  db.collection('Users').find({name:'Andrew'}).toArray().then(docs => {
    console.log(JSON.stringify(docs))
  })

  client.close();
})

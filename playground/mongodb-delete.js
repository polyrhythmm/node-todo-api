const { MongoClient, ObjectID } = require('mongodb');

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (error, client) => {
  if(error) {
    return console.log('Unable to connect to mongodb server');
  }

  console.log('connected to mongodb server');
  const db = client.db('TodoApp');


  db.collection('Users').findOneAndDelete({ _id: new ObjectID('5bd8f0d3be6ea91de80d9bb6')}). then((result) => {
    console.log(result)
  })
  //client.close();
})

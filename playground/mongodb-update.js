const { MongoClient, ObjectID } = require('mongodb');

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (error, client) => {
  if(error) {
    return console.log('Unable to connect to mongodb server');
  }

  console.log('connected to mongodb server');
  const db = client.db('TodoApp');
  //
  // db.collection('Todos').findOneAndUpdate({ _id: new ObjectID('5bd7e4dda1beee50bc333c3c')}, {
  //   $set: { completed: true }
  // }, {
  //   returnOriginal: false
  // }).then(result => {
  //   console.log(result);
  //   client.close();
  // }).catch(error => {
  //   console.log("Error:" + error)
  // });

  db.collection('Users').findOneAndUpdate({ _id: new ObjectID('5bd8f0b2be6ea91de80d9bb5')}, {
    $inc: { age: 1 }
  }, {
    returnOriginal: false
  }).then(result => {
    console.log(result);
    client.close();
  }).catch(error => {
    console.log("Error:" + error)
  });

  //client.close();
})

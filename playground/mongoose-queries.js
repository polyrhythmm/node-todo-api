const { mongoose } = require('./../server/db/mongoose');
const { ObjectID } = require('mongodb');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');
var id = "5bd94b42a5d38686349403ef";


User.findById('5bd95a53ce3ec1368096550c').then(user => {

  // if(!user) {
  //   return console.log('Unable to find user');
  // }

  console.log(JSON.stringify(user, undefined, 2));
});

// User.find().then(users => {
//   console.log(users);
// })

//
// if(!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }
// Todo.find({ _id: id }).then((todos) => {
//   console.log('Todos', todos);
// })
//
// Todo.findOne({ _id: id }).then((todo) => {
//   console.log('Todo', todo);
// })
//
// Todo.findById(id).then(todo => {
//   console.log('Todo by id', todo)
// })
//
// console.log(User.find());
// console.log(User.options.db)
// User.insertMany({
//   name: 'Andrew',
//   age: 37,
//   location:'Docklands'
// }, (error, result) => {
//   console.log(error);
//   console.log(result);
// });
// User.insertOne({
//   name:'Andrew',
//   age: 37,
//   location:'Docklands'
// }, (error, result) => {
//   if(error) {
//     return console.log('Unable to create user object');
//   }
//
//   console.log(JSON.stringify(result.ops, undefined, 2));
// // })
// User.findById(id).then(user => {
//
//   if(!user) {
//     return console.log('Unable to find user');
//   }
//
//   console.log(JSON.stringify(user, undefined, 2));
// });

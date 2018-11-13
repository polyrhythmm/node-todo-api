const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-js');

var password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  })
});

var hashed = '$2a$10$ZqYbW0WZ6ucKnpo0wtaqo.usTBonOsMh7YfAj3HmX97qyqgcf9SIa';

bcrypt.compare(password, hashed, (err, res) => {
  console.log(res);
});
var message = 'I am user';

var hash = SHA256(message).toString();

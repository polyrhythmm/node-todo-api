const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

var message = 'I am user';

var hash = SHA256(message).toString();

console.log(`Message: ${message}`)
console.log(`Hash: ${hash}`)

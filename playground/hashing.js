const {SHA256} = require('crypto-js')
const bcrypt = require('bcryptjs');

// var message = "i am user number 3"
//
// var hash = SHA256(message).toString()
//
// console.log(`Message: ${message}`);
//
// console.log(`Hash: ${hash}`);

var password = "sasa123";

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  })
})


var hashedPassword = '$2a$10$g3Z/jVe43sSHorbDVHUcRurqkyd/RyusRfAHjwnouTgZawtCYb2A2';

bcrypt.compare(hashedPassword, hashedPassword, (err, res) =>{
  console.log(res);
})

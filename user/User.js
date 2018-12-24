var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  fname: String,
  lname: String,
  email: String,
  password: String,
  pnumber: String,

});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
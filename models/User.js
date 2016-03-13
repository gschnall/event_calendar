var 
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs')
  Schema = mongoose.Schema

var userSchema = new Schema({
  local: {
    name: String,
    email: String,
    password: String,
    events:[]
  },
  facebook: {
    id: String,
    name: String,
    token: String,
    email: String
  }
})
  
// Generate password
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(9))
}
// Validate Password
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password)
}

var User = mongoose.model("User", userSchema)

module.exports = User

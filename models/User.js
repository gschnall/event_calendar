var 
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  Schema = mongoose.Schema

var userSchema = new Schema({
  local: {
    name: String,
    email: String,
    city: String,
    zipcode: String,
    password: String,
    genre: String,
    events:[{type: Schema.Types.ObjectId, ref: "Event"}]
  },
  facebook: {
    id: String,
    name: String,
    email: String,
    city: String,
    zipcode: String,
    token: String,
    genre: String,
    events:[{type: Schema.Types.ObjectId, ref: "Event"}]
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

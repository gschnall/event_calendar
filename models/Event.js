var mongoose = require('mongoose')
var Schema = mongoose.Schema

var eventSchema = Schema({
  title: String,
  description: String,
  date: String,
  start: String,
  end: String,
  venu_type: String,
  address: String,
  city: String,
  postal_code: String,
  longitude: Number,
  latitude: Number,
  price: String,
  free: Boolean,
  image: String,
  favorite: Boolean,
  users:[{type: Schema.Types.ObjectId, ref: "User"}]
})

var Event = mongoose.model('Event', eventSchema)

module.exports = Event

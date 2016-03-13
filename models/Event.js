var mongoose = require('mongoose')
var Schema = mongoose.Schema


var eventSchema = Schema({
  title: String,
  description: String,
  date: String,
  start_time: String,
  end_time: String,
  venu_type: String,
  address: String,
  city: String,
  postal_code: String,
  longitude: Number,
  latitude: Number,
  price: String,
  free: Boolean,
  image: String,
  users:[]
})

var Event = mongoose.model('Event', eventSchema)

module.exports = Event

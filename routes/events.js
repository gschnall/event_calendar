// ALL EVENT RELATED ROUTES GO HERE
var
  express = require('express')
  eventRouter = express.Router()

// Main Event Route - Find Events
eventRouter.get('/search', function(req, res){
  res.send('<h1>PlaceHolder for Search Events View</h1>')
})

// Single-Event-View Route
// View a Single Event on a Users Calendar
eventRouter.get('/:id', function(req, res){
  res.send('<h1>PlaceHolder for Single Event View</h1>')
})

module.exports = eventRouter

// ALL EVENT RELATED ROUTES GO HERE
var
  express = require('express'),
  eventRouter = express.Router(),
  eventful = require('eventful-node')

// Main Event Route - Find Events
eventRouter.post('/search', function(req, res){
  var userLocation = req.body.location
  var userDate = req.body.date
  var userKeyword = req.body.keyword
  console.log(userKeyword)
  var client = new eventful.Client(process.env.EVENTFUL_KEY)
  client.searchEvents({location:userLocation , date:userDate, page_size:3, keywords:userKeyword}, function(err,data){
    if(err){
      return console.log(err);
    }
    console.log('Recieved ' + data.search.total_items + ' events');
    var eventArr = []
    for(var i in data.search.events.event){
      var evt = data.search.events.event[i]
      eventArr.push({image: evt.image.url, title:evt.title, venue: evt.venue_name, startTime:evt.start_time, endTime:evt.stop_time, description:evt.description})
  }
    res.json(eventArr)
  })
})

// Single-Event-View Route
// View a Single Event on a Users Calendar
eventRouter.get('/:id', function(req, res){
  res.send('<h1>PlaceHolder for Single Event View</h1>')
})

module.exports = eventRouter

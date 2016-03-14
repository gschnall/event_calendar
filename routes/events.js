// ALL EVENT RELATED ROUTES GO HERE
var
  express = require('express'),
  eventRouter = express.Router(),
  eventful = require('eventful-node')

// Main Event Route - Find Events
eventRouter.post('/search', function(req, res){
  var userLocation = req.body.location
  var userDate = req.body.date
  userDate += '00'
  userDate = userDate.replace(/-/g, "")
  userDate += '-' + userDate
  console.log(userDate)
  var client = new eventful.Client(process.env.EVENTFUL_KEY)
  client.searchEvents({location:userLocation, date:userDate, page_size:5}, function(err,data){
    if(err){
      return console.log(err);
    }
    console.log('Recieved ' + data.search.total_items + ' events');
    res.json({title: data.search.events.event[4].title, date:data.search.events.event[4].start_time})
    // console.log(data.search.events.event.length);
  //   for(var i in data.search.events.event){
  //     res.json({event: data.search.events.event[i].title})
  // }
  })
})

// Single-Event-View Route
// View a Single Event on a Users Calendar
eventRouter.get('/:id', function(req, res){
  res.send('<h1>PlaceHolder for Single Event View</h1>')
})

module.exports = eventRouter

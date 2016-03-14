// ALL EVENT RELATED ROUTES GO HERE
var
  express = require('express'),
  eventRouter = express.Router(),
  eventful = require('eventful-node')

// Main Event Route - Find Events
eventRouter.get('/search', function(req, res){
  var client = new eventful.Client(process.env.EVENTFUL_KEY)
  client.searchEvents({location:'Los Angeles', page_size:15}, function(err,data){
    if(err){
      return console.log(err);
    }
    console.log('Recieved ' + data.search.total_items + ' events');
    console.log(data.search.events.event.length);
    for(var i in data.search.events.event){
      if (data.search.events.event[i].city_name ==='Los Angeles'){
        console.log(data.search.events.event[i])
      } else {
        console.log('no')
      }
  }


  })
  res.send('<h1>PlaceHolder for Search Events View</h1>')
})

// Single-Event-View Route
// View a Single Event on a Users Calendar
eventRouter.get('/:id', function(req, res){
  res.send('<h1>PlaceHolder for Single Event View</h1>')
})

module.exports = eventRouter

// ALL EVENT RELATED ROUTES GO HERE
var
  express = require('express'),
  eventRouter = express.Router(),
  eventful = require('eventful-node'),
  yelp = require('../config/yelp.js'),
  moment = require('../public/js/lib/moment.min.js'),
  seatgeek = require('../config/seatgeek.js'),
  request = require('request')

// Main Event Route - Find Events
eventRouter.post('/search', function(req, res){
  var userLocation = req.body.location
  var userDate = req.body.date
  var userKeyword = req.body.keyword.toLowerCase()
  var client = new eventful.Client(process.env.EVENTFUL_KEY)
  console.log(userDate)

  var seatgeekUrl= "https://api.stubhub.com/search/catalog/events/v2"
  // https://api.seatgeek.com/2/venues
  //
	request({url: seatgeekUrl, json: true}, function(error, response, body){
    console.log(body)
		res.send(body)
	})

/*<---------------Logic for Search(Yelp vs. Eventful)------------------------->*/
  // if(userKeyword === 'restaurant' || userKeyword === 'restaurants' || userKeyword ==='bar' || userKeyword ==='bars' || userKeyword ==='drink' || userKeyword ==='drinks' || userKeyword ==='food'){
  //   ////////////YELP API SEARCH////////////////////////////////////
  //   yelp.search({ term: userKeyword, location: userLocation, limit:9})
  //   .then(function (data) {
  //     var yelpArr = []
  //     for(var i in data.businesses){
  //       console.log(data.businesses[i].name)
  //       console.log(userDate)
  //       var evtYelp = data.businesses[i]
  //       yelpArr.push({image: evtYelp.image_url, venue: evtYelp.rating, title: evtYelp.name, address: evtYelp.location.display_address, description:evtYelp.snippet_text})
  //     }
  //     res.json(query.shuffleArr(yelpArr))
  //   })
  //   .catch(function (err) {
  //     console.error(err);
  //   });
  // } else {
  //     ////////////////EVENTFUL API SEARCH//////////////////////////////////////
  //     client.searchEvents({location:userLocation , date:userDate, page_size:9, keywords:userKeyword}, function(err,data){
  //       if(err){
  //         return console.log(err);
  //       }
  //       var eventArr = []
  //       for(var i in data.search.events.event){
  //         console.log( data.search.events.event[i].venue_name)
  //         var evt = data.search.events.event[i]
  //
  //         if(evt.image){
  //           eventArr.push({image: evt.image.medium.url,title:evt.title, venue: evt.venue_name, address: evt.venue_address, startTime:evt.start_time, endTime:evt.stop_time, description:evt.description})
  //         }
  //         eventArr.push({title:evt.title, venue: evt.venue_name, address: evt.venue_address, startTime:evt.start_time, endTime:evt.stop_time, description:evt.description})
  //     }
  //       res.json(query.shuffleArr(eventArr))
  //     })
  //   }
})

var query = {
//Shuffles Array of Events
  shuffleArr: function (array) {
   var m = array.length, t, i;
   while (m) {
     i = Math.floor(Math.random() * m--);
     t = array[m];
     array[m] = array[i];
     array[i] = t;
   }
   return array;
  }
}



// Single-Event-View Route
// View a Single Event on a Users Calendar
eventRouter.get('/:id', function(req, res){
  res.send('<h1>PlaceHolder for Single Event View</h1>')
})

module.exports = eventRouter

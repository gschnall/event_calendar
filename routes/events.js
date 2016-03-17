// ALL EVENT RELATED ROUTES GO HERE
var
  express = require('express'),
  eventRouter = express.Router(),
  eventful = require('eventful-node'),
  yelp = require('../config/yelp.js'),
  moment = require('../public/js/lib/moment.min.js'),
  seatgeek = require('../config/seatgeek.js'),
  request = require('request')
  // soundCloud = require('../public/js/soundcloud.js')

// Main Event Route - Find Events
eventRouter.post('/search', function(req, res){
  var userLocation = req.body.location
  var userDate = req.body.date
  var userKeyword = req.body.keyword.toLowerCase()
  var client = new eventful.Client(process.env.EVENTFUL_KEY)

/*<---------------Logic for Search(Yelp vs. SeatGeek vs. Eventful )---------------------->*/
  if(userKeyword === 'restaurant' || userKeyword === 'restaurants' || userKeyword ==='bar' || userKeyword ==='bars' || userKeyword ==='drink' || userKeyword ==='drinks' || userKeyword ==='food'){
  //////////////YELP API SEARCH////////////////////////////////////

    yelp.search({ term: userKeyword, location: userLocation, limit:20})
    .then(function (data) {
      var yelpArr = []
      for(var i in data.businesses){
        // console.log(data.businesses[i].name)
        // console.log(userDate)
        var evtYelp = data.businesses[i]
        yelpArr.push({image: evtYelp.image_url, venue: evtYelp.rating, title: evtYelp.name, address: evtYelp.location.address[0] + ' '+ evtYelp.location.city + ' ' +  evtYelp.location.state_code + ', ' + evtYelp.location.postal_code , description:evtYelp.snippet_text})
      }
      res.json(query.shuffleArr(yelpArr))
    })
    .catch(function (err) {
      console.error(err);
    });
  } else if(userKeyword === 'sports' || userKeyword === 'sport') {
      var newDate = userDate.split("/")
      var finalDate = newDate[2] + "-" + newDate[0] + "-" + newDate[1]
  //////////////////////SEATGEEK API////////////////////////////////
      var seatgeekUrl= "https://api.seatgeek.com/2/events?venue.city="+ userLocation + "&taxonomies.name=sports&datetime_utc.gt=" + finalDate + ""
      request({url: seatgeekUrl, json: true}, function(error, response, body){
        var events = body.events
        var seatArr = []
        for(i=0;i<events.length;i++){
          var evtSeat = events[i]
            seatArr.push({image:"", venue: evtSeat.venue.name, title: evtSeat.title, address: evtSeat.venue.address + ' ' + evtSeat.venue.city + ', ' + evtSeat.venue.state + ' ' + evtSeat.venue.postal_code, startTime:evtSeat.datetime_local, description: "", tickets:evtSeat.url})
            ///SOUNDCLOUD API REQUEST
            // console.log(evtSeat.performers[0].name)
            }
            res.json(query.shuffleArr(seatArr))
          })
  } else if (userKeyword === 'music' || userKeyword === 'concerts'){
      var newDate = userDate.split("/")
      var finalDate = newDate[2] + "-" + newDate[0] + "-" + newDate[1]
  //////////////////////SEATGEEK API////////////////////////////////
      var seatgeekUrl= "https://api.seatgeek.com/2/events?venue.city="+ userLocation + "&taxonomies.name=concert&datetime_utc.gt=" + finalDate + ""
      request({url: seatgeekUrl, json: true}, function(error, response, body){
        var events = body.events

        var seatArr = []
        for(i=0;i<events.length;i++){

          var evtSeat = events[i]
          console.log(evtSeat.performers)
          // console.log(evtSeat.performers[0].short_name)
            seatArr.push({image:"", venue: evtSeat.venue.name, title: evtSeat.title, address: evtSeat.venue.address + ' ' + evtSeat.venue.city + ', ' + evtSeat.venue.state + ' ' + evtSeat.venue.postal_code, startTime:evtSeat.datetime_local, description: "", tickets:evtSeat.url, performer:evtSeat.performers[0].name })


            }
            res.json(query.shuffleArr(seatArr))
          })
  }else{
  //////////////////EVENTFUL API SEARCH//////////////////////////////////////
      client.searchEvents({location:userLocation , date:userDate, page_size:50, keywords:userKeyword}, function(err,data){
        if(err){
          return console.log(err);
        }
        var eventArr = []
        for(var i in data.search.events.event){
          // console.log( data.search.events.event[i])
          var evt = data.search.events.event[i]
          if(evt.image){
            eventArr.push({image: evt.image.medium.url,title:evt.title, venue: evt.venue_name, address: evt.venue_address + ' ' + evt.city_name + ', ' + evt.region_abbr + ' ' + evt.postal_code, startTime:evt.start_time, endTime:evt.stop_time, description:evt.description})
          }
          eventArr.push({title:evt.title, venue: evt.venue_name, address: evt.venue_address, startTime:evt.start_time, endTime:evt.stop_time, description:evt.description})
      }
        res.json(query.shuffleArr(eventArr))
      })
    }
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

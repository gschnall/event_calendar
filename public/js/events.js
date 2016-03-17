$(function(){

  var events = {
    populateEvents: function(data){
      data.forEach(function(el, index){
        //Only returns 3 results
        if(index>2){return}
        var data = el
        //Format Dates and Times of the events
        var startTime = moment(data.startTime).format('MMMM Do YYYY, h:mm a')
        var endTime = moment(data.endTime).format('MMMM Do YYYY, h:mm a')
        //html to create Event Boxes
        var $divContainer = $('<div class="col-sm-6 col-md-4"></div>')
        var $divThumbnail = $('<div class ="thumbnail"></div>')
        var $icons = $('<i class="fa fa-calendar-plus-o fa-2x pull-right"></i>')
        var $eventTitle = $('<div class="caption"><h2>'+ data.title +'</h2></div>')
        var $startTime = $('<h5 class="start-time">'+ startTime +'</h5>')
        var $endTime = $('<h5 class="end-time">'+ endTime +'</h5>')
        var $address = $('<address class="address">'+ data.address +'</address>')
        var $venue = $('<h4 class="venue">'+ data.venue +'</h4>')
        var $eventDescription = $('<h4 class="description">'+ data.description + '</h4>')
        var $tickets = $('<a href=' + data.tickets + ' <i class="fa fa-ticket fa-4x"></i></a><br><h4>Buy Tickets</h4>')
        var $soundPlayer = $('<iframe id="'+ data.performer  +  ' "class="players" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/76067623&amp;auto_play=false&amp;hide_related=true&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>')

        // Append html tags to div before populating page
        $divThumbnail.append($icons).append($eventTitle)
        // If image exists append it to the div
        if(data.image){
          var $imgSrc = $('<img src='+ data.image + '>')
          $divThumbnail.append($imgSrc)
        }
        $divThumbnail.append($venue)
        if(data.address){
          $divThumbnail.append($address)
        }
        $divThumbnail.append($startTime)
        if(data.endTime){
          $divThumbnail.append($endTime)
        }

        // if()

        if(data.tickets){
          $divThumbnail.append($tickets)
        }

        if(data.performer){
          $divThumbnail.append($soundPlayer)
        }

        $divThumbnail.append($eventDescription)
        $divContainer.append($divThumbnail)
        //For each event in the array, append it to the event container to populate page with 5 results
        $('#event-container').append($divContainer)
        // soundCloud.playTune(data.performer)
      })
      }
    }

// Click event for Search Events button -- populates page with three results
  $('#start-search').on('click', function(){
    $.ajax({
      method:'POST',
      url:'/events/search',
      contentType:'application/json',
      dataType:'json',
      data:JSON.stringify({location:$('#location').val(), date:$('#date').val(), keyword:$('#event-text').val()})
    })
    .done(function(data){
      $('#event-container').html("")
      events.populateEvents(data)
      console.log(data)
      $('iframe').each(function(e){
          var artist = $(this).attr('id')
          soundCloud.playTune(artist,e)
      })
      $("address").each(function(){
        var embed ="<iframe width='425' height='350' frameborder='0' scrolling='no'  marginheight='0' marginwidth='0'   src='https://maps.google.com/maps?&amp;q="+ encodeURIComponent( $(this).text() ) +"&amp;output=embed'></iframe>";
        $(this).html(embed);
     });
    })
  })

// Logic for search calendar
  $("#date").datepicker({
    inline: true,
    showOtherMonths: true,
    dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  });

// Puts event text from dropdown in event input box
  $('.event-type').on('click', function(evt){
    $('#event-text').html("")
    $('#event-text').val($(evt.target).html())
  })

// Adds event to user's calendar on click
  $('body').on('click', '.fa-calendar-plus-o', function(){
    console.log('clicked')
    var $calendarChecked = $(this)
    var description = ($(this).parent().children('.description').text())
    var venue = ($(this).parent().children('.venue').text())
    var address = ($(this).parent().children('.address').text())
    var start = ($(this).parent().children('.start-time').text())
    var end = ($(this).parent().children('.end-time').text())
    var title = ($(this).parent().children('.caption').text())
    var startArr = moment(start.replace('th', '').replace('st','').replace('rd', '').replace('nd', '')).format().split('-')
    var formatStart = startArr[0] + '-' + startArr[1] + '-' + startArr[2]

      $.ajax({
        method:"POST",
        url:"/addEvent",
        contentType:"application/json",
        dataType:"json",
        data:JSON.stringify(
          {
            description:description,
            venu_type:venue,
            address:address,
            start:formatStart,
            end:end,
            title:title
          })
        })
        .done(function(data){
          $calendarChecked.toggleClass("fa-calendar-check-o")
          console.log(data)
        })
        .fail(function(){
          console.log(start)
          console.log(formatStart)
          window.location.replace('/signup');
        })

    })
////////END
})

$(function(){

  var events = {
    populateEvents: function(data){
      console.log(data)
      data.forEach(function(el){
        var data = el
        console.log(data)
        //Format Dates and Times of the events
        var startTime = moment(data.startTime).format('MMMM Do YYYY, h:mm a')
        var endTime = moment(data.endTime).format('MMMM Do YYYY, h:mm a')
        //html to create Event Boxes
        var $divContainer = $('<div class="col-sm-6 col-md-4"></div>')
        var $divThumbnail = $('<div class ="thumbnail"></div>')
        var $eventTitle = $('<div class="caption"><h2>'+ data.title +'</h2></div>')
        var $startTime = $('<h5>'+ startTime +'</h4>')
        var $endTime = $('<h5>'+ endTime +'</h4>')
        var $eventDescription = $('<h4>'+data.venue +'</h4><p>'+'<br>'+data.description+'</p>')
        // Append html tags to div before populating page
        $divThumbnail.append($eventTitle)
        // If image exists append it to the div
        if(data.image){
          var $imgSrc = $('<img src='+ data.image + '>')
          $divThumbnail.append($imgSrc)
        }
        $divThumbnail.append($startTime)
        if(data.endTime){
          $divThumbnail.append($endTime)
        }
        $divThumbnail.append($eventDescription)
        $divContainer.append($divThumbnail)
        //For each event in the array, append it to the event container to populate page with 5 results
        $('#event-container').append($divContainer)
      })//for each end
      }
    }


  $('#start-search').on('click', function(evt){
    $.ajax({
      method:'POST',
      url:'/events/search',
      contentType:'application/json',
      dataType:'json',
      data:JSON.stringify({location:$('#location').val(), date:$('#date').val()})
    })
    .done(function(data){
      $('#event-container').html("")
      events.populateEvents(data)

    })
  })

// Logic for search calendar
  $("#date").datepicker({
    inline: true,
            showOtherMonths: true,
            dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  });

////////END
})

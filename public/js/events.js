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
        var $divThumbnail = $('<button class="btn thumbnail" type="button" id="thumb-'+ index +'"></button>')
        var $icons = $('<i class="fa fa-calendar-plus-o fa-2x pull-right"></i>')
        var $divBox = $('<div class="collapse divBox" id="'+ index +'"></div>')
        var $divDetails = $('<div class="well"></div>')
        var $eventTitle = $('<h2 class="caption">'+ data.title +'</h2>')
        var $startTime = $('<p class="start-time">'+ startTime +'</p>')
        var $endTime = $('<p class="end-time">'+ endTime +'</p>')
        if(data.address.indexOf(',') === -1){
          data.address = data.address + ', ' + $('#location').val()
        }
        var $address = $('<address class="address">'+ data.address +'</address>')
        var $venue = $('<h3 class="venue">'+ data.venue +'</h3>')
        var $eventDescription = $('<hr><h3>Description</h3><p class="description">'+ data.description + '</p><hr>')
        var $tickets = $('<a target="_blank" href=' + data.tickets + ' <i class="fa fa-ticket fa-4x"></i></a><br><h4>Buy Tickets</h4>')
        var $soundPlayer = $('<iframe id="'+ data.performer  +  ' "class="players" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/76067623&amp;auto_play=false&amp;hide_related=true&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>')

        // Append html tags to div before populating page

        $divThumbnail.append($eventTitle)
        // If image exists append it to the div
        if(data.image){
          var $imgSrc = $('<img src='+ data.image + '>')
          $divDetails.append($imgSrc)
        }

        $divDetails.append($venue)

        $divDetails.append($startTime)
        if(data.endTime){
          $divDetails.append($endTime)
        }

        if(data.tickets){
          $divDetails.append($tickets)
        }
        if(data.address){

          $divDetails.append($address)
        }

        if(data.performer){
          $divDetails.append($soundPlayer)
        }

        $divDetails.append($eventDescription)
        $divBox.append($divDetails)

        $divDetails.append($icons)
        $divContainer.append($divThumbnail)
        $divContainer.append($divBox)
        //For each event in the array, append it to the event container to populate page with 5 results

        $('#event-container').append($divContainer)

      })
    },
    noResults: function(data){
      console.log(data)
      if(String(data)==[]){
        console.log(data)
        var $noResult = $('<h1 id="no-results"><i class="fa fa-frown-o fa-3x"></i> No Results Found.... I cannot belib dat</h1>')
        $('#event-container').append($noResult)
      }
    }
  }

    $('body').on('click', '.thumbnail', function(evt){
        var thumb = $(this).attr('id').split('-')
        var thumbIndex = thumb[1]
        detailIndex = thumbIndex
        $('#' + detailIndex).slideToggle( "slow", function() {
          console.log('slide')
        });
    })

// Click event for Search Events button -- populates page with three results
  $('#start-search').on('click', function(){
    // LOADING GIF
    var $this = $(this);
    $this.button('loading');
    $.ajax({
      method:'POST',
      url:'/events/search',
      contentType:'application/json',
      dataType:'json',
      data:JSON.stringify({location:$('#location').val(), date:$('#date').val(), keyword:$('#event-text').val()})
    })
    .done(function(data){
      $('#event-container').html("")
      events.noResults(data)
      events.populateEvents(data)
      $('iframe').each(function(e){
          var artist = $(this).attr('id')
          soundCloud.playTune(artist,e)
      })
      $("address").each(function(){
        var embed ="<iframe width='425' height='350' frameborder='0' scrolling='no'  marginheight='0' marginwidth='0'   src='https://maps.google.com/maps?&amp;q="+ encodeURIComponent( $(this).text() ) +"&amp;output=embed'></iframe>";
        $(this).html(embed);
     });
     // REMOVE LOADING GIF
     $this.button('reset')
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
    var $calendarChecked = $(this)
    var thumbNum = $calendarChecked.parent().parent().attr('id')
    var $correctDiv = $('#thumb-'+ thumbNum)
    var title = $correctDiv.text()
    var description = ($(this).parent().children('.description').text())
    var venue = ($(this).parent().children('.venue').text())
    var address = ($(this).parent().children('address'))
    var addressFrame = address[0].innerHTML
    var start = ($(this).parent().children('.start-time').text())
    var end = ($(this).parent().children('.end-time').text())
    // var title = ($('.caption').text())

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
            address:addressFrame,
            start:formatStart,
            end:end,
            title:title
          })
        })
        .done(function(data){
          $calendarChecked.toggleClass("fa-calendar-check-o")
        })
        .fail(function(){
          window.location.replace('/signup');
        })

    })
////////END
})

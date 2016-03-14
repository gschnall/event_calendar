$(function(){

  var events = {
    populateEvents: function(data){
      var data = data[0]
      console.log(data)
      var $divContainer = $('<div class="col-sm-6 col-md-4"></div>')
      var $divThumbnail = $('<div class ="thumbnail"></div>')
      var $imgSrc = $('<img src="" alt="">')
      var $eventTitle = $('<div class="caption"><h3>'+ data.title +'</h3></div>')
      var $eventDescription = $('<p></p>')
      $divThumbnail.append($imgSrc).append($eventTitle)
      $eventTitle.append($eventDescription)
      $divContainer.append($divThumbnail)
      return $divContainer
    }
  }


  $('#start-search').on('click', function(){
    console.log($('#location').val())
    $.ajax({
      method:'POST',
      url:'/events/search',
      contentType:'application/json',
      dataType:'json',
      data:JSON.stringify({location:$('#location').val(), date:$('#date').val()})
    })
    .done(function(data){
      $('#event-container').html("")
      $('#event-container').html(events.populateEvents(data))
      console.log(data)

    })
  })

////////END
})

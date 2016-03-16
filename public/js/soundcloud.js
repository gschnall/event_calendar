  var soundCloud = {
    playTune: function(userArtist){
      var widget = SC.Widget(document.getElementById(userArtist))

      // console.log('submitted')
      // playerUrl is what's getting searched on the back-end and were adding this variable we made to give us a track through sound cloud
      var playerUrl = "https://api.soundcloud.com/tracks?client_id=030341538cff3ba796885fa35911cb51&q="+ userArtist + ""
      $.ajax({
        url: playerUrl,
        method: "GET",
        contentType: 'application/json',
        data: JSON.stringify({artist: userArtist})
      })
        .done(function(data){
          // console.log(data)
          var widget = SC.Widget(document.getElementById(userArtist))
          // get the first song in the widget when we search an artist or track
          var widgetUrl = data[0].uri
          // play this song
          widget.load(widgetUrl)
        })
      }
    }

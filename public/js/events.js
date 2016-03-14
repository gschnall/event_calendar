$(function(){
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
      console.log(data)
    })
  })


////////END
})

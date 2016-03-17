$(document).ready(function() {

 var profile = {
   userEvents: [],
   init: function(){
     $.ajax({
       url: '/calendar/events',
       method: 'GET'
     })
      .done(function(data){
        profile.setupCal(data.userEvents)
      })
   },
   patchEventTime: function(event, delta, thisView){
    var endTime = false
    if(event.end){ endTime = event.end.format() }
    $.ajax({
       url: '/calendar/events',
       type: 'PATCH',
       dataType: 'json',
       contentType: 'application/json',
       data: JSON.stringify({eventId: event._id, eventStart: event.start.format(), eventStop: endTime})
     })
      .done(function(data){
        event.backgroundColor = 'green';
        $('#calendar').fullCalendar( 'rerenderEvents' );
        //console.log(data)
      })
   },
   setupCal: function(events){
      $('#calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        eventBorderColor: "black",
        editable: true,
        dragRevertDuration: 0,
        events: events,
        eventResize: function(event, delta){
          //alert(event.start.format())
          profile.patchEventTime(event, delta, $(this))
        },
        eventDrop: function(event, delta){
          //alert(event.title + " was dropped on " + event.start.format())
          profile.patchEventTime(event, delta, $(this))
        },
        eventDragStart: function( event, jsEvent){
          $('#trash').css('background-color', "gold")
        },
        eventDragStop: function(event,jsEvent) {
          var trashEl = jQuery('#trash');
          var ofs = trashEl.offset();
          var x1 = ofs.left;
          var x2 = ofs.left + trashEl.outerWidth(true);
          var y1 = ofs.top;
          var y2 = ofs.top + trashEl.outerHeight(true);
          var explode_audio = new Audio("../public/images/explosion.mp3")
          $('#trash').css('background-color', "white")
          if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
            jsEvent.pageY>= y1 && jsEvent.pageY <= y2) {
              explode_audio.play()
              console.log("Trashed!")
              $('#calendar').fullCalendar('removeEvents', event._id);
              $.ajax({
                 url: '/calendar/events',
                 type: 'DELETE',
                 dataType: 'json',
                 contentType: 'application/json',
                 data: JSON.stringify({eventId: event._id})
               })
                .done(function(data){
                  console.log(data)
               })
          }
        },
        droppable: true, // this allows things to be dropped onto the calendar
        drop: function(target, thing) {
          // is the "remove after drop" checkbox checked?
          if ($('#drop-remove').is(':checked')) {
            // if so, remove the element from the "Draggable Events" list
            $(this).remove();
          }
        },
        eventClick:  function(event, jsEvent, view) { // -MODAL CLICK FUNCTION
            $('#modalTitle').html("");
            $('#modalTitle').html(event.title);
            $('#modalBody').html(event.description);
            $('#modalBody').append(event.address);
            // $('#eventUrl').attr('href',event.url);
            $('#fullCalModal').modal();
        },
        dayClick: function(date, jsEvent, view) {
          var title = prompt('Event Title:');
          if (title) {
            $('#calendar').fullCalendar('renderEvent',
            {
                title: title,
                start: date.format(),
                color: "green"
            },
            true // make the event showup on cal
            );
            $.ajax({
              method: 'POST',
              url:'/addEvent',
              contentType:"application/json",
              dataType:"json",
              data:JSON.stringify({
                title: title,
                start: date.format(),
              })
            })
            .done(function(){
              console.log("posted")
            })
          }
        }
  })
 }
}

  //Initialize Profile Calendar
  profile.init()

  // Destroy/Trash Event Event
  $("#trash").droppable({
    drop: function(event, ui){
      alert('dropping')
      //$(this).css()
      console.log("Drop it like it's hot")
      console.log($(this))
    }
  })


	/* initialize the external events
	-----------------------------------------------------------------*/
	$('#external-events .fc-event').each(function() {

		// store data so the calendar knows to render an event upon drop
		$(this).data('event', {
			title: $.trim($(this).text()), // use the element's text as the event title
			stick: true // maintain when user navigates (see docs on the renderEvent method)
		});

		// make the event draggable using jQuery UI
		$(this).draggable({
			zIndex: 999,
			revert: true,      // will cause the event to go back to its
			revertDuration: 0  //  original position after the drag
		});

	});


	/* initialize the calendar
	-----------------------------------------------------------------*/


});

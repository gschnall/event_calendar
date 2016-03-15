$(document).ready(function() {

  var profile = {
   userEvents: [],
   init: function(){
     $.ajax({
       url: '/calendar/events',
       method: 'GET'
     })
      .done(function(data){
        console.log(data.userEvents)
        profile.setupCal(data.userEvents)
      })
   },
   setupCal: function(events){
     console.log(events)
      $('#calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        editable: true,
        events: events,
        droppable: true, // this allows things to be dropped onto the calendar
        drop: function(target, thing) {
          // is the "remove after drop" checkbox checked?
          if ($('#drop-remove').is(':checked')) {
            // if so, remove the element from the "Draggable Events" list
            $(this).remove();
          }
        },
        eventClick:  function(event, jsEvent, view) { // -MODAL CLICK FUNCTION
          console.log(event)
          console.log(event._id)
            $('#modalTitle').html(event.title);
            $('#modalBody').html(event.address);
            $('#eventUrl').attr('href',event.url);
            $('#fullCalModal').modal();
        }
      });
    }
//End Profile obj
  }
  //Initialize Profile Calendar
  profile.init()


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

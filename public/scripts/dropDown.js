$(document).ready(function (){

  $(".compose").click( function(event) {
    event.preventDefault();
    console.log('test');
    $("#post-new-tweet").toggleClass("#post-new-tweet .open");
  });

});
var database = firebase.database();
// var db = firebase.firestore()
var leden = db.collection("leden").doc("2WZA7jq9QM4YfaQfzmVg")
var events = db.collection("events").doc("w53rEPYliAS9TeEZWmne")

var $name = $('#name');
var $sub = $('#sub')
var colors = ['#daf7a6', '#ffc300', '#ff5733', '#c70039', '#900c3f', '#581845','#900c3f','#c70039','#ff5733','#ffc300','#daf7a6'];
var mcolors = ['white', 'white']
var mborder = ['none', '1 px solid #daf7a6']
var newC = '';
var i =0;
$('[id^="a_"]').on("click", function(){
  // $('.show').fadeOut()

  $('.show').attr("class", "hide");
  $("#" + $(this).attr("id").substr(2)).attr("class", "show")
  // $("#" + $(this).attr("id").substr(2)).fadeIn();

  $("#hero").css("height", "30%");
  // $("#content").css("height", "70%");
});
$("#a_aanmelden").on('click', function(){$('#naam').focus()})
for(var i=0; i<$name.text().length; i++){
  var sub = $name.text().substr(i, 1);
  if(sub != ' '){
    newC += '<span>' + sub + '</span>'
  }
  else{ newC += '<span>' + '&nbsp' + '</span>'}
}
$name.html(newC);


var $spans = $name.find('span');

     var spanCounter = 0;
     var spanDelay = 10;

     // Loop through all spans and activate
     $spans.each(function(index) {
       var $span = $(this);

       // Trigger a timeout so each span is offset
       setTimeout(function() {
         $span.toggleClass('active');
         $span.css('color', mcolors[Math.floor(index/7)]);
         $span.css('border-bottom', mborder[Math.floor(index/7)]);
       }, (spanCounter * spanDelay));

       spanCounter++;
     });

$('#buttons h1').delay(600).each(function(index){
  $(this).delay(60* index). fadeIn('slow');
});
var currentUser;
function login(){
  var input = $('#naam').val()
  leden.get().then(function(doc){
    console.log(doc.data());
    var stam = doc.data().stam;
    for(var i in stam){
      if(stam[i].toLowerCase() == input.toLowerCase()){
        currentUser = stam[i];
        $("#loginDiv").hide();
        $("#eventManager").show();
        $("#currentUser").html(currentUser);
        events.get().then(function(doc){
          var list = doc.data();
          console.log(list);
          for(var j in list){
            console.log(list[j]);
            var tijd = list[j][0];
            var id = tijd.seconds;
            tijd = new Date(tijd.seconds*1000);
            tijd = tijd.getDate() + '-' + tijd.getMonth()+ '-' + (tijd.getYear()+1900) +" " +(tijd.getHours()<10?'0':'') + tijd.getHours()+ ":" + (tijd.getMinutes()<10?'0':'') + tijd.getMinutes()
            var naam = list[j][1];
            var org = list[j][2];
            var aanwezig = list[j][3];
            var classname = 'event'
            if(aanwezig.indexOf(currentUser) != -1){
              classname += ' clicked'
            }
            console.log(tijd);
            var append = '<div class="${classname}" id="${id}" style="display:none"><h2>${naam}</h2><h3>${tijd}</h3><h3>${org}</h3></div>'
            $('#eventList').append('<div class="'+ classname +  '" id="'+id + '" style="display: none"><h2>' +  naam + "</h2>"+"<h3>" + tijd + "</h3><h3>" + org + "</h3></div>");
            $('.event').delay(100).fadeIn(1000)

          }
          $('.event').on('click', function(){
            // alert('called')
            // $(this).effect('shake')
            if($(this).attr('class').indexOf('clicked') != -1){
               // $(this).animate({backgroundColor: "rgb(88, 83, 188)"}, 'slow');
              $(this).attr('class', 'event');
            }
            else{
              $(this).attr('class', 'event clicked');

            }
          });
        })
        // alert('worked')
        return;
      }

    }
    // alert('wrong')
    $('#login').effect('shake');
  });
}
function selectAllEvents(){
  $('#alles').effect('shake')
  if($('#alles').attr('class')==''){
  $('.event').attr('class', 'event clicked');
  $('#alles').attr('class', 'clicked');
}
  else{
    $('.event').attr('class', 'event');
    $('#alles').attr('class', '');
  }
}
function saveEvents(){
  var attendingNames = []
  $('.clicked').each(function(){
    if($(this).attr('class').indexOf('event') != - 1){
      attendingNames.push($(this).attr('id'))

    }
  })
  console.log(attendingNames)
 attends = 0;
 absences = 0;
  events.get().then(function(doc){
    var listEvents = doc.data();
    for(var i in listEvents){
      if(attendingNames.indexOf(listEvents[i][0].seconds.toString()) != -1 && listEvents[i][3].indexOf(currentUser) == -1){
        listEvents[i][3] +=  currentUser + ', '
        attends++
      }
      else if(listEvents[i][3].indexOf(currentUser) != -1 && attendingNames.indexOf(listEvents[i][0].seconds.toString()) == -1){
        //alert('afmelden voor' + listEvents[i][1])
        listEvents[i][3] =  listEvents[i][3].replace(currentUser + ', ' , '');
        absences++
      }
    }
  events.set(listEvents);
  alert('Gelukt! Aangemeld voor ' + attends + ', afgemeld voor ' + absences + '.')
  })



}

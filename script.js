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
  $('.show').attr("class", "hide");
  $("#" + $(this).attr("id").substr(2)).attr("class", "show")
  $("#hero").css("height", "30%");
  // $("#content").css("height", "70%");
});
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
          for(var j in list){
            var tijd = list[j][0];
            tijd = new Date(tijd.seconds*1000);
            tijd = tijd.getDate() + '-' + tijd.getMonth()+ '-' + (tijd.getYear()+1900) +" " +(tijd.getHours()<10?'0':'') + tijd.getHours()+ ":" + (tijd.getMinutes()<10?'0':'') + tijd.getMinutes()
            var naam = list[j][1];
            var org = list[j][2];
            var aanwezig = list[j][1];
            console.log(tijd);
            $('#eventList').append('<div class="event"><h2>' +  naam + "</h2>"+"<h3>" + tijd + "</h3><h3>" + org + "</h3></div>");
          }

        })
        // alert('worked')
      }
    }
  });
}

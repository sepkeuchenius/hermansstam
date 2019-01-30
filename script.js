var $name = $('#name');
var $sub = $('#sub')
var colors = ['#daf7a6', '#ffc300', '#ff5733', '#c70039', '#900c3f', '#581845','#900c3f','#c70039','#ff5733','#ffc300','#daf7a6'];
var mcolors = ['rgb(68, 95, 19)', '#900c3f']
var newC = '';
var i =0;
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
     var spanDelay = 50;

     // Loop through all spans and activate
     $spans.each(function(index) {
       var $span = $(this);

       // Trigger a timeout so each span is offset
       setTimeout(function() {
         $span.toggleClass('active');
         $span.css('color', mcolors[Math.floor(index/7)]);
       }, (spanCounter * spanDelay));

       spanCounter++;
     });

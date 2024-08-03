 $(document).ready(function(){
  $("#mtir").html("");
  var i = 0;
  var txt = 'YouTube Thumbnail Download';
  var speed = 300;
  
  function typeWriter() {
  if (i < txt.length) {
  document.getElementById("mtir").innerHTML += txt.charAt(i);
  i++;
  setTimeout(typeWriter, speed);
  }
  }
  typeWriter();
  
  $("#dbtn").click(function(){
  var url = $("#vid").val();

if(/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(url)){
    
var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
var match = url.match(regExp);
if (match && match[2].length == 11) {
   var vid = match[2];
  $(".loder").show();
/*  make Links 
https://img.youtube.com/vi/[video-id]/default.jpg
https://img.youtube.com/vi/[video-id]/sddefault.jpg
https://img.youtube.com/vi/[video-id]/hqdefault.jpg
http://img.youtube.com/vi/[video-id]/mqdefault.jpg
http://img.youtube.com/vi/[video-id]/maxresdefault.jpg

*/

var qu1 = "http://img.youtube.com/vi/"+vid+"/maxresdefault.jpg";
var qu2 = "http://img.youtube.com/vi/"+vid+"/hqdefault.jpg";
var qu3 = "http://img.youtube.com/vi/"+vid+"/mqdefault.jpg";
var qu4 = "http://img.youtube.com/vi/"+vid+"/sddefault.jpg";
var qu5 = "http://img.youtube.com/vi/"+vid+"/default.jpg";


$("#qu1").attr("src", qu1)
$("#qu2").attr("src", qu2)
$("#qu3").attr("src", qu3)
$("#qu4").attr("src", qu4)
$("#qu5").attr("src", qu5)
  
$("#link1").attr("href", qu1)
$("#link2").attr("href", qu2)
$("#link3").attr("href", qu3)
$("#link4").attr("href", qu4)
$("#link5").attr("href", qu5)
var url = 'https://www.youtube.com/watch?v=' + vid;

$.getJSON('https://noembed.com/embed',
    {format: 'json', url: url}, function (data) {
    var vtit = data.title;
    $("#vtit").html(vtit);
});



setTimeout(
  function() 
  {
$(".loder").hide();
$(".d-links").show();
  }, 5000);
  
} else {
  swal("Invalid Url", "Please Enter a Valid Video URL!", "error");
}

} else {
  swal("Invalid Url", "Please Enter a Valid Video URL!", "error");
}
  
  });
  
  });
  
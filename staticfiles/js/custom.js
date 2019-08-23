$(function() {
				
  $("#menu1").mmenu({
    navbars: [{
      content: [ '<a href="#"> <img src="http://test1.webhost.kg/img/logo.png"> </a>' ]
    }],
    wrappers: [ 'bootstrap4' ],
    onClick: {
      close: true
  }
  }, { });
  $(".mh-head.mm-sticky").mhead({
    scroll: {
      hide: 200
    }
  });
  $(".mh-head:not(.mm-sticky)").mhead({
    scroll: false
  }); 				

  $('body').on( 'click',
    'a[href^="#/http://127.0.0.1:8000"]',
    function() {
      alert( "Thank you for clicking, but that's a demo link." );
      return false;
    }
  );
});   




$('.sl').slick({
slidesToShow: 4,
slidesToScroll: 1,
responsive: [
{
breakpoint: 480,
settings: {
  slidesToShow: 1,
  slidesToScroll: 1
}
}

]
});

$('.sl_1').slick({
slidesToShow: 2,
slidesToScroll: 1,
responsive: [
{
breakpoint: 480,
settings: {
  slidesToShow: 1,
  slidesToScroll: 1
}
}
]
});

$('.sl_2').slick({
slidesToShow: 2,
slidesToScroll: 1,
responsive: [
{
breakpoint: 480,
settings: {
  slidesToShow: 1,
  slidesToScroll: 1
}
}
]
});


// Map area



window.onscroll = function showHeader() {
var header = document.querySelector('#menu');
if (window.pageYOffset > 250) {
  header.classList.add('header_fixed');
} else {
  header.classList.remove('header_fixed');
}
}


$(function () {
$('a[href^="#"]').on('click', function (event) {
  // отменяем стандартное действие
  event.preventDefault();

  var sc = $(this).attr("href"),
      dn = $(sc).offset().top;
  /*
  * sc - в переменную заносим информацию о том, к какому блоку надо перейти
  * dn - определяем положение блока на странице
  */

  $('html, body').animate({ scrollTop: dn -100 }, 1000);

  /*
  * 1000 скорость перехода в миллисекундах
  */
});
});

var data = null;

// Джусуп Балагагын

function get_data() {
if (!data) {
  var date = new Date();
  $.ajax({
      url: 'http://test1.webhost.kg/balasagyn/assets/js/data.json',
      dataType: 'json',
      success: function (response) {
          data = response;
      }
  });
}
}

get_data();

$(document).on('click','#showResult',function(){
  
  
  
  
  // .css("display","none");
    var numberFloor = document.getElementById("numberFloor");
    var numberRoom = parseInt(document.getElementById("numberRoom").value||0);
    var min_price = parseInt(document.querySelector(".apartment_price input").value||0);
    var max_price = parseInt(document.querySelector(".before_price input").value||0);
    
    console.log({numberFloor,numberRoom,min_price,max_price});
    
    $('#mainIframe').contents().find("#SvgjsPath1018").click();
    
       $('#mainIframe').css("display","block");
    console.log("clicked");
  
      switch(numberFloor.value){
          case "1": $('#mainIframe').contents().find("#SvgjsPath1020").click(); break;
          case "2": $('#mainIframe').contents().find("#SvgjsPath1019").click(); break;
          case "3": $('#mainIframe').contents().find("#SvgjsPath1018").click(); break;
          case "4": $('#mainIframe').contents().find("#SvgjsPath1017").click(); break;
          case "5": $('#mainIframe').contents().find("#SvgjsPath1016").click(); break;
          case "6": $('#mainIframe').contents().find("#SvgjsPath1015").click(); break;
          case "7": $('#mainIframe').contents().find("#SvgjsPath1014").click(); break;
          case "8": $('#mainIframe').contents().find("#SvgjsPath1013").click(); break;
          case "9": $('#mainIframe').contents().find("#SvgjsPath1012").click(); break;
          case "10": $('#mainIframe').contents().find("#SvgjsPath1011").click(); break;
          case "11": $('#mainIframe').contents().find("#SvgjsPath1010").click(); break;
          case "12": $('#mainIframe').contents().find("#SvgjsPath1009").click(); break;
          case "13": $('#mainIframe').contents().find("#SvgjsPath1008").click(); break;
      }
      setTimeout(function(){
          $('#mainIframe').contents().find(".plan_frame .floor_map_cont .floor_map_svg svg path").each(function(){
          var room_data = data.apartments[$(this).data('alt')];
            var p = room_data.sq * 550 * 70;
            if( numberRoom === parseInt(room_data.n) && p >= min_price && p <= max_price){
              $(this).css("opacity",0.4);
            }
          });
      },100);
      
});

 
$(document).ready(function(){
  setTimeout(function(){
  $('#mainIframe').contents().find('.floor_close').css("display","none");
   
  },500);
});

// Джусуп Балагагын



// Шабдан Баатыр

function get_data() {
if (!data) {
  var date = new Date();
  $.ajax({
      url: 'http://test1.webhost.kg/shabdan/assets/js/data.json',
      dataType: 'json',
      success: function (response) {
          data = response;
      }
  });
}
}

get_data();

$(document).on('click','#showResult',function(){
  
  
  
  
  // .css("display","none");
    var numberFloor = document.getElementById("numberFloor");
    var numberRoom = parseInt(document.getElementById("numberRoom").value||0);
    var min_price = parseInt(document.querySelector(".apartment_price input").value||0);
    var max_price = parseInt(document.querySelector(".before_price input").value||0);
    
    console.log({numberFloor,numberRoom,min_price,max_price});
    
    $('#mainIframe1').contents().find("#SvgjsPath1018").click();
    
       $('#mainIframe1').css("display","block");
    console.log("clicked");
  
      switch(numberFloor.value){
          case "1": $('#mainIframe1').contents().find("#SvgjsPath1008").click(); break;
          case "2": $('#mainIframe1').contents().find("#SvgjsPath1009").click(); break;
          case "3": $('#mainIframe1').contents().find("#SvgjsPath1010").click(); break;
          case "4": $('#mainIframe1').contents().find("#SvgjsPath1011").click(); break;
          case "5": $('#mainIframe1').contents().find("#SvgjsPath1012").click(); break;
          case "6": $('#mainIframe1').contents().find("#SvgjsPath1013").click(); break;
          case "7": $('#mainIframe1').contents().find("#SvgjsPath1014").click(); break;
          case "8": $('#mainIframe1').contents().find("#SvgjsPath1015").click(); break;
          case "9": $('#mainIframe1').contents().find("#SvgjsPath1016").click(); break;
          case "10": $('#mainIframe1').contents().find("#SvgjsPath1017").click(); break;
          case "11": $('#mainIframe1').contents().find("#SvgjsPath1018").click(); break;
          case "12": $('#mainIframe1').contents().find("#SvgjsPath1019").click(); break;
      }
      setTimeout(function(){
          $('#mainIframe1').contents().find(".plan_frame .floor_map_cont .floor_map_svg svg path").each(function(){
          var room_data = data.apartments[$(this).data('alt')];
            var p = room_data.sq * 550 * 70;
            if( numberRoom === parseInt(room_data.n) && p >= min_price && p <= max_price){
              $(this).css("opacity",0.4);
            }
          });
      },100);
      
});

 
$(document).ready(function(){
  setTimeout(function(){
  $('#mainIframe1').contents().find('.floor_close').css("display","none");

  },500);
});

// Шабдан Баатыр


// Алымбек Датка

function get_data() {
if (!data) {
  var date = new Date();
  $.ajax({
      url: 'http://test1.webhost.kg/alymbek/assets/js/data.json',
      dataType: 'json',
      success: function (response) {
          data = response;
      }
  });
}
}

get_data();

$(document).on('click','#showResult',function(){
  
  
  
  
  // .css("display","none");
    var numberFloor = document.getElementById("numberFloor");
    var numberRoom = parseInt(document.getElementById("numberRoom").value||0);
    var min_price = parseInt(document.querySelector(".apartment_price input").value||0);
    var max_price = parseInt(document.querySelector(".before_price input").value||0);
    
    console.log({numberFloor,numberRoom,min_price,max_price});
    
    $('#mainIframe2').contents().find("#SvgjsPath1018").click();
    
       $('#mainIframe2').css("display","block");
    console.log("clicked");
  
      switch(numberFloor.value){
          case "1": $('#mainIframe2').contents().find("#SvgjsPath1019").click(); break;
          case "2": $('#mainIframe2').contents().find("#SvgjsPath1018").click(); break;
          case "3": $('#mainIframe2').contents().find("#SvgjsPath1017").click(); break;
          case "4": $('#mainIframe2').contents().find("#SvgjsPath1016").click(); break;
          case "5": $('#mainIframe2').contents().find("#SvgjsPath1015").click(); break;
          case "6": $('#mainIframe2').contents().find("#SvgjsPath1014").click(); break;
          case "7": $('#mainIframe2').contents().find("#SvgjsPath1013").click(); break;
          case "8": $('#mainIframe2').contents().find("#SvgjsPath1012").click(); break;
          case "9": $('#mainIframe2').contents().find("#SvgjsPath1011").click(); break;
          case "10": $('#mainIframe2').contents().find("#SvgjsPath1010").click(); break;
          case "11": $('#mainIframe2').contents().find("#SvgjsPath1009").click(); break;
          case "12": $('#mainIframe2').contents().find("#SvgjsPath1008").click(); break;
      }
      setTimeout(function(){
          $('#mainIframe2').contents().find(".plan_frame .floor_map_cont .floor_map_svg svg path").each(function(){
          var room_data = data.apartments[$(this).data('alt')];
            var p = room_data.sq * 550 * 70;
            if( numberRoom === parseInt(room_data.n) && p >= min_price && p <= max_price){
              $(this).css("opacity",0.4);
            }
          });
      },100);
      
});

 
$(document).ready(function(){
  setTimeout(function(){
  $('#mainIframe2').contents().find('.floor_close').css("display","none");     
  },500);
});


// Алымбек Датка

function raschitat() {
stoimost  = document.getElementById('stoimost').value;
pervo  = document.getElementById('pervo').value;
srok  = document.getElementById('srok').value;
if(stoimost == ""){
alert("Вы не указали стоимость");
} else if(pervo == ""){
alert("Вы не указали Первоначальный взнос");
} else {
cena = 440;
ploschad = parseFloat (stoimost) / 100 * parseFloat (pervo);
final = parseFloat (stoimost)- parseFloat (ploschad);
final_end =  parseFloat (final) / parseFloat (srok);
document.getElementById('ploschad').innerHTML = "<p>Общая сумма:"+   stoimost+" сом</p>"+ "<br>" +"<p>Первоначальный взнос (%):"+    pervo+"%</p>"+ "<br>" +"<p>Ежемесячная оплата: "+   final_end +" сом";
}
}


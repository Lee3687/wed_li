const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-icon");
const cancelBtn = document.querySelector(".cancel-icon");
const searchInput = document.querySelector("input");
const searchData = document.querySelector(".search-data");
searchBtn.onclick =()=>{
  searchBox.classList.add("active");
  searchBtn.classList.add("active");
  searchInput.classList.add("active");
  cancelBtn.classList.add("active");
  searchInput.focus();
  if(searchInput.value != ""){
    var values = searchInput.value;
    searchData.classList.remove("active");
    searchData.innerHTML = "You just typed " + "<span style='font-weight: 500;'>" + values + "</span>";
  }else{
    searchData.textContent = "";
  }
}
cancelBtn.onclick =()=>{
  searchBox.classList.remove("active");
  searchBtn.classList.remove("active");
  searchInput.classList.remove("active");
  cancelBtn.classList.remove("active");
  searchData.classList.toggle("active");
  searchInput.value = "";
}



$(function() {
    var $slider = $('.slider'),
      $firstSlide = $slider.find('li').first() // 첫번째 슬라이드
      .stop(true).animate({
        'opacity': 1
      }, 200); // 첫번째 슬라이드만 보이게 하기
  
    function PrevSlide() { // 이전버튼 함수
      stopSlide();
      startSlide(); //타이머 초기화
      var $lastSlide = $slider.find('li').last() //마지막 슬라이드
        .prependTo($slider); //마지막 슬라이드를 맨 앞으로 보내기
      $secondSlide = $slider.find('li').eq(1) //두 번째 슬라이드 구하기
        .stop(true).animate({
          'opacity': 0
        }, 400); //밀려난 두 번째 슬라이드는 fadeOut 시키고
      $firstSlide = $slider.find('li').first() //맨 처음 슬라이드 다시 구하기
        .stop(true).animate({
          'opacity': 1
        }, 400); //새로 들어온 첫 번째 슬라이드는 fadeIn 시키기
    }
  
    function NextSlide() { // 다음 버튼 함수
      stopSlide();
      startSlide(); //타이머 초기화
      $firstSlide = $slider.find('li').first() // 첫 번째 슬라이드
        .appendTo($slider); // 맨 마지막으로 보내기
      var $lastSlide = $slider.find('li').last() // 맨 마지막으로 보낸 슬라이드
        .stop(true).animate({
          'opacity': 0
        }, 400); // fadeOut시키기
      $firstSlide = $slider.find('li').first() // 맨 처음 슬라이드
        .stop(true).animate({
          'opacity': 1
        }, 400); // fadeIn 시키기
    }
  
    $('#next').on('click', function() { //다음버튼 클릭
      NextSlide();
    });
    $('#prev').on('click', function() { //이전 버튼 클릭
      PrevSlide();
    });
  
    startSlide(); // 자동 슬라이드 시작
  
    var theInterval;
  
    function startSlide() {
      theInterval = setInterval(NextSlide, 2000); //자동 슬라이드 설정
    }
  
    function stopSlide() { //자동 멈추기
      clearInterval(theInterval);
    }
  
    $('.slider').hover(function() { //마우스 오버시 슬라이드 멈춤
      stopSlide();
    }, function() {
      startSlide();
    });
  });




//SCROLL


var prevScrollpos = window.pageYOffset;

window.onscroll = function() {


  var currentScrollpos = window.pageYOffset;


  if (prevScrollpos > currentScrollpos) {

    document.getElementById("navbar").style.top = "0";
    document.getElementById("slidebtn").style.top = "0";

  } else {
    document.getElementById("navbar").style.top = "-150px";
    document.getElementById("slidebtn").style.top = "-150px";
  }
  prevScrollpos = currentScrollpos;
}

$(document).ready(function(){
  $(window).scroll(function(){
    var scroll = $(window).scrollTop();
    if(scroll>1){
      $(".navbar").css("background","#fff");
    }
    else{
      $(".navbar").css("background","none");
    }
  })
})


//HAMBERGER MENU

function closeNav() {
  document.getElementById("sidenav").style.width = "0%";
  document.getElementById("slidebtn").style.display = "block";
}


$(document).ready(function(){
  $(".slideBtn").click(function(){
    if($("#sidenav").width() == 0){
        document.getElementById("sidenav").style.width = "300px";

        document.getElementById("main").style.paddingRight = "300px";

        document.getElementById("slidebtn").style.paddingRight = "0px";
      document.getElementById("slidebtn").style.display = "none";
    }else{
        document.getElementById("sidenav").style.width = "0";
        document.getElementById("main").style.paddingRight = "0";
        document.getElementById("slidebtn").style.paddingRight = "0";
    }
  });
});



//slider

$(document).ready(function() {

  var $slider = $(".slider"),
      $slideBGs = $(".slide__bg"),
      diff = 0,
      curSlide = 0,
      numOfSlides = $(".slide").length-1,
      animating = false,
      animTime = 500,
      autoSlideTimeout,
      autoSlideDelay = 6000,
      $pagination = $(".slider-pagi");

  function createBullets() {
    for (var i = 0; i < numOfSlides+1; i++) {
      var $li = $("<li class='slider-pagi__elem'></li>");
      $li.addClass("slider-pagi__elem-"+i).data("page", i);
      if (!i) $li.addClass("active");
      $pagination.append($li);
    }
  };

  createBullets();

  function manageControls() {
    $(".slider-control").removeClass("inactive");
    if (!curSlide) $(".slider-control.left").addClass("inactive");
    if (curSlide === numOfSlides) $(".slider-control.right").addClass("inactive");
  };

  function autoSlide() {
    autoSlideTimeout = setTimeout(function() {
      curSlide++;
      if (curSlide > numOfSlides) curSlide = 0;
      changeSlides();
    }, autoSlideDelay);
  };

  autoSlide();

  function changeSlides(instant) {
    if (!instant) {
      animating = true;
      manageControls();
      $slider.addClass("animating");
      $slider.css("top");
      $(".slide").removeClass("active");
      $(".slide-"+curSlide).addClass("active");
      setTimeout(function() {
        $slider.removeClass("animating");
        animating = false;
      }, animTime);
    }
    window.clearTimeout(autoSlideTimeout);
    $(".slider-pagi__elem").removeClass("active");
    $(".slider-pagi__elem-"+curSlide).addClass("active");
    $slider.css("transform", "translate3d("+ -curSlide*100 +"%,0,0)");
    $slideBGs.css("transform", "translate3d("+ curSlide*50 +"%,0,0)");
    diff = 0;
    autoSlide();
  }

  function navigateLeft() {
    if (animating) return;
    if (curSlide > 0) curSlide--;
    changeSlides();
  }

  function navigateRight() {
    if (animating) return;
    if (curSlide < numOfSlides) curSlide++;
    changeSlides();
  }

  $(document).on("mousedown touchstart", ".slider", function(e) {
    if (animating) return;
    window.clearTimeout(autoSlideTimeout);
    var startX = e.pageX || e.originalEvent.touches[0].pageX,
        winW = $(window).width();
    diff = 0;

    $(document).on("mousemove touchmove", function(e) {
      var x = e.pageX || e.originalEvent.touches[0].pageX;
      diff = (startX - x) / winW * 70;
      if ((!curSlide && diff < 0) || (curSlide === numOfSlides && diff > 0)) diff /= 2;
      $slider.css("transform", "translate3d("+ (-curSlide*100 - diff) +"%,0,0)");
      $slideBGs.css("transform", "translate3d("+ (curSlide*50 + diff/2) +"%,0,0)");
    });
  });

  $(document).on("mouseup touchend", function(e) {
    $(document).off("mousemove touchmove");
    if (animating) return;
    if (!diff) {
      changeSlides(true);
      return;
    }
    if (diff > -8 && diff < 8) {
      changeSlides();
      return;
    }
    if (diff <= -8) {
      navigateLeft();
    }
    if (diff >= 8) {
      navigateRight();
    }
  });

  $(document).on("click", ".slider-control", function() {
    if ($(this).hasClass("left")) {
      navigateLeft();
    } else {
      navigateRight();
    }
  });

  $(document).on("click", ".slider-pagi__elem", function() {
    curSlide = $(this).data("page");
    changeSlides();
  });

});



//fade in

let ticking = false;

function isElementUnderBottom(elem, triggerDiff) {
  const { top } = elem.getBoundingClientRect();
  const { innerHeight } = window;
  return top > innerHeight + (triggerDiff || 0);
}

function handleScroll() {
  ticking = false;

  const upOnScrollElems = document.querySelectorAll('.up-on-scroll');
  upOnScrollElems.forEach(elem => {
    if (isElementUnderBottom(elem)) {
      elem.style.opacity = "0";
      elem.style.transform = 'translateY(70px)';
    } else {
      elem.style.opacity = "1";
      elem.style.transform = 'translateY(0px)';
    }
  });

  const productImg = document.querySelector('.diff-desc-image-wrap .image-wrap');
  const productImgRect = productImg.getBoundingClientRect();
  if (productImgRect.top < 0) {
    productImg.style.transform = `translateY(${-1 * productImgRect.top * 0.8 }px)`
  } else {
    productImg.style.transform = 'none';
  }

  const changeBgSection = document.querySelector('.background-change-wrap');
  const changeBgImg = document.querySelector('.background-change-wrap > div');
  const {top: bgTop, height: bgHeight} = changeBgSection.getBoundingClientRect();
  if (bgTop < 0) {
    const rate = (-1) * bgTop / 4;
    changeBgImg.style.filter = `grayscale(${rate}%)`;
    changeBgImg.style.opacity = `${(100-rate/5) / 100}`;
  } else {
    changeBgImg.style.filter = 'none';
        changeBgImg.style.opacity = `1`;
  }
}

function requestTick() {
  if(!ticking) {
    requestAnimationFrame(handleScroll);
  }
  ticking = true;
}

 window.addEventListener('scroll', requestTick);




//floating menu

$(document).ready(function() {

  // 기존 css에서 플로팅 배너 위치(top)값을 가져와 저장한다.
  var floatPosition = parseInt($("#floatMenu").css('top'));
  // 250px 이런식으로 가져오므로 여기서 숫자만 가져온다. parseInt( 값 );

  $(window).scroll(function() {
    // 현재 스크롤 위치를 가져온다.
    var scrollTop = $(window).scrollTop();
    var newPosition = scrollTop + floatPosition + "px";

    /* 애니메이션 없이 바로 따라감
     $("#floatMenu").css('top', newPosition);
     */

    $("#floatMenu").stop().animate({
      "top" : newPosition
    }, 500);

  }).scroll();

});




$(document).ready(function(){
  //전체 선택 클릭시 
  $('#all_chk').change(function () {
    if($("#all_chk").is(":checked")){
      $("input[name=item_chk]").prop("checked",true);
    }else{
      $("input[name=item_chk]").prop("checked",false);
    }
    // 전체 체크 순회(체크 확인)
    var check_cnt=0;
    $("input:checkbox[name=item_chk]").each(function() {
       if($("input:checkbox[name=item_chk]").is(":checked") == true){
          check_cnt++;
          //console.log(check_cnt)      
       }
    });
    $('.del_btn .num').text(check_cnt);
  });

 $('input[name="item_chk"]').change(function () {

  var itemLength = $('input[name="item_chk"]').length;
  var checkedLength = $('input[name="item_chk"]:checked').length;
  var selectAll = (itemLength == checkedLength);
  //console.log(checkedLength);

  $('.del_btn .num').text(checkedLength);
  $('#all_chk').prop('checked', selectAll);

  });

 $('.price_btn input[type="button"]').on('click', function(){
     var $ths = $(this);
     var $par = $ths.parent().parent();
     var $obj = $par.find('input[type="text"]');
     var val = $obj.val();
     if ($ths.val()=='-') {
         if (val > 1)
             $obj.val(--val);
     }
     else if ($ths.val()=='+') {
         if (val < 30)
             $obj.val(++val);
     }
 
   //수량 변경
   var unit_amount=$par.find('.price_unit').text().replace(/[^0-9]/g,"");
   var quantity = val;
   // 결제 수량 변경 로직은 메인터너스의 편리성을 위해서 밖으로 빼서 처리함.
   //1단 세로 부분 결제 금액
   pay_unit_func($par,unit_amount,quantity);
   //2단 결제 금액
   pay_total_func();
 });

function pay_unit_func($par,unit_amount,quantity){
  //1번 단
  var unit_total_amount=$par.find('.price_amount').text((unit_amount*quantity).toLocaleString());
} 

function pay_total_func(){
  //2번 단 
  var amount_total=0;
  var converse_unit=0;
  $('.cart_list li').each(function() {
    //console.log($(this).find('.price_amount').text());
    converse_unit=$(this).find('.price_amount').text().replace(/[^0-9]/g,"");
    amount_total=amount_total+(parseInt(converse_unit)|| 0);
    //총 상품금액
    //console.log(amount_total);
  });
  //총 상품금액
  //var total_amount_money = $('.cart_total_price').children().find('.item_price').text();
  var total_amount_money =$('.cart_total_price').children().find('.item_price').text(amount_total.toLocaleString());
  //할인금액
  var total_sale_money = parseInt($('.cart_total_price').children().find('.sale_price').text().replace(/[^0-9]/g,"")|| 0);
  console.log(total_sale_money);
  //총 배송비
  var total_delivery_price = parseInt($('.cart_total_price').children().find('.delivery_price').text().replace(/[^0-9]/g,"")|| 0);
  console.log(total_delivery_price);
  //총 결제금액
  var total_price=(parseInt(amount_total|| 0)-total_sale_money+total_delivery_price);
  var total_total_price = $('.cart_total_price').children().find('.total_price').text(total_price.toLocaleString());
  
}

 //개별 아이템 삭제
 $('.del_li_btn').on('click', function(){
   var recent_delete_cnt=$('.del_btn .num').text();
   var check_delete_ck=$(this).offsetParent().parent().find('input[type="checkbox"]').is(':checked');
   console.log(check_delete_ck);
   if(check_delete_ck == true){
     recent_delete_cnt=recent_delete_cnt - 1;
     $('.del_btn .num').text(recent_delete_cnt);
   }
   $(this).offsetParent().parent().remove();
   //console.log($(this).offsetParent().parents().find('input[type="checkbox"]').is(':checked'));
   pay_total_func();
 });
 //삭제 버튼을 누르면 지정된 상품 삭제
 $('.del_btn').on('click', function(){
   var recent_delete_cnt=$('.del_btn .num').text();
   $("input:checkbox[name=item_chk]").each(function() {
        var check_delete_ck=$(this).offsetParent().find('input[type="checkbox"]').is(':checked');
        console.log(check_delete_ck);
        if(check_delete_ck == true){
          recent_delete_cnt=recent_delete_cnt - 1;
          $('.del_btn .num').text(recent_delete_cnt);
          $(this).offsetParent().remove();
        }
    });
    pay_total_func();
 }); 
});



function openNav() {
  document.getElementById("open").style.display = "none";
  document.getElementById("nav").style.width = "100%";
}

function closeNav() {
  document.getElementById("nav").style.width = "0%";
  document.getElementById("open").style.display = "block";
}

$(document).ready(function() {
  slide();
});

		var container = document.getElementById("image-container");
// img 자신 즉, 디스로 아규먼츠 설정하고 파라미터 image에 값을 넘김 
		function change_img(image) { 
      // 디스의 src 값을 container에 넘김. 
			container.src = image.src; 
		}



    $(document).ready(function() {
      /* s: 개발영역 20190312 */
    
        var scrollTop = $(window).scrollTop();
        var footerHeight = $('.footer').outerHeight();
        $(".payInfo .inner").css('top',scrollTop - footerHeight);
    
      /* 스크롤시 결제정보 메뉴 고정 */
      $(window).scroll(function(event) {
    
        var scrollLeft = $(window).scrollLeft();
        var scrollTop = $(window).scrollTop();
        var payContTop = parseInt($('.payCont').offset().top);
        var payContBot = $(".payInfo .inner").outerHeight() + scrollTop;
        var footerTop = parseInt($('.footer').offset().top);
        var footerHeight = $('.footer').outerHeight();
        var bodyHeight = $('body').outerHeight();
        var payContHeight = $('.payCont').outerHeight();
        var payInfoHeight = $(".payInfo .inner").outerHeight();
        var payContBottom = payContTop + $('.payCont').outerHeight();
    
        var total = bodyHeight - scrollTop - footerHeight;
        $(".payInfo .inner").attr('style',0);
        if (payContTop <= scrollTop) {
          $(".payInfo .inner").addClass("fixed");
    
          $(".payInfo .inner").css('marginLeft', -scrollLeft);
    
    
        } else {
    
          $(".payInfo .inner").removeClass("fixed");
          $(".payInfo .inner").css('marginLeft', 0);
    
    
        }
    
        if (footerTop <= payContBot) {
    
          $(".payInfo .inner").addClass("stick");
    
    
        } else {
    
        $(".payInfo .inner").removeClass("stick");
    
    
    }
    
    
      });
    
    
      /* 약관동의 toggle */
      $('.payCont').on('click', '.btnView', function(e) {
    
    
    
        var payContTop = parseInt($('.payCont').offset().top);
    
        var footerTop = parseInt($('.footer').offset().top);
        var scrollLeft = $(window).scrollLeft();
        var scrollTop = $(window).scrollTop();
    
        var footerHeight = $('.footer').outerHeight();
        var bodyHeight = $('body').outerHeight();
        var payContHeight = $('.payCont').outerHeight();
        var payInfoHeight = $(".payInfo .inner").outerHeight();
        var total = bodyHeight - scrollTop - footerHeight;
        $(this).toggleClass('active');
    
        if ($(this).hasClass('active')) {
    
            payInfoHeight = payInfoHeight + $('.agreeCont').outerHeight() + $('.btnPay').outerHeight();
            $(this).closest('.agreeCont').find('.depth2').slideDown();
    
        } else {
            payInfoHeight = payInfoHeight -$('.agreeCont').outerHeight() - $('.btnPay').outerHeight();
          $(this).closest('.agreeCont').find('.depth2').slideUp();
        }
        console.log("payInfoHeight : " + payInfoHeight);
        console.log("scrollTop : " + scrollTop);
        var payContBot =  payInfoHeight + scrollTop;
    
        console.log("payContBot : " + payContBot);
        console.log("footerTop : " + footerTop);
        if (footerTop <= payContBot) {
    
          $(".payInfo .inner").addClass("stick");
                $(".payInfo .inner").css('marginLeft', 0);
        } else {
          $(".payInfo .inner").removeClass("stick");
             $(".payInfo .inner").css('marginLeft', -scrollLeft);
    
        }
    
      });
    
    
    
      /* 결제수단 마우스 over 시 아이콘 변경 */
      $('.paymentSec li').mouseover(function() {
    
        var change = $(this).find("span > img").attr("src").replace("_off.png", "_on.png");
        $(this).find("span > img").attr("src", change);
    
      });
    
      $('.paymentSec li').mouseout(function() {
    
        if (!$(this).hasClass('on')) {
          var change = $(this).find("span > img").attr("src").replace("_on.png", "_off.png");
          $(this).find("span > img").attr("src", change);
        }
      });
    
      //  결제수단
    
      $('.agreeCont[data-agree="2"]').hide();
    
      $('body').on('click', '.paymentSec li', function(e) {
    
        $('.paymentSec li').removeClass('on');
        $(this).addClass("on");
        $(this).find('input[name="' + $(this).find('input').name + '"]').prop('checked', false); //전체 해제
        $(this).find('input').prop('checked', true).change(); // 체인지일때 true
    
        if ($(this).hasClass("on")) {
          var change = $(this).find("span > img").attr("src").replace("_off.png", "_on.png");
          $(this).find("span > img").attr("src", change);
    
        }
    
    
    
        $('.detailInfoBx').hide();
    
        // 신용카드
        if ($(this).find('input').hasClass('creditCard')) {
          $('.detailInfoBx.creditCard').show();
    
        } else if ($(this).find('input').hasClass('account')) { // 계좌이체 현금영수증발급 Case
          $('.detailInfoBx').hide();
          $("#cashReceipt").change(function() {
            var optionVal = $(this).find('option:selected').val();
            $('.cashReceipt .inputBx').hide();
            if (optionVal == "test2") {
              $('.cashReceipt .phoneInBx01').show();
            } else if (optionVal == "test3") {
              $('.cashReceipt .phoneInBx02').show();
            }
          });
    
    
    
          $('.detailInfoBx.cashReceipt').show();
        }
        $('.paymentSec li').each(function() {
    
          if (!$(this).hasClass('on')) {
            var change = $(this).find("span > img").attr("src").replace("_on.png", "_off.png");
            $(this).find("span > img").attr("src", change);
          }
    
    
    
        });
    
        /* 결제수단 type1 체크 */
        if ($(this).find('input[data-type="1"]').is(":checked")) {
    
          $('.agreeCont[data-agree="1"]').show();
          $('.agreeCont[data-agree="2"]').hide();
    
          $(this).addClass('on');
          var change = $(this).find("span > img").attr("src").replace("_off.png", "_on.png");
          $(this).find("span > img").attr("src", change);
    
        }
        /* 결제수단 type2 체크 */
        else if ($(this).find('input[data-type="2"]').is(":checked")) {
    
          $(this).addClass("on");
    
          var change = $(this).find("span > img").attr("src").replace("_off.png", "_on.png");
          $(this).find("span > img").attr("src", change);
          $('.agreeCont[data-agree="1"]').hide();
          $('.agreeCont[data-agree="2"]').show();
        }
    
      });
    
    
      /* 약관동의 모두 체크 */
      $('body').on('click', '.agreeCont .checkAll', function(e) {
    
        if ($(this).is(":checked")) {
          $(this).closest('.agreeCont').find(".subCheck").prop("checked", true);
        } else {
          $(this).closest('.agreeCont').find(".subCheck").prop("checked", false);
        }
      });
    
      // 약관동의 각각 체크
      $('.agreeCont .subCheck').click(function() {
        var subCheck = $(this).closest('.agreeCont').find('.subCheck').length,
          subChecked = $(this).closest('.agreeCont').find('.subCheck:checked').length;
    
        if (subCheck === subChecked) {
          $(this).closest('.agreeCont').find('.checkAll').prop("checked", true);
        } else {
          $(this).closest('.agreeCont').find('.checkAll').prop("checked", false);
        }
      });
    
      /* e: 개발영역 20190312 */
    });
$(document).ready(function(){
    $('#goods_group1').on('change',function(){
      var group1=$(this).val();
      var group2= $('#goods_group2');
      group2.empty();
      if(group1=='아이'){
        group2.append('<option value="싱글섀도우">싱글섀도우</option><option value="마스카라">마스카라</option><option value="아이라이너">아이라이너</option>'
                      +'<option value="아이브로우">아이브로우</option>');
      }else if(group1=='립'){
        group2.append('<option value="립스틱">립스틱</option><option value="립틴트">립틴트</option>');
      }else if(group1=='페이스'){
        group2.append('<option value="쿠션">쿠션</option><option value="파운데이션/BB">파운데이션/BB</option>');
      }else if(group1=='네일'){
        group2.append('<option value="네일컬러">네일컬러</option>');
      }else if(group1=='향수'){
        group2.append('<option value="향수">향수</option>');
      }else if(group1=='화장소품'){
        group2.append('<option value="브러쉬">브러쉬</option><option value="퍼프">퍼프</option><option value="화장도구">화장도구</option><option value="파우치">파우치</option>');
      }
    });
    ///////////////////////////////////////////////////////////////////////
    
  
    $('#colorChk').on('change',function(){
      if($(this).val()=='no'){
        $('#colorPickSpan').css('display','none');
  
        $('#addBtn').css('display','none');
      }else{
         $('#colorPickSpan').css('display','inline');
         $('#addBtn').css('display','inline');
      }
    });
    
    
    
    
    /////////////////////////////////////////
    
  });
  var input;
  function openFile(event) {
      input = event.target;
      var reader = new FileReader();
      reader.onload = function(){
        var dataURL = reader.result;
        $(input).next().children('img').attr('src',dataURL);
       $(input).next().children('img').css('display','block');
      }
       reader.readAsDataURL(input.files[0]);
    };
    
   var list=[];
  var ruru=0;
   function addColor(){
     var num=ruru++;
     var src;
      var list=$('#colorPick')[0].files;
      var reader =new FileReader();
      reader.readAsDataURL(list[0]);
      reader.onload=function(){
      src=this.result;
     var color=$('#goods_color').val();
      var count=$('#goods_count').val();
     var div='<div class="colorImgBox" id="colorBox'+num+'"><img class="colorImg" src="'+src+'"/><span>'+color+' X'+count+'개<span>'
         +'<span class="xBtn"><a href="#" onclick="removeBox(event)"><img '+'src="https://www.etudehouse.com/kr/ko/web_resource/front/images/common/ico_close2.png"/></a></span>'
     +'<input type="hidden" name="optList['+num+'].goods_count" value="'+count+'"/><input type="hidden"'+' name="optList['+num+'].goods_color" value="'+color+'"/></div>';
  
      $('#colorAddBox').append(div);
    var ele=document.getElementById("colorPick");
    var cl=ele.cloneNode(true);
      cl.removeAttribute("id");
      cl.setAttribute("name", "optList["+num+"].goods_color_file");
     $(cl).addClass('hiddenBox');
   
     $('#colorBox'+num).append(cl);
    }
   } //end addColor
  function removeBox(event){
    $(event.target).parents('.colorImgBox').remove();
    event.preventDefault();
  }
    
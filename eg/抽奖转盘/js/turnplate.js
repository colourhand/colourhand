/**
 * Created by colourhand on 16/1/18.
 */
var turnplate={
  restaraunts:[],				//大转盘奖品名称
  colors:[],					//大转盘奖品区块对应背景颜色
  outsideRadius:170,			//大转盘外圆的半径
  textRadius:150,				//大转盘奖品位置距离圆心的距离
  insideRadius:55,			//大转盘内圆的半径
  startAngle:0,				//开始角度
  bRotate:false				//false:停止;ture:旋转
};

$(document).ready(function(){
  //动态添加大转盘的奖品与奖品区域背景颜色
  turnplate.restaraunts = ["10天金", "100天金", "谢谢参与", "200天金", "250天金", "500天金", "好吃点单品券 ", "小米手环", "iphone 6s手机", "特斯拉"];
  turnplate.colors = ["#EEEFBC","#FFFFFF","#EEEFBC", "#FFFFFF", "#EEEFBC","#FFFFFF", "#EEEFBC", "#FFFFFF", "#EEEFBC","#FFFFFF", "#EEEFBC"];


  //var rotateTimeOut = function (){
  //  $('#wheelcanvas').rotate({
  //    angle:30,
  //    animateTo:2160,
  //    duration:800000,
  //    callback:function (){
  //      alert('网络超时，请检查您的网络设置！');
  //    }
  //  });
  //};

  //旋转转盘 item:奖品位置; txt：提示语;
  var rotateFn = function (item, txt){
    var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length*2));
    if(angles<270){
      angles = 270 - angles;
    }else{
      angles = 360 - angles + 270;
    }
    $('#wheelcanvas').stopRotate();
    $('#wheelcanvas').rotate({
      angle:0,
      animateTo:angles+1798,
      duration:8000,
      callback:function (){
        TipShow(txt,30000);
        turnplate.bRotate = !turnplate.bRotate;
      }
    });
  };

  $('.pointer').click(function (){
    if(turnplate.bRotate){
     return;};
    turnplate.bRotate = !turnplate.bRotate;
    //获取随机数(奖品个数范围内)
    var item = rnd(1,turnplate.restaraunts.length);
    //item=1;
    //奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
    rotateFn(item, turnplate.restaraunts[item-1]);
    console.log(item);
  });
});

function rnd(n, m){
  var random = Math.floor(Math.random()*(m-n+1)+n);
  return random;

}

window.initTextScroll= function () {
  var speed=65;
  design2.innerHTML=design1.innerHTML;
  function Marquee2()
  {
    if(design2.offsetTop-design.scrollTop<=0)
      design.scrollTop-=design1.offsetHeight;
    else
    {
      design.scrollTop++
    }
  }
  var MyMar2=setInterval(Marquee2,speed);
  design.onmouseover=function()
  {
    clearInterval(MyMar2)
  }
  design.onmouseout=function()
  {
    MyMar2=setInterval(Marquee2,speed)
  }
}
//页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
window.onload=function(){
  drawRouletteWheel();
  initTextScroll();
};

function drawRouletteWheel() {
  var canvas = document.getElementById("wheelcanvas");
  if (canvas.getContext) {
    //根据奖品个数计算圆周角度
    var arc = Math.PI / (turnplate.restaraunts.length/2);
    var ctx = canvas.getContext("2d");
    //在给定矩形内清空一个矩形
    ctx.clearRect(0,0,422,422);
    //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
    ctx.strokeStyle = "#FFBE04";
    //font 属性设置或返回画布上文本内容的当前字体属性
    ctx.font = '14px Microsoft YaHei';
    for(var i = 0; i < turnplate.restaraunts.length; i++) {
      var angle = turnplate.startAngle + i * arc;
      ctx.fillStyle = turnplate.colors[i];
      ctx.beginPath();
      //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
      ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);
      //		  ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
      ctx.lineTo(211,211);
      ctx.moveTo(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);
      ctx.stroke();
      ctx.fill();
      //锁画布(为了保存之前的画布状态)
      ctx.save();

      //----绘制奖品开始----
      ctx.fillStyle = "#E5302F";
      var text = turnplate.restaraunts[i];
      var line_height = 17;
      //translate方法重新映射画布上的 (0,0) 位置
      ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);

      //rotate方法旋转当前的绘图
      ctx.rotate(angle + arc / 2 + Math.PI / 2);

      /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
      if(text.indexOf("天金")>0){//流量包
        var texts = text.split("天金");
        for(var j = 0; j<texts.length; j++){
          ctx.font = j == 0?'bold 14px Microsoft YaHei':'14px Microsoft YaHei';
          if(j == 0){
            ctx.fillText(texts[j]+"天金", -ctx.measureText(texts[j]+"天金").width / 2, j * line_height);
          }else{
            ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
          }
        }
      }else if(text.indexOf("商品") == -1 && text.length>6){//奖品名称长度超过一定范围
        text = text.substring(0,6)+"||"+text.substring(6);
        var texts = text.split("||");
        for(var j = 0; j<texts.length; j++){
          ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
        }
      }else{
        //在画布上绘制填色的文本。文本的默认颜色是黑色
        //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      }

      //添加对应图标
      if(text.indexOf("天金")>0){
        var img= document.getElementById("tj");
        img.onload=function(){
          ctx.drawImage(img,-15,20);
        };
        ctx.drawImage(img,-15,20);
      }else if(text.indexOf("谢谢参与")>=0){
        var img= document.getElementById("sorry-img");
        img.onload=function(){
          ctx.drawImage(img,-15,20);
        };
        ctx.drawImage(img,-15,20);
      }else if(text.indexOf("券")>=0){
        var img= document.getElementById("other");
        img.onload=function(){
          ctx.drawImage(img,-10,20);
        };
        ctx.drawImage(img,-10,20);
      }else if(text.indexOf("手机")>=0){
        var img= document.getElementById("other");
        img.onload=function(){
          ctx.drawImage(img,-10,20);
        };
        ctx.drawImage(img,-10,20);
      }
      else{
        var img= document.getElementById("tj");
        img.onload=function(){
          ctx.drawImage(img,-15,20);
        };
        ctx.drawImage(img,-15,20);
      }
      //把当前画布返回（调整）到上一个save()状态之前
      ctx.restore();
      //----绘制奖品结束----
    }
  }
}
/**
 * backdrop UI component
 */
var TipShow = function (msg, duration) {
  var timeoutId = -1;
  var $backdropObj = $(".loading-backdrop");
  if (!$backdropObj[0]) {
    htmlStr = "<div class='loading-backdrop'>" +
      "<div class='loading-wrapper'>" +
      "<div class='loading-content'>" +
      "<img src='./images/noticeBg.png' style='width: 70%;position: relative;'/>"+
        "</div>"+
        "<img src='./images/noticeClose.png' class='msgCloseImg' onclick='TipHide()'/>"+
        "<div class='msgText'>"+
      "恭喜您,抽中了"+msg +
      "</div></div></div>";
    //$("body").append(htmlStr);
    var temp=document.createElement('div');
    temp.id="shaTemp";
    temp.innerHTML=htmlStr;
    var last=document.body.lastChild;
    document.body.insertBefore(temp,last);
    if (typeof duration == "number" && duration > 0) {
      if (timeoutId > 0) {
        clearTimeout(timeoutId);
        delete timeoutId;
      }
      timeoutId = setTimeout(function () {
        TipHide()
      }, duration);
    }
  } else {
    $(".loading-content")[0].innerText = msg;
    $(".loading-backdrop").addClass('visible');
    if (typeof duration == "number" && duration > 0) {
      if (timeoutId > 0) {
        clearTimeout(timeoutId);
        delete timeoutId;
      }

      timeoutId = setTimeout(function () {
        TipHide()
      }, duration);
    }
  }
};

var TipHide = function () {
  //$(".loading-backdrop").removeClass('visible');
  var temp=document.getElementById('shaTemp');
  temp.parentNode.removeChild(temp);
};

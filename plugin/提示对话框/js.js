/**
 * Created by colourhand on 15/12/29.
 */
function test(){
    Tips('我会在两秒后自动关闭哦',2000);
}
function Tips(msg, duration){
    var insetHtml='<div id="sha-back"><div class="sha-wrapper"><div class="sha-tips-content">'+msg+'</div></div></div>';
    var temp=document.createElement('div');
    temp.id="shaTemp";
    temp.innerHTML=insetHtml;
    var last=document.body.lastChild;
    document.body.insertBefore(temp,last);
    if(typeof duration=='number'&& duration>0){
        setTimeout(function(){
            var temp=document.getElementById('shaTemp');
            temp.parentNode.removeChild(temp);
        },duration);
    }
    else {
        setTimeout(function(){
            var temp=document.getElementById('shaTemp');
            temp.parentNode.removeChild(temp);
        },1000);
    }
}
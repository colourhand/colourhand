/**
 * Created by colourhand on 15/12/29.
 */
function test(){
    shaDialog('友情提醒','本活动归彩色手工作室所有',1);
}
//type  0:默认:确定  1:确定 and  取消
function shaDialog(title,content,type){
    var dialog ={
        title:title,
        content:content,
        type:type
    };
    var insetHtml=
        "<div id='sha-dialog'>"+
        "<div id='sha-title'>"+dialog.title+"</div>"+
        "<div id='sha-content'>"+dialog.content+"</div>"+
        "<div id='sha-buttons'>";
    if(type==1){
        insetHtml+=  "<button onclick='cancel()'>取消</button><button id='sure' onclick='sure()'>确定</button>"+
            "</div> </div>";
    }
    else{
        insetHtml+=  "<button id='onlySure' onclick='sure()'>确定</button>"+
            "</div> </div>";
    }
    var temp=document.createElement('div');
    temp.id="sha-temp";
    temp.innerHTML=insetHtml;
    var first=document.body.lastChild;
    document.body.insertBefore(temp,first);
    document.getElementById('sha-dialog').style.display='block';
}

function cancel(){
    console.log('取消');
    document.getElementById('sha-dialog').style.display='none';
    document.body.className='';
    removeDialogDiv('sha-temp');
    return false;
}
function sure() {
    console.log('确定');
    document.getElementById('sha-dialog').style.display = 'none';
    document.body.className='';
    removeDialogDiv('sha-temp');
    return true;
}
function removeDialogDiv(id){
    var temp=document.getElementById(id);
    temp.parentNode.removeChild(temp);
}
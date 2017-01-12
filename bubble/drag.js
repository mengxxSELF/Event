/* 拖拽+ 运动
down  move up
 *  */


function down(e){
    this.posL = e.clientX-this.offsetLeft;
    this.posT = e.clientY-this.offsetTop;

    if(this.setCapture){
        this.setCapture();
        on(this,'mousemove',move)
        on(this,'mouseup',up)
    }else{
    //    标准
        this.Move = processT(move,this)
        this.Up = processT(up,this)
        on(document,'mousemove',this.Move)
        on(document,'mouseup',this.Up)
        e.preventDefault();
    }
// 点击到泡泡的时候
    pang.call(this); // 将this指向元素div

//    与原拖拽无关
    clearTimeout(this.flyTimer);
    clearTimeout(this.dropTimer);

}

function pang(){
    var oStart = document.getElementsByTagName('span')[0];
    var thisIndex= this.index;
    // 创建数组 用于存储index
    if(!oStart['clickAry']){
        oStart['clickAry']=[];
    }
    oStart['clickAry'].push(thisIndex);
    console.log('length', oStart['clickAry'].length)
    var oEnd = document.getElementsByTagName('b')[0];

    // 判断显示的index 与点击的元素的index是否相同
    var nowIndex = oStart['showIndex'];
    console.log(thisIndex,nowIndex)
    if(nowIndex==thisIndex){
        oEnd.getElementsByTagName('i')[0].innerHTML= (10-oStart['clickAry'].length)*10;
        animate({
            id:oEnd,
            target:{
                width:200,
                height:200,
                opacity:1,
                display:'block'
            }
        });
        return;
    }



}

function move(e){
    this.style.left= e.clientX-this.posL+'px';
    this.style.top= e.clientY-this.posT+'px';

//     与原本拖拽无关代码
    if(!this.prevSpeendX){
        this.prevSpeendX = e.clientX;
    }else{
        this.speedX = e.clientX-this.prevSpeendX;
        this.prevSpeendX = e.clientX; // 更新上一次
    }
}


function up(){
    if(this.releaseCapture){
        this.releaseCapture();
        off(this,'mousemove',move)
        off(this,'mouseup',up)
    }else{
        // 标准
        off(document,'mousemove',this.Move)
        off(document,'mouseup',this.Up)
    }
//     与原本拖拽无关代码

    fly.call(this);
    drop.call(this);

}

// 横向运动
function fly(){
    clearTimeout(this.flyTimer);
    this.speedX*=.93; // 摩擦力
    // 边界判断
    var leftX =this.offsetLeft+this.speedX;
    var maxL = (document.documentElement.clientWidth||document.body.clientWidth)-this.offsetWidth;
    if(leftX>=maxL){
        leftX=maxL;
        this.speedX*=-1; // 触底反弹变化方向
    }else if(leftX<=0){
        leftX=0;
        this.speedX*=-1;
    }

    this.style.left= leftX+'px';
    if(Math.abs(this.speedX)>0.5){
        this.flyTimer = setTimeout(processT(fly,this),10);
    }
}

// 纵向运动
function drop(){
    this.speedY =  this.speedY?(this.speedY+9.8)*0.92:9.8*0.92;
    var posTop =this.offsetTop+this.speedY;
    // 边界判断
    var maxT = (document.documentElement.clientHeight||document.body.clientHeight)-this.offsetHeight;
    if(posTop>=maxT){ // 落地
        posTop=maxT;
        this.speedY*=-1;
        this.flag++;
    }else{ //抬起
        this.flag=0;
    };
    this.style.top= posTop+'px';

    if(this.flag<=2){
        this.dropTimer = setTimeout(processT(drop,this),10);
    }
}


function processT(obj,nowT){
    return function (e) {
        obj.call(nowT,e);
    }
}


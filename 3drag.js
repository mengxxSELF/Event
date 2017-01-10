/* 拖拽 运动
 down  move up
 *  */

// 加入横向运动
/*   用运动差距 模拟速度 move的时候 速度变化  up之后开启fly运动
 开启定时器 更新元素位置
 摩擦力
 注意边界判断 碰壁之后变化方向
 * */

// 加入纵向运动
/*  运动距离每次加9.8  模拟速度变化越来越快
 与move 无关 当Up 之后开启下坠运动 drop
 开启定时器 更新元素位置
 摩擦力
 注意边界判断 碰壁之后变化方向
 * */

var oDiv =document.getElementsByTagName('div')[0];

on(oDiv,'mousedown',down);

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

//    与原拖拽无关
    clearTimeout(this.flyTimer);
    clearTimeout(this.dropTimer);

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


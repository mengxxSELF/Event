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

// 订阅发布者模式

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

    fire.call(this,'selfdown',e); // 发布者
}


function move(e){
    this.style.left= e.clientX-this.posL+'px';
    this.style.top= e.clientY-this.posT+'px';

//     与原本拖拽无关代码
    fire.call(this,'selfmove',e); // 发布者
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
    fire.call(this,'selfup',e); // 发布者

}




function processT(obj,nowT){
    return function (e) {
        obj.call(nowT,e);
    }
}


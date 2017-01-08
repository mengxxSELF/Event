/*  封装拖拽  1 快速移动 失去焦点 2 会选中配角 */

var oDiv = document.getElementsByTagName('div')[0];

on(oDiv,'mousedown',down);


function down(e){
    this.x = e.clientX;
    this.y= e.clientY;
    this.l = this.offsetLeft;
    this.t = this.offsetTop;
    if(this.setCapture){
        // ie
        this.setCapture();
        on(this,'mousemove',move)
        on(this,'mouseup',up)
    }else{
        // 标准
        var _this =this;
        this.Move = function (e) {
            move.call(_this,e);
        };
        this.Up = function () {
            up.call(_this);
        }
        on(document,'mousemove',this.Move)
        on(document,'mouseup',this.Up)
    //     阻止默认事件
        e.preventDefault();
    }
}

function move(e){
    this.style.left = e.clientX-this.x+this.l+'px';
    this.style.top = e.clientY-this.y+this.t+'px';
}

function up(){
    if(this.releaseCapture){
        this.releaseCapture();
        off(this,'mousemove',move)
        off(this,'mouseup',up)
    }else{
        off(document,'mousemove',this.Move)
        off(document,'mouseup',this.Up)
    }
}
/*  ��װ��ק  1 �����ƶ� ʧȥ���� 2 ��ѡ����� */

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
        // ��׼
        var _this =this;
        this.Move = function (e) {
            move.call(_this,e);
        };
        this.Up = function () {
            up.call(_this);
        }
        on(document,'mousemove',this.Move)
        on(document,'mouseup',this.Up)
    //     ��ֹĬ���¼�
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
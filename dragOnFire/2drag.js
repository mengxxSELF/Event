/* ���ķ��� ��ק  ��¶�ӿ� */

// on fire  ���ڸ������̳�  �����Է���д��ԭ����  ʹ�÷�ʽ ʵ��  this.on('mousedown',fn1)

function EventEmmit(){};
// ��������������  ����
EventEmmit.prototype.on= function (type,fn) {
    if(!this[type]) {
        this[type]=[];
    }
    var a=this[type];
    if(a){
        for(var i=0;i<a.length;i++){
            if(a[i]==fn) return;
        }
        a.push(fn);
    }
};
// �¼�����
EventEmmit.prototype.fire= function (e) {
    var a=this[type];
    if(a&&a.length){
        for(var i=0;i<a.length;i++){
            a[i].call(this,e); // ����thisָ��
        }
    }
};


// ��ק   down move up
// ʹ�÷�ʽ var drag = new Drag({ele:oDiv},e)
function Drag(opt,e){
    if(!opt.ele) return;
    this.ele =opt.ele;
    // ��һ�� down�¼�
    this.Down = processThis(this.down,this);// ���� down��this
    on(this.ele,'mousedown',this.Down);
};

Drag.prototype.down= function (e) {
    // ��¼�ĸ�����ֵ
    this.x=e.clientX;
    this.y=e.clientY;
    this.l=this.ele.offsetLeft;
    this.t=this.ele.offsetTop;

    this.Move = processThis(this.move,this);// ����
    this.Up = processThis(this.up,this);// ����

    if(this.ele.setCapture){
        this.ele.setCapture();
        on( this.ele ,'mousemove',this.Move);
        on( this.ele ,'mouseup',this.Up);
    }else{ // �����׼�����
        on( document ,'mousemove',this.Move);
        on( document ,'mouseup',this.Up);
        e.preventDefault();
    }
};

Drag.prototype.move= function (e) {
  // �仯Ԫ��λ��
    this.ele.style.left =  e.clientX-this.x+this.l+'px';
    this.ele.style.top =  e.clientY-this.y+this.t+'px';
};
Drag.prototype.up= function () {
    // �Ӵ���
    if(this.ele.releaseCapture){
        this.ele.releaseCapture();
        off( this.ele ,'mousemove',this.Move);
        off( this.ele ,'mouseup',this.Up);
    }else{ // �����׼�����
        off( document ,'mousemove',this.Move);
        off( document ,'mouseup',this.Up);
    }
};






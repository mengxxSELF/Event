/* 订阅发布 拖拽  暴露接口 */

// on fire  用于给别的类继承  将属性方法写在原型中  使用方式 实例  this.on('mousedown',fn1)

function EventEmmit(){};
// 将方法存入数组  订阅
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
// 事件发布
EventEmmit.prototype.fire= function (type,e) {
    var a=this[type];
    if(a&&a.length){
        for(var i=0;i<a.length;i++){
            a[i].call(this,e); // 更改this指向
        }
    }
};


// 拖拽   down move up
// 使用方式 var drag = new Drag({ele:oDiv},e)
function Drag(opt,e){
    if(!opt.ele) return;
    this.ele =opt.ele;
    // 绑定一个 down事件
    this.Down = processThis(this.down,this);// 更改 down中this
    on(this.ele,'mousedown',this.Down);
};

// 继承  属于自定义事件
Drag.prototype = new EventEmmit();
Drag.prototype.constructor = Drag;

Drag.prototype.down= function (e) {
    // 记录四个属性值
    this.x=e.clientX;
    this.y=e.clientY;
    this.l=this.ele.offsetLeft;
    this.t=this.ele.offsetTop;

    this.Move = processThis(this.move,this);// 更改
    this.Up = processThis(this.up,this);// 更改

    if(this.ele.setCapture){
        this.ele.setCapture();
        on( this.ele ,'mousemove',this.Move);
        on( this.ele ,'mouseup',this.Up);
    }else{ // 处理标准浏览器
        on( document ,'mousemove',this.Move);
        on( document ,'mouseup',this.Up);
        e.preventDefault();
    }

    // 暴露接口
    this.fire('mousedown');
};

Drag.prototype.move= function (e) {
    // 变化元素位置
    this.ele.style.left =  e.clientX-this.x+this.l+'px';
    this.ele.style.top =  e.clientY-this.y+this.t+'px';

    // 暴露接口
    this.fire('mousemove');
};
Drag.prototype.up= function () {
    // 接触绑定
    if(this.ele.releaseCapture){
        this.ele.releaseCapture();
        off( this.ele ,'mousemove',this.Move);
        off( this.ele ,'mouseup',this.Up);
    }else{ // 处理标准浏览器
        off( document ,'mousemove',this.Move);
        off( document ,'mouseup',this.Up);
    }

    // 暴露接口
    this.fire('mouseup');

};
// 当前元素 变化 层级最高
Drag.prototype.changeIndex = function () {
    // 点击的时候 层级最高
    this.Index = processThis(this.firstIndex,this)
    this.on('mousedown',this.Index);
};
Drag.prototype.firstIndex= function () {
    this.ele.style.zIndex= 9999;// 当前元素 z-index 99
    var nowIndex= utils.index(this.ele);
    // 其余z index 为 0
    var siblings = utils.siblings(this.ele);
    for(var i=0;i<siblings.length;i++){
        siblings[i].style.zIndex= -(i*10);// 其余z index 为 0
        siblings[i].myIndex =  -(i*10);

    }
};





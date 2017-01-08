// 拖拽  down  move  up
// 鼠标距离div位置始终不变化

// 注意处理 1 快速拖动会失去焦点  2 会选中别的文字什么的  阻止默认事件
var oDiv = document.getElementsByTagName('div')[0];

oDiv.onmousedown =down;

function down(e){
    e=e||window.event;
    this.x = e.clientX-this.offsetLeft; // 保存鼠标距离div x
    this.y = e.clientY-this.offsetTop; // 保存鼠标距离div y

    // 处理快速移动 失去焦点
    document.onmousemove = move;

}
function move(e){
    e=e||window.event;

    oDiv.style.left = e.clientX-oDiv.x;

}

// ��ק  down  move  up
// ������divλ��ʼ�ղ��仯

// ע�⴦�� 1 �����϶���ʧȥ����  2 ��ѡ�б������ʲô��  ��ֹĬ���¼�
var oDiv = document.getElementsByTagName('div')[0];

oDiv.onmousedown =down;

function down(e){
    e=e||window.event;
    this.x = e.clientX-this.offsetLeft; // ����������div x
    this.y = e.clientY-this.offsetTop; // ����������div y

    // ��������ƶ� ʧȥ����
    document.onmousemove = move;

}
function move(e){
    e=e||window.event;

    oDiv.style.left = e.clientX-oDiv.x;

}

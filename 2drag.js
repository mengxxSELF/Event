/* ��ק �˶�
down  move up
 *  */

// ��������˶�
/*   ���˶���� ģ���ٶ� move��ʱ�� �ٶȱ仯  up֮����fly�˶�
������ʱ�� ����Ԫ��λ��
Ħ����
ע��߽��ж� ����֮��仯����
* */

// ���������˶�
/*  �˶�����ÿ�μ�9.8  ģ���ٶȱ仯Խ��Խ��
��move �޹� ��Up ֮������׹�˶� drop
 ������ʱ�� ����Ԫ��λ��
 Ħ����
 ע��߽��ж� ����֮��仯����
* */

// ���ķ�����ģʽ

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
    //    ��׼
        this.Move = processT(move,this)
        this.Up = processT(up,this)
        on(document,'mousemove',this.Move)
        on(document,'mouseup',this.Up)
        e.preventDefault();
    }

//    ��ԭ��ק�޹�

    fire.call(this,'selfdown',e); // ������
}


function move(e){
    this.style.left= e.clientX-this.posL+'px';
    this.style.top= e.clientY-this.posT+'px';

//     ��ԭ����ק�޹ش���
    fire.call(this,'selfmove',e); // ������
}


function up(){
    if(this.releaseCapture){
        this.releaseCapture();
        off(this,'mousemove',move)
        off(this,'mouseup',up)
    }else{
        // ��׼
        off(document,'mousemove',this.Move)
        off(document,'mouseup',this.Up)
    }
//     ��ԭ����ק�޹ش���
    fire.call(this,'selfup',e); // ������

}




function processT(obj,nowT){
    return function (e) {
        obj.call(nowT,e);
    }
}


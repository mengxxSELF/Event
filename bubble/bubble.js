/* �������ݵ���
* �������? ���λ�ò���?3������
* ��껮������? �����ݵ���
* */
// ����
~function () {
    // ���λ�ô�����������?
    for(var i=0;i<20;i++){
        var oDiv =document.createElement('div');
        oDiv.innerHTML=oDiv.index=i;
        document.body.appendChild(oDiv);
        utils.css(oDiv,{
            left:utils.rnd(0,utils.win('clientWidth')),
            top:utils.rnd(0,utils.win('clientHeight'))
        })
    }
    // �����ʼ���?
    var oStart = document.getElementsByTagName('span')[0];
    var aDivs = document.getElementsByTagName('div');
    oStart.onclick = function () {
        for(var i=0;i<aDivs.length;i++) {
            on(aDivs[i],'mousedown',down); // ����ť�󶨵���¼�?
            animate({
                id:aDivs[i],
                target:{
                    width:50,
                    height:50,
                    opacity:1
                },
                cb: function () {
                    // �ûص�����shine���� ֻ����һ�μ���
                    if(oStart.flag) return;
                    oStart.flag=true;
                    getAry();// ��������ʮ�������? ֻ����һ��
                    shine(); // ���������ť���
                }
            })
        }
    };

    // �������һ����ť���
    // ����һ��10�����ظ��������������? ���ո�������б��
    function getAry(){
        oStart['showAry']=[];
        while(oStart['showAry'].length<10){
            var cur = utils.rnd(0,aDivs.length-1);
            if(oStart['showAry'].indexOf(cur)==-1) {
                oStart['showAry'].push(cur)
            }; // ������ڲ���?
        }
    }
    function shine(){
        var i=0;
        var oP = document.getElementsByTagName('p')[0];
        timer = setInterval(function () {
            switch (i){
                case 7:
                    oP.style.display ='block';
                    oP.innerHTML='还有2次机会'
                    break;
                case 8:
                    oP.innerHTML='还有1次机会';
                    break;
                case 9:
                    oP.innerHTML='10次机会使用完毕';
                    clearTimeout(timer);
                    return;
            }
            for(var j=0;j<aDivs.length;j++){
                aDivs[j].style.background='skyblue';
            }
            oStart['showIndex'] = oStart['showAry'][i];// 记录当前显示的index
            aDivs[oStart['showIndex']].style.background='red';
            i++;// �ĸ�indexҪ��Ϊ��ɫ
        },1000)
    }
}();

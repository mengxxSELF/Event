/* ��� Ϊ��  on run off */
//  1 �����Դ���  IE�� this  ���ִ�� ˳��

// on �¼���
function on(obj,type,fn){
    if(obj.addEventListener){
        obj.addEventListener(type,fn,false); // ð�ݽ׶�
    }else{ // IE  1 this 2 ���ִ�� 3 ˳������
        //    ��fn�¼������Զ����¼�����  ��ϵͳ�¼����з���һ��run����
        if(!obj[type+'onEvent']){
            obj[type+'onEvent'] =[];
            obj.attachEvent('on'+type, function () {
                run.call(obj); // �ı�thisָ�򵽵�ǰԪ�� �������ʹ���������� ��Ϊ���run����һ���� ����Ҫ�ٽ����
            });
        }
        var onE = obj[type+'onEvent'];
        // �����Զ�������֮ǰ���ж��Ƿ��Ѿ����ڸ÷���
        for(var i=0;i<onE.length;i++){
            if(onE[i]==fn) return;
        }
        onE.push(fn);
        /*obj.attachEvent('on'+type,run);  ��һ��run��������ϵͳ�¼�����   Ҫע�� 1 run����this ָ������
         ���д���������attachEvent ��ͬһ��Ϊͬһ���� ���ִ������ �ᵼ��run ���������ִ��
         ����Ҫ�� �������ֻ��ִ��һ�ε�����  ���������Ǹ� �����Զ�������������ж���
         */

    }
}


// ���ڽ������еķ�������˳�����   ��ȡ���� ˳����� �ǵ� 1 this  2 �¼���������
function run(e){
    e=window.event; // ����run����ֻ��IE�µ���
    e.target =e.srcElement;

//    run �������е�this ָ��ǰԪ��
    var onE = this[e.type+'onEvent'];
    if(onE && onE.length){ // ���������з���ʱ �ŵ���
        for(var i=0;i<onE.length;i++){
            if( typeof onE[i] == 'function'){
                onE[i].call(this,e);
                // ������ÿһ���Ƿ���fn1 fn2  ��ʱĬ��thisΪonE����   ��Ҫ����this����  ���Ҵ�����ȷ���¼�����
            }else{
                // ��������Null��ʱ�� ����ɾ������
                onE.splice(i,1);
                i--;
            }

        }
    }
}


// off  �¼����  ���Զ����¼������� ��Ӧ���� ������
function off(obj,type,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(type,fn,false);
    }else{ // ie
        // ��ȡ���� ѭ������ ���д���
        var onE = obj[type+'onEvent'];
        if(onE && onE.length){
            for(var i=0;i<onE.length;i++){
                if(onE[i]==fn){
                    onE[i]=null; // ���ﲻ��ֱ��ɾ��  ��Ҫ����Ϊnull
                    return;
                }
            }
        }
    }
}
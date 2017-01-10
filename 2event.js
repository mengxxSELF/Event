

// on run off

// ���붩�ķ�����ģʽ

function on(obj,type,fn){
    if(/^self/i.test(type)){
    //     �Զ����¼����Ǹ�����  selfsmall
        if(!obj[type]){
            obj[type]=[];
        }
        var selfAry =obj[type];
    //     ��������֮ǰ�Ƚ��б���
        for(var i=0;i<selfAry.length;i++){
            if(selfAry[i]==fn) return;
        }
        selfAry.push(fn);
    }else{
        // ϵͳ�¼�
        if(obj.addEventListener){
            obj.addEventListener(type,fn,false);
        }else{
            //ie
            if(!obj[type+'onEvent']){
                obj[type+'onEvent']=[];
                obj.attachEvent('on'+type, function () {
                    run.call(obj)
                })
            }
            var onE =obj[type+'onEvent'];
            for(var i=0;i<onE.length;i++){
                if(onE[i]==fn) return;
            }
            onE.push(fn);
        }
    }
}

function run(e){
    e=window.event;
/*if(e.srcElement){
 e.target=e.srcElement;
 e.clientX = (document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
 e.clientY = (document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
 e.preventDefault= function (e) {
 e.returnValue=false;
 };
 e.stopPropagation= function (e) {
 e.cancelBubble=true;
 }
 }*/
    var onE = this[e.type+'onEvent']
    if(onE && onE.length){
        for(var i=0;i<onE.length;i++){
            if(typeof onE[i]=='function'){
                onE[i].call(this,e);
            }else{
                onE.splice(i,1);
                i--;
            }
        }
    }

}


function off(obj,type,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(type,fn,false);
    }else{
        var onE =obj[type+'onEvent'];
        if(onE && onE.length){
            for(var i=0;i<onE.length;i++){
                if( onE[i]==fn ){
                    onE[i]=null;
                    return;
                }
            }
        }
    }


}


// һ��ִ�ж��ĺõ������з���
function fire(type,e){
    var selfAry= this[type];
    if(selfAry && selfAry.length){
        for(var i=0;i<selfAry.length;i++){
            selfAry[i].call(obj,e);
        }
    }
}







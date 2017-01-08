/* 五合 为三  on run off */
//  1 兼容性处理  IE中 this  多次执行 顺序

// on 事件绑定
function on(obj,type,fn){
    if(obj.addEventListener){
        obj.addEventListener(type,fn,false); // 冒泡阶段
    }else{ // IE  1 this 2 多次执行 3 顺序问题
        //    将fn事件放入自定义事件数组  在系统事件池中放入一个run方法
        if(!obj[type+'onEvent']){
            obj[type+'onEvent'] =[];
            obj.attachEvent('on'+type, function () {
                run.call(obj); // 改变this指向到当前元素 这里可以使用匿名函数 因为这个run方法一旦绑定 不需要再解除了
            });
        }
        var onE = obj[type+'onEvent'];
        // 放入自定义数组之前先判断是否已经存在该方法
        for(var i=0;i<onE.length;i++){
            if(onE[i]==fn) return;
        }
        onE.push(fn);
        /*obj.attachEvent('on'+type,run);  将一个run方法放入系统事件池中   要注意 1 run方法this 指向问题
         如果写到这里，由于attachEvent 的同一行为同一方法 多次执行问题 会导致run 方法被多次执行
         所以要把 这个放在只会执行一次的里面  就是上面那个 创建自定义数组的条件判断中
         */

    }
}


// 用于将数组中的方法进行顺序调用   获取数组 顺序调用 记得 1 this  2 事件对象问题
function run(e){
    e=window.event; // 由于run方法只在IE下调用
    e.target =e.srcElement;

//    run 现在其中的this 指向当前元素
    var onE = this[e.type+'onEvent'];
    if(onE && onE.length){ // 当数组中有方法时 才调用
        for(var i=0;i<onE.length;i++){
            if( typeof onE[i] == 'function'){
                onE[i].call(this,e);
                // 数组中每一项是方法fn1 fn2  此时默认this为onE数组   需要处理this问题  并且传入正确的事件对象
            }else{
                // 当发现是Null的时候 进行删除操作
                onE.splice(i,1);
                i--;
            }

        }
    }
}


// off  事件解绑  将自定义事件数组中 对应方法 做处理
function off(obj,type,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(type,fn,false);
    }else{ // ie
        // 获取数组 循环查找 进行处理
        var onE = obj[type+'onEvent'];
        if(onE && onE.length){
            for(var i=0;i<onE.length;i++){
                if(onE[i]==fn){
                    onE[i]=null; // 这里不能直接删除  需要设置为null
                    return;
                }
            }
        }
    }
}
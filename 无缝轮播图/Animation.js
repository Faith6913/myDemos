/**
 * @Function createAnimation
 * @param {Object} options 
 * options = {
                from: number, // 开始的状态
                to: number, // 结束的状态
                ms: number, // 总的动画时间
                duration: umber, // 每一次小变化的间隔时间
                onmove: function(n){}, // 函数体中写每次小变化,n代表每次更改后的数
                onEnd: function(){},   // 函数体中写动画结束后的操作
              }
 */
function createAnimation(options) {
    var from = options.from; // 动画起始数据
    var to = options.to; // 动画结束数据
    var totalTime = options.ms || 2000;  // 动画总持续时间,默认为2s
    var duration = options.duration || 20; // 动画每次小变化持续时间,默认为15ms
    var times = totalTime / duration; // 动画从开始到结束要变化的次数
    var dis = (to - from) / times; // 动画每次小变化所要改变的长度
    var curtime = 0;
    var timeId = setInterval(function() {
        curtime ++; // 指示当前执行的次数,用以判断定时器结束
        from += dis;
        if(curtime >= times) {
            clearInterval(timeId);
            options.onmove && options.onmove(from);
            options.onEnd && options.onEnd();
            return;
        }
        options.onmove && options.onmove(from);
    }, duration);
}


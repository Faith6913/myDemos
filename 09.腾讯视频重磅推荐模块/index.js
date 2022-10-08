/* 初始化展示页面 */
var imgs = document.querySelector(".imgs");
var active_a = document.querySelector(".imgs .active");
var sideNav = document.querySelector(".sideNav");
var sideNav_a = document.querySelectorAll(".sideNav .nav");
var sideNav_span = document.querySelectorAll(".sideNav .nav span");
var index = 0;

function init() {
    // 先将数据中的图片资源传入到html中
    for(var i = 0; i < data.length; i++) {
        var title_a = document.createElement("a");
        title_a.target = "_blank";
        title_a.setAttribute("href", "#");
        title_a.setAttribute("title", data[i].title+":"+data[i].desc);
        title_a.setAttribute("style", "background: url("+data[i].img+") no-repeat");
        imgs.append(title_a);
        
        // 初始化界面,需要将右侧视频title和解释传入span和a标签中
        sideNav_a[i].append(data[i].desc);
        sideNav_span[i].innerText = data[i].title;
    }
    start();
}

function changeBg(index) {
    var imgs = document.querySelector(".imgs");
    var active_a = document.querySelector(".imgs .active");
    if(active_a){
        active_a.className = "";
    }
    imgs.children[index].className = "active";
    for(var i = 0; i < imgs.children.length; i ++){
        if((sideNav_a[i].style.fontSize === "16px") && (i !== index)){
            sideNav_a[i].style.fontSize = "0";
            sideNav_span[i].style.fontSize = "16px";
            sideNav_span[i].style.fontWeight = "normal";
            sideNav_span[i].style.color = "rgba(255, 255, 255, 0.7)";
        }
    }
    sideNav_a[index].style.fontSize = "16px";
    sideNav_span[index].style.fontSize = "22px";
    sideNav_span[index].style.fontWeight = "bold";
    sideNav_a[index].style.color = "#ff5c38";
    sideNav_span[index].style.color = "#ff5c38";
}

/* 定时间隔轮播效果 */
var timeId;

function start(){
    if(timeId){
        return;
    }
    timeId = setInterval(function() {
        index ++;
        if(index >= data.length){
            index = 0;
        }
        changeBg(index);
        
    }, 2000);
}

function stop(){
    clearInterval(timeId);
    timeId = null;
}

/* 程序入口以及事件监听 */
init();
changeBg(index);
for(let i = 0; i < sideNav_a.length; i ++){
    sideNav_a[i].addEventListener("mouseenter", function(e){
        index = i;
        changeBg(index);
        stop();
    });
}
for(let i = 0; i < sideNav_a.length; i ++){
    sideNav_a[i].addEventListener("mouseleave", function(e){
        start();
    });
}


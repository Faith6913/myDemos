var imgNumber = 5;
var imgs = document.querySelectorAll(".container img");
var imgContainer = document.querySelector(".imgs");
var navContainer = document.querySelector(".nav");
var curIndex = 0;
var leftArrow = document.querySelector(".left-arrow");
var rightArrow = document.querySelector(".right-arrow");
/**
 * 初始化函数
 * 1. 将图片容器的宽度设置为calc(500px * 5)
 * 2. 将图片形成dom添加进html结构中
 * 3. 设置默认的active序号
 * <img src="./img/Wallpaper1.jpg" alt="">
 * <div class="each-nav"></div>
 */
function init() {
    imgContainer.style.width = "calc(500px * " + (imgNumber + 1) + ")";
    for(var i = 0; i < imgNumber + 1; i ++){
        var img = document.createElement("img");
        var eachNav = document.createElement("div");
        if(i === imgNumber){
            img.setAttribute("src", "./img/Wallpaper1.jpg");
            imgContainer.appendChild(img);
            break;
        }
        img.setAttribute("src", "./img/Wallpaper"+ (i + 1) +".jpg");
        eachNav.className = "each-nav";
        imgContainer.appendChild(img);
        navContainer.appendChild(eachNav);
        if(i === 0){
            eachNav.className = "each-nav active";
        }
    }
}


/**
 * moveTo(index)函数
 * 该函数完成从当前图片以动画形式运动到index索引图片
 * 1. 通过margin-left: -500px * index设置显示的图片
 * 2. 改变index个横向条类名是active,其余的删除active类
 */
function moveTo(index){
    var activeNav = document.querySelector("div.active");
    if(index >= imgContainer.children.length){
        return;
    }
    activeNav.classList.remove("active");
    createAnimation({
        from: 500 * curIndex,
        to: 500 * index,
        ms: 400,
        onmove: function(n){
            imgContainer.style.marginLeft = "-" + (n) + "px";
        },
    });
    if(index === imgContainer.children.length - 1){
        navContainer.children[0].classList.add("active");
        curIndex = 0;
    }else{
        navContainer.children[index].classList.add("active");
        curIndex = index;
    }
}

/**
 * toNext()函数,到下一张的动画效果
 */
function toNext() {
    var newIndex = curIndex + 1;
    moveTo(newIndex);
}

/**
 * pre()函数,到上一张的动画效果
 */
 function pre() {
    var activeNav = document.querySelector("div.active");
    var newIndex = curIndex - 1;
    if(newIndex < 0){
        curIndex = 4;
        activeNav.classList.remove("active");
        navContainer.children[4].classList.add("active");
        imgContainer.style.marginLeft = "-" + (500 * (curIndex + 1)) + "px";
        createAnimation({
            from: 500 * (curIndex+1),
            to: 500 * curIndex,
            ms: 400,
            onmove: function(n){
                imgContainer.style.marginLeft = "-" + (n) + "px";
            },
        });
        return;
    }
    moveTo(newIndex);
}

init();

var timeId = setInterval(function(){
    toNext();
},2000);

imgContainer.onmousemove = function(){
    clearInterval(timeId);
    timeId = null;
}
imgContainer.onmouseleave = function(){
    if(timeId){
        return;
    }
    timeId = setInterval(function(){
        toNext();
    },2000);
}

leftArrow.onclick = function(){
    pre();
    clearInterval(timeId);
    timeId = null;
}
rightArrow.onclick = function(){
    toNext();
    clearInterval(timeId);
    timeId = null;
}

navContainer.addEventListener("click", function(e){
    var navs = document.querySelectorAll(".each-nav");
    for(var i = 0; i < navs.length; i ++){
        if(e.target === navs[i]){
            moveTo(i);
        }
    }
});
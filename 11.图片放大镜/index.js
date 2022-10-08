var container = document.querySelector(".container");
var imgList = document.querySelector(".img-select .imgs");
var imgLittles = document.querySelectorAll("ul li");
var leftImg = document.querySelector(".left");
var rightImg = document.querySelector(".right");
var mask = document.querySelector(".mask");
var imgIndex = ["A","B","C"];

imgList.addEventListener("click", function(e){
    for(var i = 0; i < imgLittles.length; i ++){
        imgLittles[i].className = "";
        if(e.target === imgLittles[i]){
            var img = imgIndex[i];
            imgLittles[i].className = "selected";
            leftImg.style.backgroundImage = "url(./images/img"+ img +"_2.jpg)";
            rightImg.style.backgroundImage = "url(./images/img"+ img +"_3.jpg)";
        }
    }
});

leftImg.addEventListener("mousemove", function(e){
    mask.style.display = "block";
    rightImg.style.opacity = 1;
    var x = e.clientX - leftImg.offsetLeft - (mask.offsetWidth / 2);
    var y = e.clientY - leftImg.offsetTop - (mask.offsetHeight / 2);
    mask.style.left = x + "px";
    mask.style.top = y + "px";
    rightImg.style.backgroundPositionX = -x + "px";
    rightImg.style.backgroundPositionY = -y + "px";
    if(x > (leftImg.offsetWidth - mask.offsetWidth)){
        mask.style.left = leftImg.offsetWidth - mask.offsetWidth + "px";
        rightImg.style.backgroundPositionX = -(leftImg.offsetWidth - mask.offsetWidth) + "px";
    }
    if(y > (leftImg.offsetHeight - mask.offsetHeight)){
        mask.style.top = leftImg.offsetHeight - mask.offsetHeight + "px";
        rightImg.style.backgroundPositionY = -(leftImg.offsetHeight - mask.offsetHeight) + "px";
    }
    if(x < 0){
        mask.style.left = "0";
        rightImg.style.backgroundPositionX = "0px";
    }
    if(y < 0){
        mask.style.top = "0";
        rightImg.style.backgroundPositionY = "0px";
    }
});
leftImg.addEventListener("mouseleave", function(){
    mask.style.display = "none";
    rightImg.style.opacity = 0;
});
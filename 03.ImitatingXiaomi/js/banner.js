(function () {
  // 完成横幅区的图片切换
  // 横幅区数据
  var datas = [
    {
      img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/15c05b32cf948b594477dfc3eb69fb69.jpg?w=2452&h=920',
      link: 'https://www.mi.com/mi11le-5g-ne',
    },
    {
      img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a532e33470d046b3f044d5ea49fc5e9e.png?thumb=1&w=2452&h=920&f=webp&q=90',
      link: 'https://www.mi.com/xiaomipad5',
    },
    {
      img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/918820682e4a490221cfd92b24c14b86.jpg?thumb=1&w=2452&h=920&f=webp&q=90',
      link: 'https://www.mi.com/a/h/22033.html?sign=b60a6ca9167bce2d1ed8ee319cf83c75',
    },
    {
      img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/af7be8f65065f405f57f46a02731f78d.jpg?thumb=1&w=2452&h=920&f=webp&q=90',
      link: 'https://www.mi.com/a/h/22812.html?sign=aab397a7ecf2ae4c1765e9d11fdccca6',
    },
  ];
  
  /* 
    1. 根据横幅图片的个数动态生成圆点
    2. 将指定下标的数据显示在页面上
    3. 控制点击事件切换下标
  */
 var bannerDots = $(".banner .banner-dots");
 var leftArrow = $(".banner .banner-pointer.banner-pointer-left");
 var rightArrow = $(".banner .banner-pointer.banner-pointer-right");
 var index = 0;
 var banner = $(".banner");
 function $(selector){
  return document.querySelector(selector);
 }
 /**
  * 初始化
  */
 function init(){
  for(var i = 0; i < datas.length; i ++){
    var span = document.createElement("span");
    span.className = "fl";
    bannerDots.appendChild(span);
  }
 }

 /** 
  * 将指定下标的数据显示到页面上
  * @param {number} index 要设置的数据索引 
 */
 function change(index){
  var spans = document.querySelectorAll(".banner .banner-dots span");
  var bannerA = $(".banner .banner-cover");
  var bannerImg = $(".banner .banner-cover img");
  spans[index].className = "banner-dots-selected fl";
  bannerImg.src = datas[index].img;
  bannerA.href = datas[index].link;
 }

  /** 
  * 将指定下标数据之外的数据的样式清除
  * @param {number} index 要设置的数据索引 
 */
  function clearStyle(index){
    var spans = document.querySelectorAll(".banner .banner-dots span");
    for(var i = 0; i < spans.length; i ++){
      if(i === index){
        continue;
      }else{
        spans[i].className = "fl";
      }
    }
  }

  /** 
  * 切换到下一张
 */
  function toNext(){
    if(index === datas.length - 1){
      index = 0;
    }else{
      index ++;
    }
    change(index);
    clearStyle(index);
  }


  /** 
  * 切换到上一张
 */
   function topre(){
    if(index === 0){
      index = datas.length - 1;
    }else{
      index --;
    }
    change(index);
    clearStyle(index);
  }



 /** 
  * 鼠标点击事件
 */
 init();
 change(index);
 leftArrow.onclick = function(){
  topre();
 }

 rightArrow.onclick = function(){
  toNext();
 }

 bannerDots.addEventListener("click", function(e){
  var spans = document.querySelectorAll(".banner .banner-dots span");
  for(var i = 0; i < spans.length; i ++){
    if(e.target === spans[i]){
      index = i;
      clearStyle(index);
      change(index);
    }
  }
 });

 /**
  * 自动播放
  */
 var timeId;
 function start(){
  if(timeId){
    return;
  }
  timeId = setInterval(toNext, 1500);
 }

 function stop(){
  clearInterval(timeId);
  timeId = null;
 }
 start();
 banner.onmouseenter = stop;
 banner.onmouseleave = start;

})();

 
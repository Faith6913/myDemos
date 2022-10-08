var bg = document.querySelector(".board .panel .bg");
var round = document.querySelector(".board .panel .round");
var result = document.querySelector(".board .panel .result");
var selcetImg = document.createElement("div");

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}
function refresh(){
    var dic = document.querySelector(".dictionary");
    var sameImgIndex = getRandom(0,15);
    dic.innerHTML = "";
    selcetImg.innerHTML = "<span><img src=\"./images/values/"+ sameImgIndex +".png\" alt=\"\"></span>";
    round.style.display = "block";
    result.style.display = "none";
    round.style.transform = "rotate(0deg)";
    bg.style.transform = "rotate(0deg)";
    bg.style.transition = "all 3s ease-in-out";
    for(var i = 0; i < 20; i ++){
        const space = 20;
        for(var j = 0; j < 5; j ++){
            var newSym = document.createElement("div");
            var randomImgIndex = getRandom(0, 15);
            newSym.className = "sym";
            if((i + j * space) % 9 === 0){  
                newSym.innerHTML = "<span>"+ (i + j * space) +"</span><span><img src=\"./images/values/"+ sameImgIndex +".png\" alt=\"\"></span>";
                dic.appendChild(newSym);
            }else{
                newSym.innerHTML = "<span>"+ (i + j * space) +"</span><span><img src=\"./images/values/"+ randomImgIndex +".png\" alt=\"\"></span>";
                dic.appendChild(newSym);
            }
        }
    }
    result.appendChild(selcetImg);
}

refresh ();


round.addEventListener("click", function(e) {
    round.style.transform = "rotate(720deg)";
    bg.style.transform = "rotate(-720deg)";
    setTimeout(function() {
        round.style.display = "none";
        result.style.display = "block";
        window.addEventListener("click", again);
    }, 3000);
});
var again = function() {
    alert("再玩一次？");
    refresh();
    window.removeEventListener("click", again);
}
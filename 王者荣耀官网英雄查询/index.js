(async () => {
  /**
   * 从网络获取当前的英雄数据
   * @returns Promise
   */
  async function getHeroes() {
    return fetch("https://study.duyiedu.com/api/herolist")
      .then((resp) => resp.json())
      .then((resp) => resp.data.reverse());
  }
  const doms = {
    ul: document.querySelector(".heroes-list"),
    searchCenter: document.querySelector(".search-center"),
    radios: document.querySelectorAll(".radio"),
    input: document.querySelector(".search-right input")
  };

  // 一、初始化界面
  // 获取英雄数据,根据英雄数据生成HTML列表li结构添加到ul列表中
  const allHeroes = await getHeroes();
  
  function setHeroHTML(heroArr) {
    const heroHTML = heroArr
      .map((hero) => {
        return `<li>
                <a href="https://pvp.qq.com/web201605/herodetail/${hero.ename}.shtml" target="_blank">
                  <img src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/${hero.ename}/${hero.ename}.jpg" alt="">
                  <span>${hero.cname}</span>
                </a>
              </li>`;
      })
      .join("");
    doms.ul.innerHTML = heroHTML;
  }
  setHeroHTML(allHeroes);

  // 二、交互功能
  // 1. 需要做那些事情
  // 2. 怎么完成这些事情
  doms.searchCenter.addEventListener("click", (e) => {
    if(Array.prototype.slice.call(doms.radios).includes(e.target)){
      const targetValue = e.target.dataset.value;
      let newHeroArr = filterHeroArr(Number(e.target.dataset.value));
      setChoose(e.target);
      switch (targetValue) {
        case 'all':
          setHeroHTML(allHeroes);
          break;
        case 'new':
          newHeroArr = filterHeroArr(11);
          setHeroHTML(newHeroArr);
          break;
        case 'free':
          newHeroArr = filterHeroArr(10);
          setHeroHTML(newHeroArr);
          break;
        default:
          setHeroHTML(newHeroArr);
      }
    }
  });
  doms.input.addEventListener('input', function () {
    const searchKeywords = this.value;
    setChoose(doms.radios[2]);
    debounced(() => {
      setHeroHTML(filterHeroArr(searchKeywords))
    }, 200)();
  });

  /**
   * 根据传入的英雄编号筛选英雄并将其放入一个新数组中
   * @param {Number} hero_type 
   * @returns {Array}
   */
  function filterHeroArr(hero_type){
    console.log(typeof hero_type);
    if(typeof(hero_type) === 'number'){
      return allHeroes.filter((hero) => {
        if((hero_type === 10) || (hero_type === 11)){
          return hero.pay_type === hero_type;
        }else{
          return (hero.hero_type === hero_type) || (hero.hero_type2 === hero_type);
        }
      });
    }else{
      return allHeroes.filter((hero) => {
        return hero.cname.includes(hero_type);
      });
    }
  }
  function setChoose(radioDom) {
    const checkedNow = document.querySelector("div.checked");
    if(checkedNow !== radioDom){
      checkedNow.classList.remove("checked");
      radioDom.classList.add("checked");
    }
  }
  
  function debounced(fn, delay){
    var timeId;
    return function(){
        var args = Array.prototype.slice.call(arguments);
        clearTimeout(timeId);
        timeId = setTimeout(function(){
            fn.apply(this,args);
        }, delay);
    };
  }



})();

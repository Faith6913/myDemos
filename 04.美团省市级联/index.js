(async () => {
  /**
   * 远程获取省市区数据，当获取完成后，得到一个数组
   * @returns Promise
   */
  async function getDatas() {
    return fetch('https://study.duyiedu.com/api/citylist')
      .then((resp) => resp.json())
      .then((resp) => resp.data);
  }

  const doms  = {
    titles: document.querySelectorAll(".title"),
    options: document.querySelectorAll(".options"),
    icons: document.querySelectorAll(".select .title i"),
  };
  let curProvince = 0;
  let curCity = 0;
  const _toArray_ = (obj) => Array.prototype.slice.call(obj);

  // 初始化
  /* 
    1. 将省份信息添加到ul中
    2. 设置城市和地区的灰色状态
  */
  const datas = await getDatas();
  console.log(datas);
  /**
   * 
   * @param {Array} datas 
   * @param {Number} index 0: province, 1: city, 2: area
   */
  function setOptions(data, index){
    let indexHTML;
    switch (index) {
      case 0: 
        indexHTML = data.map((province) => {
          return `<li>${province.label}</li>`;
        }).join("");
        break;
      case 1: 
        indexHTML = datas[curProvince].children.map((city) => {
          return `<li>${city.label}</li>`;
        }).join('');
        break;
      case 2 :
        indexHTML = datas[curProvince].children[curCity].children.map((city) => {
          return `<li>${city.label}</li>`;
        }).join('');
        break;
    }
    doms.options[index].innerHTML = indexHTML;
  }

  doms.titles[0].classList.remove("none-selected");
  setOptions(datas, 0);
  

  // 交互事件
  // ul框展示关闭功能以及箭头上下翻转功能
  doms.titles.forEach((title) => {
    title.addEventListener("click", () => {
      let index = _toArray_(doms.titles).indexOf(title);
      if(title.classList.length > 1){
      }else{
        if(doms.options[index].classList[1] === 'close'){
          const opened = document.querySelector(".open");  
          if(opened){
            closeOption(_toArray_(doms.options).indexOf(opened));
          }
          openOption(index);
        }else{
          closeOption(index);
        }
      }
    });
  });

  // li 点击功能
  doms.options.forEach((option) => {
    option.addEventListener("click", (e) => {
      if(!e.target.children.length){
        const optionIndex = _toArray_(doms.options).indexOf(e.target.parentElement);
        setActive(e.target);
        closeOption(optionIndex);
        doms.titles[optionIndex].children[0].innerHTML = e.target.innerHTML;
        if(optionIndex === 0){
          doms.titles[1].children[0].innerHTML = "请选择城市";
          doms.titles[2].classList.add("none-selected");
          doms.titles[2].children[0].innerHTML = "请选择地区";
          curProvince = _toArray_(doms.options[optionIndex].children).indexOf(e.target);
          doms.titles[1].classList.remove("none-selected");
          setOptions(datas, 1);
        }else if(optionIndex === 1){
          doms.titles[2].classList.remove("none-selected");
          doms.titles[2].children[0].innerHTML = "请选择地区";
          curCity = _toArray_(doms.options[optionIndex].children).indexOf(e.target);
          setOptions(datas, 2);
        }
      }
    });
  });
  function setActive(liDom){
    const activeDoms = document.querySelectorAll("li.active");
    for(const dom of activeDoms){
      if(dom && (liDom.parentElement === dom.parentElement)){
        dom.classList.remove("active");
      }
    }
    liDom.classList.add("active");
  }
  function openOption(index){
    doms.icons[index].style.transform = "rotate(180deg)";
    doms.options[index].classList.remove("close");
    doms.options[index].classList.add("open");
  }
  function closeOption(index){
    doms.icons[index].style.transform = "rotate(0deg)";
    doms.options[index].classList.remove("open");
    doms.options[index].classList.add("close");
  }
})();
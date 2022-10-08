(() => {
  /**
   * 从网络获取歌词数据
   * @returns Promise
   */
  async function getLrc() {
    return await fetch("https://study.duyiedu.com/api/lyrics")
      .then((resp) => resp.json())
      .then((resp) => resp.data);
  }
  const doms = {
    ul: document.querySelector(".lyr-container"),
    audio: document.querySelector("audio"),
    lyrics: null,
  };

  let lrcData;
  // 初始化界面
  // const init = () => {
  //   let time = [];
  //   getLrc().then((resp) => {
  //     const timeReg = /\[\d\d:\d\d.\d\d\]/g;
  //     const lrc = resp.split(timeReg).map((r) => {
  //       return `<li>${r.slice(0, -1)}</li>`;
  //     });
  //     doms.ul.innerHTML = lrc.join('\n');
  //   });
  // };
  async function init() {
    const lrc = await getLrc();
    // 将lrc变成[ {time: xxxx, words: xxxx}, {} ...]的格式
    console.log(lrc);
    lrcData = lrc.split('\n')
      .filter((s) => s !== '')
      .map((item) => {
        return {
          time: item.slice(0, 10),
          words: item.slice(10),
        };
      });
    const wordsArr = lrcData.map((obj) => {
      return `<li>${obj.words}</li>`;
    });
    const timeArr = lrcData.map((obj) => {
      return `${obj.time}`;
    });
    doms.ul.innerHTML = wordsArr.join("");
    doms.lyrics = document.querySelectorAll(".lyr-container li");
  }
    // 交互设计
    const setLight = () => {
      const curTime = getCurSec(doms.audio);
      for(const item of doms.lyrics){
        item.classList.remove("active");
      }
      for(let i = 0; i < lrcData.length - 1; i ++){
        let thisSec = formatTime(lrcData[i].time);
        let nextSec = formatTime(lrcData[i + 1].time);
       
        if(thisSec <= (curTime + 0.3)  &&  nextSec > curTime + 0.3){
          doms.lyrics[i].classList.add("active");
          move(i);
        }

      }
    }
    const getCurSec = (aud) => {
      return aud.currentTime;
    }


  async function main() {
    await init();
    console.log("主程序开始");
    doms.audio.addEventListener("timeupdate", setLight);
  }


  main();
  
  function move(index){
    if(index <= 6){
      for(const li of doms.lyrics){
        li.style.transform = ``;
      }
    }else{
      for(const li of doms.lyrics){
        li.style.transform = `translateY(-${30 * (index - 6)}px)`;
      }
    }
  }





  console.log(formatTime('[01:13.15]'));

/**
 * 格式化时间函数,将时间字符串转化为秒数
 * @param {String} str 
 * @returns {Number} sec
 */
  function formatTime(str){
    const minute = Number(str.slice(1, 3));
    const sec = Number(str.slice(4, -1));
    return (minute * 60 + sec);
  }
})();


/* 
  [00:01.06]难念的经
  [00:03.95]演唱：周华健
  [00:06.78]
  [00:30.96]笑你我枉花光心计
  [00:34.15]爱竞逐镜花那美丽
  [00:36.75]怕幸运会转眼远逝
  [00:39.32]为贪嗔喜恶怒着迷
  [00:41.99]责你我太贪功恋势
  [00:44.48]怪大地众生太美丽
  [00:47.00]悔旧日太执信约誓
  [00:49.66]为悲欢哀怨妒着迷
  [00:52.56]啊 舍不得璀灿俗世
  [00:57.66]啊 躲不开痴恋的欣慰
  [01:02.86]啊 找不到色相代替
  [01:08.09]啊 参一生参不透这条难题
  [01:13.15]吞风吻雨葬落日未曾彷徨
  [01:15.73]欺山赶海践雪径也未绝望
  [01:18.23]拈花把酒偏折煞世人情狂
  [01:20.90]凭这两眼与百臂或千手不能防
  [01:23.76]天阔阔雪漫漫共谁同航
  [01:26.09]这沙滚滚水皱皱笑着浪荡
  [01:28.68]贪欢一刻偏教那女儿情长埋葬
  [01:32.38]
  [01:34.09]吞风吻雨葬落日未曾彷徨
  [01:36.50]欺山赶海践雪径也未绝望
  [01:39.07]拈花把酒偏折煞世人情狂
  [01:41.69]凭这两眼与百臂或千手不能防
  [01:44.68]天阔阔雪漫漫共谁同航
  [01:46.93]这沙滚滚水皱皱笑着浪荡
  [01:49.54]贪欢一刻偏教那女儿情长埋葬
  [01:53.41]
  [02:15.45]笑你我枉花光心计
  [02:18.53]爱竞逐镜花那美丽
  [02:21.14]怕幸运会转眼远逝
  [02:23.76]为贪嗔喜恶怒着迷
  [02:26.43]责你我太贪功恋势
  [02:28.98]怪大地众生太美丽
  [02:31.60]悔旧日太执信约誓
  [02:34.26]为悲欢哀怨妒着迷
  [02:36.90]啊 舍不得璀灿俗世
  [02:42.04]啊 躲不开痴恋的欣慰
  [02:47.34]啊 找不到色相代替
  [02:52.52]啊 参一生参不透这条难题
  [02:57.47]吞风吻雨葬落日未曾彷徨
  [03:00.05]欺山赶海践雪径也未绝望
  [03:02.64]拈花把酒偏折煞世人情狂
  [03:05.27]凭这两眼与百臂或千手不能防
  [03:08.22]天阔阔雪漫漫共谁同航
  [03:10.49]这沙滚滚水皱皱笑着浪荡
  [03:13.06]贪欢一刻偏教那女儿情长埋葬
  [03:18.45]吞风吻雨葬落日未曾彷徨
  [03:20.90]欺山赶海践雪径也未绝望
  [03:23.54]拈花把酒偏折煞世人情狂
  [03:26.21]凭这两眼与百臂或千手不能防
  [03:29.07]天阔阔雪漫漫共谁同航
  [03:31.32]这沙滚滚水皱皱笑着浪荡
  [03:33.92]贪欢一刻偏教那女儿情长埋葬
  [03:39.32]吞风吻雨葬落日未曾彷徨
  [03:41.84]欺山赶海践雪径也未绝望
  [03:44.38]拈花把酒偏折煞世人情狂
  [03:47.04]凭这两眼与百臂或千手不能防
  [03:49.99]天阔阔雪漫漫共谁同航
  [03:52.20]这沙滚滚水皱皱笑着浪荡
  [03:54.89]贪欢一刻偏教那女儿情长埋葬
  [04:00.28]吞风吻雨葬落日未曾彷徨
  [04:02.68]欺山赶海践雪径也未绝望
  [04:05.25]拈花把酒偏折煞世人情狂
  [04:07.90]凭这两眼与百臂或千手不能防
  [04:10.85]天阔阔雪漫漫共谁同航
  [04:13.08]这沙滚滚水皱皱笑着浪荡
  [04:15.75]贪欢一刻偏教那女儿情长埋葬
  [04:19.48]
*/
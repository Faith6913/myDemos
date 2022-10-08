// 注入攻击!!!!!!!!
(async () => {
  const resp = await netAPI.profile();
  const user = resp.data;

  const doms = {
    aside: {
        loginId: $("#loginId"),
        nickname: $("#nickname"),
    },
    close: $(".container .close"),
    chatContainer: $(".chat-container"),
    msgInput: $("#txtMsg"),
    btnSend: $(".msg-container button"),
  };

  if(resp.code !== 0){
    alert('登录失败或登录已过期,请重新登录');
    location.href = "./login.html";
    return;
  }
  doms.close.addEventListener('click', ()=>{
    netAPI.loginOut();
    location.href = "./login.html";
  });
  function setUserInfo(){
    // 不用innerHTML 是为了防止注入攻击,后端没对用户的输入进行处理的话，就会对页面造成混乱
    doms.aside.loginId.innerText = user.loginId;
    doms.aside.nickname.innerText = user.nickname;
  }

  setUserInfo();


  // 这里是初始化聊天记录
  const history = await netAPI.getHistory();
  for(const record of history.data){
    if(record.from){
        sendOneMsg(record.content);
    }else{
        receiveOneMsg(record.content);
    }
  }



  doms.btnSend.addEventListener("click", async function(e) {
    e.preventDefault();
    let msg = doms.msgInput.value;
    if(!msg){
        return;
    }
    // 1. 将消息内容转换成HTML添加到 .me DOM元素中
    sendOneMsg(msg);
    scrollBottom();
    // 2. 将获取到的回复信息转换成HTML添加到页面中去
    const resp = await netAPI.sendMsg(msg);
    receiveOneMsg(resp.data.content);
    scrollBottom();
  });

  function sendOneMsg(msg){
    const meSg = $$$("div");
    let sendHtml = `<img class="chat-avatar" src="./asset/avatar.png" />
    <div class="chat-content">${msg}</div>
    <div class="chat-date">${formatTime()}</div>`; 
    meSg.classList.add("chat-item");
    meSg.classList.add("me");
    meSg.innerHTML = sendHtml;
    doms.chatContainer.appendChild(meSg);
    doms.msgInput.value = '';
  }
  function receiveOneMsg(msg){
    const meSg = $$$("div");
    let sendHtml = `<img class="chat-avatar" src="./asset/robot-avatar.jpg" />
    <div class="chat-content">${msg}</div>
    <div class="chat-date">${formatTime()}</div>`; 
    meSg.classList.add("chat-item");
    meSg.innerHTML = sendHtml;
    doms.chatContainer.appendChild(meSg);
  }

  function formatTime(){
    const __PADDING__ = function(num, wei){
        return String(num).padStart(wei, "0");
    };
    const time = new Date();
    const year = __PADDING__(time.getFullYear(), 2);
    const month = __PADDING__(time.getMonth() + 1, 2);
    const day = __PADDING__(time.getDate(), 2);
    return `${year}-${month}-${day} ${__PADDING__(time.getHours(), 2)}:${__PADDING__(time.getMinutes(), 2)}:${__PADDING__(time.getSeconds(), 2)}`;
  }


  function scrollBottom(){
    console.log(doms.chatContainer);
    const numDoms = doms.chatContainer.children.length;
    let scrTop = 0;
    for(let item of doms.chatContainer.children){
      scrTop += (Number(getComputedStyle(item,"height").getPropertyValue("height").slice(0,-2)) + 15);
    }
    doms.chatContainer.scrollTo(0,scrTop);
  }
  scrollBottom();

})();


/* 
<div class="chat-item me">
    <img class="chat-avatar" src="./asset/avatar.png" />
    <div class="chat-content">你几岁啦？</div>
    <div class="chat-date">2022-04-29 14:18:13</div>
</div>
<div class="chat-item">
    <img class="chat-avatar" src="./asset/robot-avatar.jpg" />
    <div class="chat-content">讨厌，不要随便问女生年龄知道不</div>
    <div class="chat-date">2022-04-29 14:18:16</div>
</div>
*/
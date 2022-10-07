const loginIdValidator = new FormValidator("txtLoginId", async function (val) {
  if (!val) {
    return "请填写账号"; // 验证不通过时的错误信息
  } else if (val.length <= 3 || val.length >= 17) {
    return "账号长度须在3 ~ 16位之间";
  }
});

const loginPwdValidator = new FormValidator("txtLoginPwd", function (val) {
  if (!val) {
    return "请填写密码"; // 验证不通过时的错误信息
  }
});
const validatorArray = [
  loginIdValidator,
  loginPwdValidator
];
const loginForm = $(".user-form");
loginForm.onsubmit = async function (e) {
  console.log("Submitting");
  e.preventDefault(); // 表单提交默认是刷新页面,这样阻止表单默认事件，用AJAX处理提交事件
  await FormValidator.validate(...validatorArray).then(async (r) => {
    if (!r) {
      return;
    }
    // 1. 将表单数据提交到服务器进行注册
    const formData = new FormData(loginForm); // 传入一个表单，得到一个表单对象
    const regUser = Object.fromEntries(formData.entries());
    const resp = await netAPI.login(regUser);
    if (resp.code === 0) {
      alert("登录成功");
      // 2. 跳转到登录界面
      location.href = "./index.html";
    }else{
        loginPwdValidator.input.value = "";
        loginIdValidator.errContainer.innerText = "登陆失败,请检查账号密码";
    }
  });
};

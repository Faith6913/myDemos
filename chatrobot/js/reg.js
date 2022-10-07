const loginIdValidator = new FormValidator("txtLoginId", async function (val) {
  if (!val) {
    return "请填写账号"; // 验证不通过时的错误信息
  } else if (val.length <= 3 || val.length >= 17) {
    return "账号长度须在3 ~ 16位之间";
  }
  const resp = await netAPI.exists(val); // async 和 await 就是解决了回调麻烦的问题！
  if (resp.data) {
    return "该账号已被占用,请重新输入账号";
  }
});

const nicknameValidator = new FormValidator("txtNickname", function (val) {
  if (!val) {
    return "请填写昵称"; // 验证不通过时的错误信息
  }
});

const loginPwdValidator = new FormValidator("txtLoginPwd", function (val) {
  if (!val) {
    return "请填写密码"; // 验证不通过时的错误信息
  }
});
const assurePwdValidator = new FormValidator("txtLoginPwdConfirm", function (
  val
) {
  if (!val) {
    return "请填写密码"; // 验证不通过时的错误信息
  }
  if (!(val === loginPwdValidator.input.value)) {
    return "两次密码输入不一致";
  }
});

const validatorArray = [
  loginIdValidator,
  nicknameValidator,
  loginPwdValidator,
  assurePwdValidator,
];

const regForm = $(".user-form");
regForm.onsubmit = async function (e) {
  console.log("Submitting");
  e.preventDefault(); // 表单提交默认是刷新页面,这样阻止表单默认事件，用AJAX处理提交事件
  await FormValidator.validate(...validatorArray).then(async (r) => {
    if (!r) {
      return;
    }
    // 1. 将表单数据提交到服务器进行注册
    // const regUser = {
    //   loginId: loginIdValidator.input.value,
    //   nickname: nicknameValidator.input.value,
    //   loginPwd: loginPwdValidator.input.value,
    // };
    // const resp = await netAPI.reg(regUser);
    const formData = new FormData(regForm);  // 传入一个表单，得到一个表单对象
    const regUser = Object.fromEntries(formData.entries());
    const resp = await netAPI.reg(regUser);
    // console.log(formData.get());
    if(resp.code === 0){
        alert("注册成功");
        // 2. 跳转到登录界面
        location.href = "./login.html";
    }
  });
};





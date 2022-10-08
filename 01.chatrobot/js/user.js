// 用户注册和登录的表单项验证的通用代码

/**
 * 某一个表单项的验证
 */
class FormValidator {
  constructor(inputId, validatorFunc) {
    this.input = $("#" + inputId);
    this.errContainer = this.input.nextElementSibling;
    this.validatorFunc = validatorFunc;

    // 失去焦点的时候进行验证
    this.input.onblur = () => {
      this.validate();
    };
  }

  /**
   * 验证函数，成功返回true，失败返回false
   */
  async validate() {
    let errMsg = await this.validatorFunc(this.input.value);
    this.errContainer.innerHTML = "";
    if (errMsg) {
      this.errContainer.innerHTML = errMsg;
      return false;
    } else {
      return true;
    }
  }

  // 静态方法，可以用类直接调用
  // 其他的方法是原型方法，是通过实例来调用的
  static async validate(...validators) {
    /*     const proms = validators.map((validator) => {
      return validator.validate();
    }); 
    */
    const proms = validators.map((validator) => validator.validate());
    // proms中的promise全部成功才成功，有一个失败则失败
    const result = await Promise.all(proms);
    return result.every((r) => r);
  }
}



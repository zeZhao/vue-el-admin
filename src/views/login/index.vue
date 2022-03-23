<template>
  <div class="login-container">
    <div class="content clearfix">
      <div class="right">
        <div class="content_form">
          <h2 class="content_title">短信调整工具</h2>
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login_form"
            autocomplete="on"
            label-position="top"
            label-width="74px"
          >
            <el-form-item prop="username" label="账号">
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="请输入账号"
                name="username"
                type="text"
                tabindex="1"
                style="float: left"
              />
            </el-form-item>

            <el-form-item prop="password" label="密码">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                show-password
                tabindex="2"
                style="float: left"
              />
            </el-form-item>
            <!-- <el-form-item prop="verifyCode" label="验证码">
              <el-input
                v-model="loginForm.verifyCode"
                placeholder="请输入验证码"
                prefix-icon="lj-icon-yanzhengma"
                maxlength="5"
                style="float: left; width: 67%"
              ></el-input>
              <div class="captcha_code">
                <img :src="captcha" ref="code" @click="getCaptcha" />
              </div>
            </el-form-item> -->
            <el-button
              :loading="loading"
              type="primary"
              class="loginBut"
              @click.native.prevent="handleLogin"
              >登 录</el-button
            >
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { phone } from "@/utils/validator";
import logo from "@/assets/logo.png";
import { randomNum, getTime } from "@/utils";
import { setStorage, getStorage } from "@/utils/auth";
import { login } from "@/api/user";
export default {
  name: "Login",
  data() {
    const username = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("账号不能为空，请输入账号。"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空，请输入密码。"));
      } else {
        callback();
      }
    };
    const validateVerifyCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("验证码不能为空，请输入验证码。"));
      } else {
        callback();
      }
    };
    return {
      logo: logo,
      captcha: "",
      loginForm: {
        username: "",
        password: "",
        // verifyCode: "",
        uuid: randomNum(),
        time: getTime(),
      },
      loginRules: {
        username: [{ trigger: "blur", validator: username }],
        // username: [
        //   // { required: true, trigger: "blur", message: "请输入登录账号" },
        // ],
        password: [{ trigger: "blur", validator: validatePassword }],
        // verifyCode: [
        //   { trigger: "blur", validator: validateVerifyCode },
        //   // { required: true, trigger: "blur", message: "请输入图形验证码" },
        // ],
      },
      loading: false,
    };
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    this.getCaptcha();
    localStorage.uuid = randomNum();
    localStorage.time = getTime();
    // window.localStorage.getItem('uuid')
  },
  methods: {
    getCaptcha() {
      console.log(process.env.VUE_APP_BASE_API);
      const num = Math.ceil(Math.random() * 10); //生成一个随机数（防止缓存）
      this.captcha =
        process.env.VUE_APP_BASE_API +
        "/user/captcha?uuId=" +
        this.loginForm.uuid +
        "&num=" +
        num;
    },
    handleLogin() {
      // if (this.loginForm.username.length === 0) {
      //   this.$message.error("请输入手机号");
      //   return;
      // }
      // if (this.loginForm.password.length === 0) {
      //   this.$message.error("请输入密码");
      //   return;
      // }
      // if (this.loginForm.verifyCode.length === 0) {
      //   this.$message.error("请输入图形验证码");
      //   return;
      // }
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          login({
            loginName: this.loginForm.username,
            password: this.loginForm.password,
            // verifyCode: this.loginForm.verifyCode,
            // uuId: this.loginForm.uuid
          })
            .then((data) => {
              if (data.code === 200) {
                const smsToken = "token" + randomNum();
                setStorage("token", smsToken);
                setStorage("info", data.data);
                this.$router.push("./dataExport");
                this.$message.success("登录成功");
              } else {
                this.getCaptcha();
              }
              this.loading = false;
            })
            .catch((error) => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$bg: #f8ffff;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  height: 100vh;
  width: 100%;
  background-color: $bg;
  background: url("../../assets/images/login.png") no-repeat center center;
  background-size: cover;
  overflow: hidden;
  .content {
    width: 1076px;
    margin: 180px auto 0;
    .right {
      width: 480px;
      margin: 0 auto;
      .content_form {
        width: 480px;
        height: 500px;
        background: #ffffff;
        box-shadow: 0 5px 20px 0 rgba(31, 35, 41, 0.05);
        padding: 48px;
        box-sizing: border-box;
        border-radius: 12px;
        .content_title {
          margin-top: 8px;
          margin-bottom: 24px;
          font-size: 24px;
          color: #363f66;
        }
        .login_form {
          text-align: left;
          ::v-deep .el-form-item {
          }
          ::v-deep .el-form-item__label {
            font-size: 16px;
            font-weight: bold;
            padding-bottom: 0px;
            // padding-left: 16px;
          }
          ::v-deep .el-input__inner {
            border: 1px solid rgba(31, 35, 41, 0.15);
            border-radius: 5px;
            padding-left: 18px;
            height: 40px;
            font-size: 14px;
          }
          ::v-deep .el-form-item__content {
            height: 40px;
          }
          ::v-deep .el-form-item__error {
            padding-top: 8px;
            left: -75px;
          }
          .loginBut {
            width: 100%;
            height: 48px;
            margin-top: 58px;
            background: #427bff;
            box-shadow: 0 6px 16px -4px rgba(66, 123, 255, 0.5);
            border-radius: 5px;
            font-size: 16px;
            font-weight: 600;
            font-family: PingFangSC-Semibold;
          }
        }
      }
    }
  }

  .login_box {
    width: 1000px;
    display: block;
    margin: 0 auto;
    vertical-align: middle;
    position: relative;
    top: 10%; /*偏移*/
    transform: translateY(10%);
  }
  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
  @media only screen and (max-width: 1550px) {
    .login_box {
      transform: translateY(20%);
    }
  }
  @media only screen and (max-width: 1311px) {
    .login_box {
      transform: translateY(10%);
    }
  }
  @media only screen and (max-width: 1222px) {
    .login_box {
      transform: translateY(8%);
    }
  }
}
</style>

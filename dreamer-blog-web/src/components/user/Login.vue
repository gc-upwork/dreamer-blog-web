<template>
  <div class="loginContainer">
    <div class="loginTitle">
      <h2>Welcome Back</h2>
      <h5>Sign in with your account ID</h5>
    </div>

    <el-form ref="userAccount" v-bind:model="userAccount" :rules="rules" style="margin: 50px 100px auto 15px">

      <el-form-item prop="loginKey">
        <el-input v-model="userAccount.loginKey" placeholder="Email|Phone|Name"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input v-model="userAccount.password" placeholder="Password" show-password></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="login('userAccount')">Sign In</el-button>
        <el-button type="default" @click="turnToSignUp">Sign Up</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";
import qs from "qs";


export default {
  name: "Login",
  data() {
    return {
      userAccount: {
        loginKey: '',
        password: ''
      },

      rules: {
        loginKey: [
          {
            required: true,
            message: 'Please input Account',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'Please input Password',
            trigger: 'blur',
          },
        ],
      },
    }
  },

  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginRequest();
        } else {
          return false
        }
      })
    },

    loginRequest() {
      let data = {
        loginKey: this.userAccount.loginKey,
        password: this.userAccount.password
      };

      axios.post('http://localhost:8082/user/login', qs.stringify(data), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
      ).then(res => {
            this.getAccountInfo(res);
          }
      ).catch(error => {
        ElMessage.error('Server Internal Error')
      })
    },

    getAccountInfo(res) {
      console.log(res);
      let accessToken = res.data.other;
      if (res.data.code !== 200) {
        ElMessage.warning(res.data.message)
        return;
      }

      window.localStorage.setItem('access-token', accessToken);
      ElMessage.success("Login Success")
      this.$router.replace({
        path: '/home'
      })
    },

    turnToSignUp() {
      this.$router.replace({
        path: '/signUp'
      });
    }
  }
}
</script>

<!-- scoped : 当前样式只会在当前组件生效-->
<style scoped>

.loginTitle {
  text-align: left;
  margin: 15px auto auto 20px; /*上，按照逆时针*/
}

.loginContainer {
  border-radius: 15px; /*给div添加圆角边框*/
  background: white; /*背景颜色*/
  margin: 120px auto;
  width: 500px; /*div 宽度*/
  border: 1px solid #eaeaea; /*边界*/
}
</style>
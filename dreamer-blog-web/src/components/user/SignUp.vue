<template>

  <div class="signUpContainer">
    <div class="signUpTitle">
      <h2>Create an Account </h2>
    </div>

    <el-form ref="userAccount" v-bind:model="userAccount" label-width="120px">
      <el-form-item prop="usrName">
        <el-input v-model="userAccount.userName" placeholder="User Name"></el-input>
      </el-form-item>
      <el-form-item prop="userEmail">
        <el-input v-model="userAccount.userEmail" placeholder="Email"></el-input>
      </el-form-item>
      <el-form-item prop="userPhone">
        <el-input v-model="userAccount.userPhone" placeholder="Phone"></el-input>
      </el-form-item>
      <el-form-item prop="userPassword">
        <el-input v-model="userAccount.userPassword" placeholder="Password" show-password></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" v-on:click="signUp('userAccount')">SignUp</el-button>
        <el-button v-on:click="resetForm('userAccount')">Reset</el-button>
      </el-form-item>
    </el-form>

  </div>

</template>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "SignUp",
  data() {
    return {
      userAccount: {
        userName: '',
        userEmail: '',
        userPhone: '',
        userPassword: '',
      }
    }
  },

  /*rule for userinfo validation*/
  rules: {
    userName: [
      {
        required: true,
        message: 'Please input userName',
        trigger: 'blur',
      },
    ],
    userEmail: [
      {
        required: true,
        message: 'Please input userEmail',
        trigger: 'blur',
      },
    ],
    userPhone: [
      {
        required: true,
        message: 'Please input userPhone',
        trigger: 'blur',
      },
    ],
    userPassword: [
      {
        required: true,
        message: 'Please input userPassword',
        trigger: 'blur',
      },
    ],
  },

  methods: {

    /*sign up*/
    signUp(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.signUpRequest();
        } else {
          return false
        }
      })
    },

    signUpRequest() {
      axios.post('http://localhost:8082/user/signUp',
          {
            name: this.userAccount.userName,
            email: this.userAccount.userEmail,
            password: this.userAccount.userPassword,
            phone: this.userAccount.userPhone,
          }
      ).then(res => {
            this.parseResponse(res);
          }
      ).catch(error => {
        ElMessage.error('Server Internal Error')
      })
    },

    parseResponse(res) {
      console.log(res);
      if (res.data.code !== 200) {
        ElMessage.warning(res.data.message);
        return;
      }
      ElMessage.success("Congratulation! Sign Up Success")
      this.$router.replace({
        path: '/login'
      })
    },

    /*reset form*/
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>

<style scoped>

.signUpTitle {
  text-align: left;
  margin: 15px auto auto 20px; /*上，按照逆时针*/
}

.signUpContainer {
  border-radius: 15px; /*给div添加圆角边框*/
  background: white; /*背景颜色*/

  margin: 150px auto auto;
  width: 500px; /*div 宽度*/
  border: 1px solid #eaeaea; /*边界*/
}
</style>
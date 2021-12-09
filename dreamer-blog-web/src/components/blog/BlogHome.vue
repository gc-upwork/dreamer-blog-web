<template>

  <el-container class="homeContainer">

    <el-header>
      <div>
        <span>My System</span>
      </div>

    </el-header>

    <el-container>

      <el-container>
        <el-main>
          <!-- 路由占位符号-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </el-container>
</template>


<script>

export default {
  name: "SignUp",
  data() {
    return {
    }
  },

  methods: {

  }
}

</script>


<style scoped>
.imageTag {
  height: 50px;
  width: 50px;
}

.homeContainer {
  height: 100vh;
}

.el-header {
  background: #2c3e50;
  display: flex;
  justify-content: space-between; /*左右贴边对齐*/
  align-items: center;
  color: white;
}

.el-aside {
  background: #060520;
}

.el-main {
  background: black;
}
</style>
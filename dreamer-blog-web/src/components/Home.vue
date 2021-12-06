<template>

  <el-container class="homeContainer">

    <el-header>
      <div>
        <img src='../assets/logo.png' alt="picture not found" class="imageTag">
        <span>My System</span>
      </div>
      <el-button @click="logOut">Log Out</el-button>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <!-- router: 启动path路由规则，对二级三级子菜单生效  -->
        <el-menu background-color="#060520" text-color="white" router>
          <!--multi first class menus-->
          <el-sub-menu :index="item.menuId" :key="item.menuId" v-for="item in menuArray">

            <!--title名称-->
            <template #title>
              <span>{{ item.menuName }}</span>
            </template>
            <!--二级子菜单-->
            <el-menu-item :index="subItem.path" :key="subItem.menuId" v-for="subItem in item.childMenu">
              {{ subItem.menuName }}
            </el-menu-item>

          </el-sub-menu>

        </el-menu>
      </el-aside>


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
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "SignUp",
  data() {
    return {
      userAccount: {
        userName: '',
        userEmail: '',
        userPhone: '',
        userPassword: '',
      },
      menuArray: [{
        menuId: 1,
        menuName: 'Personal Account',
        childMenu: [{
          menuId: 11,
          menuName: "Social Account",
          path: '/social'
        },
          {
            menuId: 12,
            menuName: "Cloud Account",
            path: '/cloud'
          },]
      }],
    }
  },

  methods: {

    logOut() {
      ElMessageBox.confirm(
          'Log Out?',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
      ).then(() => {
        /*clear token*/
        window.localStorage.removeItem('access-token');
        this.$router.replace({
          path: '/login'
        })
      })
    },


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
  background: white;
}
</style>
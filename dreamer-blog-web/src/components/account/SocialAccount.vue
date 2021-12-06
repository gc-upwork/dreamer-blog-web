<template>
  <!-- 面包屑 -->
  <el-breadcrumb>
    <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
    <el-breadcrumb-item>Personal Account</el-breadcrumb-item>
    <el-breadcrumb-item>Social Account</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 卡片视图 -->
  <el-card class="box-card">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="Account Type" v-model="queryParams.type"></el-input>
      </el-col>

      <el-col :span="1">
        <el-button type="primary" size="medium" v-on:click="queryByTypeWithPge">Search</el-button>
      </el-col>

      <el-col :span="10">
        <el-button type="primary" size="medium" @click="addDialogFormVisible=true">Add New User</el-button>
      </el-col>

    </el-row>
  </el-card>

  <!-- account list -->
  <el-table :data="socialAccount" style="width: 100%" border stripe>
    <el-table-column type="index" label="Order" width="250"/>
    <el-table-column prop="type" label="Type" width="250"/>
    <el-table-column prop="userName" label="UserName" width="250"/>
    <el-table-column prop="password" label="Password" width="250"/>

    <el-table-column label="Operation" width="200">
      <template #default='scope'>
        <el-button type="primary" size="mini" @click="queryBySocialAccountId(scope.row.id)">Update</el-button>
        <el-button type="primary" size="mini" @click="deleteSocialAccountById(scope.row.id)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination background
                 v-model:currentPage=this.queryParams.currentPage
                 :page-sizes="[1, 2, 5, 10]"
                 :page-size=this.queryParams.pageSize
                 layout="total, sizes, prev, pager, next, jumper"
                 :total=this.totalSize
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange">
  </el-pagination>

  <!--  add new user dialog -->
  <el-dialog v-model="addDialogFormVisible" title="Add New User">
    <el-form :model="socialAccountInfo" ref="socialAccountInfo">
      <el-form-item label="Type">
        <el-input v-model="socialAccountInfo.type" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="User Name">
        <el-input v-model="socialAccountInfo.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="socialAccountInfo.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Other">
        <el-input v-model="socialAccountInfo.other" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addSocialAccount">Add</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- update dialog  -->
  <el-dialog v-model="updateDialogFormVisible" title="Update Social Account">
    <el-form :model="socialAccountUpdate" ref="socialAccountUpdate">
      <el-form-item label="Type">
        <el-input v-model="socialAccountUpdate.type" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="User Name">
        <el-input v-model="socialAccountUpdate.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="socialAccountUpdate.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Other">
        <el-input v-model="socialAccountUpdate.other" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="updateDialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updateSocialAccount()">Update</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from "axios";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "cloud",

  data() {
    return {
      socialAccount: [],/*可以对数据自动进行解析渲染*/

      /*page data*/
      queryParams: {
        pageSize: 10, /*default value*/
        currentPage: 1,
        type: null,
      },

      totalSize: 10,

      /*add social data*/
      socialAccountInfo: {
        type: '',
        userName: '',
        password: '',
        other: '',
      },

      /*update social data*/
      socialAccountUpdate: {
        id: '',
        type: '',
        userName: '',
        password: '',
        other: '',
      },

      addDialogFormVisible: false,
      updateDialogFormVisible: false,
    }
  },

  created() {
    this.queryPageInfo();
  },

  methods: {
    /*query page size and page content based on type*/
    queryPageInfo() {
      this.queryByTypeWithPge();
      this.querySizeByType();
    },

    /*query all the data based on the type name*/
    queryByTypeWithPge() {
      axios.get('http://localhost:8082/social/query/list', {
            params: ({
              currentPage: this.queryParams.currentPage,
              pageSize: this.queryParams.pageSize,
              type: this.queryParams.type
            })
          }
      ).then(res => {
            console.log(res);
            this.socialAccount = res.data.data;
          }
      ).catch(error => {
        console.log(error)
      })
    },

    querySizeByType() {
      axios.get('http://localhost:8082/social/size', {
            params: ({
              type: this.queryParams.type
            })
          }
      ).then(res => {
            this.totalSize = res.data.data
            console.log(this.totalSize)
            console.log(typeof this.totalSize)
          }
      ).catch(error => {
        console.log(error)
      })
    },

    handleSizeChange(newSize) {
      this.queryParams.pageSize = newSize;
      this.queryByTypeWithPge();
    },

    handleCurrentChange(newPage) {
      this.queryParams.pageNumber = newPage;
      this.queryByTypeWithPge();
    },

    /*add social account*/
    addSocialAccount() {
      axios.post('http://localhost:8082/social/save',
          {
            type: this.socialAccountInfo.type,
            userName: this.socialAccountInfo.userName,
            password: this.socialAccountInfo.password,
            other: this.socialAccountInfo.other,
          }
      ).then(res => {
            this.addDialogFormVisible = false;
            ElMessage.success("Add Account Success")
            this.queryPageInfo();
          }
      ).catch(error => {
        ElMessage.error("Server Internal Error")
      })
    },

    /*delete by id*/
    deleteSocialAccountById(id) {
      ElMessageBox.confirm(
          'Account Deleted?',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
      ).then(() => {
        this.deleteRequest(id);
      }).catch(() => {
      })
    },

    deleteRequest(id) {
      axios.get('http://localhost:8082/social/deleteById', {
        params: ({
          id: id
        })
      }).then(res => {
        /*query must before message box*/
        this.queryPageInfo();
        ElMessage.success('Delete completed')
      }).catch(error => {
        ElMessage.error("Internal Server Error")
      })
    },

    /*query by account id*/
    queryBySocialAccountId(id) {
      this.updateDialogFormVisible = true;
      axios.get('http://localhost:8082/social/query/id', {
            params: ({
              id: id
            })
          }
      ).then(res => {
            console.log(res.data.data);
            this.socialAccountUpdate = res.data.data;
          }
      ).catch(error => {
      })
    },

    /*update account by id*/
    updateSocialAccount() {
      axios.post('http://localhost:8082/social/update',
          {
            id: this.socialAccountUpdate.id,
            type: this.socialAccountUpdate.type,
            userName: this.socialAccountUpdate.userName,
            password: this.socialAccountUpdate.password,
            other: this.socialAccountUpdate.other,
          }
      ).then(res => {
            this.updateDialogFormVisible = false;
            this.queryPageInfo();
            ElMessage.success("Update Account Success")
            this.queryPageInfo();
          }
      ).catch(error => {
        ElMessage.error("Server Internal Error")
      })
    },

  }
}


/*    updateUserByUserName(userName) {
      this.updateDialogFormVisible = true;
      this.getOneUser(userName);
    },


    getOneUser(userName) {
      axios.get('http://localhost:8082/user/info/getByUserName', {
            params: ({
              userName: userName
            })
          }
      ).then(res => {
            console.log("nice job");
            console.log(res.data.responseBody);
            this.updateUserInfo = res.data.responseBody;
          }
      ).catch(error => {
        console.log(error)
      })
    },

    sendUpdateRequest() {
      axios.post('http://localhost:8082/user/info/update',
          {
            userName: this.updateUserInfo.userName,
            userEmail: this.updateUserInfo.userEmail,
            userPhone: this.updateUserInfo.userPhone,
            userRole: this.updateUserInfo.userRole,
          }
      ).then(res => {
            this.updateDialogFormVisible = false;
            this.queryByUserNameWithPge();
            this.querySizeByUserName();
          }
      ).catch(error => {

        console.log(error)
      })
    },

    deleteUser(userId) {
      ElMessageBox.confirm(
          'User will be deleted, Continue?',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
      ).then(() => {
        this.deleteRequest(userId);
        ElMessage({
          type: 'success',
          message: 'Delete completed',
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: 'Delete canceled',
        })
      })
    }
    ,

    deleteRequest(userId) {
      axios.get('http://localhost:8082/user/info/delete', {
            params: ({
              userId: userId
            })
          }
      ).then(res => {
            this.queryByUserNameWithPge();
            this.querySizeByUserName();
            console.log(res);
          }
      ).catch(error => {
        console.log(error)
      })
    }
    ,
  }*/
</script>

<!-- scoped : 当前样式只会在当前组件生效-->
<style scoped>

.el-table {
  margin-top: 20px;
  font-size: 15px;
}

.el-breadcrumb {
  margin-bottom: 20px;
}

.el-pagination {
  margin-top: 15px;
}

</style>
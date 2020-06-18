<template>
  <div>
    <my-bread>
      用户管理
      <span slot="third">用户列表</span>
    </my-bread>
    <el-card class="box-card">
      <div class="text item">
        <el-input placeholder="请输入内容" v-model="pageList.query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary" style="margin-left:15px;" >添加用户</el-button>
      </div>
      <!-- 表格插入 -->
      <el-table :data="tableData" stripe border style="width: 100%;margin-bottom:15px">
        <el-table-column prop="create_time" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
         <template #default='scope'>
            <el-switch v-model="scope.row.mg_state" @change="changeStatus(scope.row)"></el-switch>
         </template>
        </el-table-column>
        <el-table-column label="操作" width="220px">
          <el-button type="primary" icon="el-icon-edit" mini></el-button>
          <el-button type="danger" icon="el-icon-delete" mini></el-button>
          <el-button type="warning" icon="el-icon-setting" mini></el-button>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
       <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageList.pagenum"
      :page-sizes="[3, 5, 10, 15]"
      :page-size="pageList.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
      <!-- <Fenye></Fenye> -->
    </el-card>
   
  </div>
</template>

<script>
import MyBread from "../../components/MyBread";
// import Fenye from "../../components/Fenye";

export default {
  data() {
    return {
     pageList:{
       query:'',
       pagenum: 1,
       pagesize: 5
     },
      tableData: [],
      total:0
    };
  },
  created() {
    this.getUsers()
  },
  methods: {
    // 获取页码数据
    async getUsers() {
    const {data:res} =  await this.$http.get('/users',{params:this.pageList})
    console.log(res)
    this.tableData=res.data.users
    this.total=res.data.total
    },
      handleSizeChange(val) {
       this.pageList.pagesize=val
        this.getUsers()
      },
      handleCurrentChange(val) {
        this.pageList.pagenum=val
         this.getUsers()
      },
    // 改变状态
    changeStatus (status) {
      // 这里写成一个函数是因为需要发请求到后台更新数据的同步
      // console.log(status)
      // 发送请求 users/:uId/state/:type 请求方法：put
      // 获取ID
      // console.log(status.id,status.mg_state)
      // 这里可以使用节流或防抖来性能优化
      this.$http.put(`users/${status.id}/state/${status.mg_state}`).then(res=>{
        console.log(res)
      })
    },
    // 弹出框
   

  },
  components: {
    MyBread
  }
};
</script>

<style  lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  margin: 20px 20px;
}
.input-with-select {
  width: 300px;
}
</style>
<template>
  <div>
    <my-bread>
      权限管理
      <span slot="third">权限列表</span>
    </my-bread>
    <!-- 按钮 -->
    <el-card class="box-card">
    <!-- 表格 -->
     <el-table :data="tableList" stripe border style="width: 100%;margin-bottom:15px">
        <el-table-column prop="id" label="#"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
        <template v-slot='scope'>
          <el-tag v-if="scope.row.level==='0'">一级权限</el-tag>
          <el-tag v-if="scope.row.level==='1'" type="success">二级权限</el-tag>
          <el-tag v-if="scope.row.level==='2'" type="warning">三级权限</el-tag>
        </template>
        </el-table-column>
      </el-table>
       </el-card>
  </div>
</template>

<script>
import MyBread from "../../components/MyBread";
export default {
  data() {
    return {
      tableList:[]
    }
  },
  created () {
    this.getList()
  },
  methods:{
    getList () {
      // 请求路径：rights/:type get
      this.$http.get('rights/list').then(res=>{
        console.log(res)
        this.tableList=res.data.data
      })
    }
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
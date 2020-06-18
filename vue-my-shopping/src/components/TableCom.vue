<template>
  <div>
       <!-- 表格 -->
     <el-table :data="tableList" stripe border style="width: 100%;margin-bottom:15px">
        <el-table-column prop="id" label="#"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级"></el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
data () {
  return {
    tableList:[],
    tableName:[]

  }
}
}
</script>

<style>

</style>
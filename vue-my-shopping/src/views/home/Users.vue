<template>
  <div>
    <my-bread>
      用户管理
      <span slot="third">用户列表</span>
    </my-bread>
    <el-card class="box-card">
      <div class="text item">
        <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary" style="margin-left:15px;">添加用户</el-button>
      </div>
      <!-- 表格插入 -->
      <el-table :data="tableData" stripe border style="width: 100%;margin-bottom:15px">
        <el-table-column prop="date" label="#"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="name" label="邮箱"></el-table-column>
        <el-table-column prop="name" label="电话"></el-table-column>
        <el-table-column prop="name" label="角色"></el-table-column>
        <el-table-column prop="name" label="状态">
          <el-switch v-model="value2" disabled></el-switch>
        </el-table-column>
        <el-table-column label="操作" width="220px">
          <el-button type="primary" icon="el-icon-edit" mini></el-button>
          <el-button type="danger" icon="el-icon-delete" mini></el-button>
          <el-button type="warning" icon="el-icon-setting" mini></el-button>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <Fenye></Fenye>
    </el-card>
  </div>
</template>

<script>
import MyBread from "../../components/MyBread";
import Fenye from "../../components/Fenye";
export default {
  data() {
    return {
      value2: false,
      input: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  created() {},
  methods: {},
  components: {
    MyBread,
    Fenye
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
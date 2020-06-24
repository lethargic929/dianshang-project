<template>
  <div>
    <my-bread>
      商品管理
      <span slot="third">参数列表</span>
    </my-bread>
    <!-- 表格 -->
    <el-card class="box-card">
      <el-alert
    title="注意: 只允许为第三级分类设置相关参数!"
    type="warning"
    show-icon
    :closable="false">
  </el-alert>
     <div class="block">
  <span class="demonstration">选择商品分类: </span>
  <el-cascader
    v-model="value"
    :options="options"
    :props="{ expandTrigger: 'hover' }"
    @change="handleChange"></el-cascader>
</div>
<!-- 类似tab功能 -->
 <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="动态参数" name="first"><el-button type="primary" style="margin-bottom:15px;">添加参数</el-button></el-tab-pane>
    <el-tab-pane label="静态属性" name="second"><el-button type="primary" style="margin-bottom:15px;">添加属性</el-button></el-tab-pane>
  </el-tabs>
        <!-- 表格插入 -->
      <el-table :data="tableData" stripe border style="width: 100%;margin-bottom:15px">
        <el-table-column prop="create_time" label="#"></el-table-column>
        <el-table-column prop="username" label="参数名称"></el-table-column>
        <el-table-column prop="email" label="操作"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import MyBread from "../../components/MyBread";
export default { 
  data () {
    return {
      activeName:'first',
      tableData:[],
       value: [],
        options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }]
          }]
        }]
    }
  },
  methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleChange(value) {
        console.log(value);
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
.block {
  margin: 20px;
}
</style>
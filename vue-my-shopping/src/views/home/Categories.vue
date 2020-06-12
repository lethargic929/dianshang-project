<template>
  <div>
    <my-bread>
      商品管理
      <span slot="third">商品分类</span>
    </my-bread>
    <!-- 表格 -->
    <el-card class="box-card">
      <div class="text item">
        <el-button type="primary" style="margin-left:15px;">添加用户</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import MyBread from "../../components/MyBread";
export default {
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
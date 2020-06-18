<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: "Fenye",
  data() {
    return {
      props: {
        pageList: {
          query: "",
          pagenum: 1,
          pagesize: 5
        },
        total: 0
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageList.pagesize = val;
    },
    handleCurrentChange(val) {
      this.pageList.pagenum = val;
    }
  }
};
</script>

<style>
</style>
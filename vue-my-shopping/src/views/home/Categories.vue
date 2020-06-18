<template>
  <div>
    <my-bread>
      商品管理
      <span slot="third">商品分类</span>
    </my-bread>
    <el-card class="box-card">
      <div class="text item">
        <el-button type="primary" style="margin-left:15px;" @click="addCateList">添加分类</el-button>
      </div>
      <!-- 表格插入 -->
      <tree-table
        :data="tableData"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
        :show-row-hover="false"
      >
      <!-- 是否有效 -->
      <template v-slot:isok='scope'>
       <i class="el-icon-circle-check" v-if="scope.row.cat_deleted===false" style="color:lightgreen; font-size: 20px;"></i>
       <i class="el-icon-circle-close" v-else style="color:red; font-size: 20px;"></i>
      </template>
      <!-- 排序 -->
      <template v-slot:order='scope'>
        <el-tag v-if="scope.row.cat_level===0">一级</el-tag>
        <el-tag v-if="scope.row.cat_level===1" type="success">二级</el-tag>
        <el-tag v-if="scope.row.cat_level===2" type="warning">三级</el-tag>
      </template>
      <!-- 操作 -->
      <template v-slot:opt='scope'>
         <el-button type="primary" icon="el-icon-edit" size='mini' @click="cateEdit(scope.row)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete"  size='mini' @click="cateDelete">删除</el-button>
      </template>
      </tree-table>
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
      pageList: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      tableData: [],
      total: 0,
      columns: [
        {
          label: "分类名称",
          prop: "cat_name"
        },
        {
          label: "是否有效",
          // 表示，将当前列定义为模板列
          type: "template",
          // 表示当前这一列使用模板名称
          template: "isok"
        },
        {
          label: "排序",
          // 表示，将当前列定义为模板列
          type: "template",
          // 表示当前这一列使用模板名称
          template: "order"
        },
        {
          label: "操作",
          // 表示，将当前列定义为模板列
          type: "template",
          // 表示当前这一列使用模板名称
          template: "opt",
          width: "200px"
        }
      ]
    }
    },
  created() {
    this.getCategoriesList();
  },
  methods: {
    getCategoriesList() {
      this.$http.get("categories", { params: this.pageList }).then(res => {
        console.log(res);
        this.tableData = res.data.data.result;
        this.total = res.data.data.total;
      });
    },
     handleSizeChange(val) {
       this.pageList.pagesize=val
        this.getCategoriesList();
      },
      handleCurrentChange(val) {
        this.pageList.pagenum=val
         this.getCategoriesList();
      },
    // 添加分类功能
    addCateList() {},
    // 编辑功能
    cateEdit () {},
    // 删除功能
    cateDelete () {}
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
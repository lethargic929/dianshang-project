<template>
  <div>
    <my-bread>
      商品管理
      <span slot="third">商品列表</span>
    </my-bread>
    <!-- 表格 -->
    <el-card class="box-card">
       <div class="text item">
        <el-input placeholder="请输入内容" v-model="pageList.query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary" style="margin-left:15px;" >添加商品</el-button>
      </div>
       <!-- 表格插入 -->
      <el-table :data="tableData" stripe border style="width: 100%;margin-bottom:15px">
        <el-table-column prop="goods_id" label="#"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格（元）"></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
        <el-table-column prop="add_time" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="220px">
          <el-button type="primary" icon="el-icon-edit" mini>编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" mini>删除</el-button>
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
  data () {
    return {
       pageList:{
       query:'',
       pagenum: 1,
       pagesize: 5
     },
      tableData: [],
      total:0
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      this.$http.get('goods',{params:this.pageList}).then(res=>{
        console.log(res)
        this.tableData=res.data.data.goods
        this.total=res.data.total
      })
    },
     handleSizeChange(val) {
       this.pageList.pagesize=val
        this.getGoodsList()
      },
      handleCurrentChange(val) {
        this.pageList.pagenum=val
         this.getGoodsList()
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
<template>
  <div>
    <my-bread>
      订单管理
      <span slot="third">订单列表</span>
    </my-bread>
    <!-- 表格 -->
    <el-card class="box-card">
       <el-input placeholder="请输入内容" v-model="pageList.query" class="input-with-select" style="margin-bottom:15px;">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <!-- 表格插入 -->
      <el-table :data="tableData" stripe border style="width: 100%;margin-bottom:15px">
        <el-table-column prop="order_id" label="#" width="60px"></el-table-column>
        <el-table-column prop="order_number" label="订单编号"></el-table-column>
        <el-table-column prop="order_price" label="订单价格"></el-table-column>
        <el-table-column prop="pay_status" label="是否付款"></el-table-column>
        <el-table-column prop="is_send" label="是否发货"></el-table-column>
        <el-table-column prop="create_time" label="下单时间"></el-table-column>
        <el-table-column label="操作" width="120px">
          <el-button type="primary" icon="el-icon-edit" size='mini'></el-button>
          <el-button type="success" icon="el-icon-location-outline" size='mini'></el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import MyBread from "../../components/MyBread";
export default {
   data () {
    return {
       pageList:{
       query:'',
       pagenum: 1,
       pagesize: 5
     },
      tableData: []
    }
  },
  created () {
    this.getOrderList()
  },
  methods:{
    async getOrderList () {
      const {data:res} = await this.$http.get('orders',{params:this.pageList})
      console.log(res)
      this.tableData = res.data.goods
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
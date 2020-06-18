<template>
  <div>
    <my-bread>
      权限管理
      <span slot="third">角色列表</span>
    </my-bread>
    <!-- 表格 -->
    <el-card class="box-card">
      <div class="text item">
        <el-button type="primary" style="margin-left:15px;">添加角色</el-button>
      </div>
       <!-- 表格 -->
     <el-table :data="tableList" stripe border style="width: 100%;margin-bottom:15px">
       <el-table-column type="expand">
          <template v-slot="props">
            <el-row v-for="(item1, i1) in props.row.children" :key="item1.id" :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']">
              <!-- 一级列表 -->
              <el-col :span="6">
                <el-tag closable>{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级和三级列表 -->
              <el-col :span="18">
                <el-row v-for="(item2, i2) in item1.children" :key="item2.id" :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']">
                  <el-col :span="6">
                     <el-tag type="success" closable>{{item2.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                     <el-tag type="warning" v-for="item3 in item2.children" :key="item3.id" closable @close="removeRightById(props.row, item3.id)">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
         <el-table-column label="操作" width="360px">
          <el-button type="primary" icon="el-icon-edit" mini>编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" mini>删除</el-button>
          <el-button type="warning" icon="el-icon-setting" mini>分配权限</el-button>
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
       tableList:[]
    }
  },
  created () {
    this.getRolesList()
  },
  methods:{
    getRolesList () {
    // 请求路径：roles get
    this.$http.get('roles').then(res=>{
      console.log(res)
      this.tableList=res.data.data
    })
    },
    removeRightById () {

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
.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
.el-tag {
  margin: 7px;
}
</style>
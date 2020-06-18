<template>
  <el-container>
    <el-header>
      <div>电商后台管理系统</div>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="togger" @click="isCollapse=!isCollapse">|||</div>
         <!-- :default-openeds='$router.path' -->
        <el-menu
          :default-active="$router.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409eff"
          @open="handleOpen"
          @close="handleClose"
          :collapse-transition='false'
          :collapse="isCollapse"
          unique-opened
          router
        >
          <el-submenu :index="item.path" v-for="item in menuList" :key="item.id" >
            <template slot="title">
              <i :class=elIcon[item.id] ></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="item1.path" v-for="item1 in item.children" :key="item1.id"> 
                <i class="el-icon-menu"></i>
                {{item1.authName}}
            </el-menu-item>
          </el-submenu>
           
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 二级路由 -->
        <router-view>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      // 路由高亮变量
      defaultActive:'',
      isCollapse:false,
      menuList:[],
      // 图标
    elIcon:{
        125:'el-icon-user-solid',
        103:'el-icon-s-tools',
        101:'el-icon-s-goods',
        102:'el-icon-s-claim',
        145:'el-icon-s-platform'

      }
    }
  },
  created () {
    this.getMenuList()
    // 获取上次的缓存
    this.defaultActive= sessionStorage.getItem('defaultActive')
  },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
        this.defaultActive = keyPath[0]
        // 存到本地存储
        sessionStorage.setItem('defaultActive', keyPath[0])
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
       async getMenuList () {
         // 获取token
         const tokenStr = localStorage.getItem('token')
       const {data:res} = await this.$http.get('menus',{headers:{'Authorization':tokenStr}})
       if(res.meta.status===200) {
         this.menuList=res.data
       }
       console.log(res)
      }
    }
};
</script>

<style lang="less" scoped>

.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  line-height: 200px;
  .togger {
    line-height: 2;
    background-color: #545c64;
    color: #fff;
  text-align: center;
  }
  .el-menu {
  height: 100vh;
  border: none;
}
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
}
</style>
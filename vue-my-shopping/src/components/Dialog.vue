<template>
  <div>
     <!-- 图片预览 -->
    <el-dialog :title="msg" :visible.sync="previewVisible" width="50%">
      <v-slot></v-slot>
      <!-- <img :src="previewPath" alt="" class="previewImg"> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
data () {
  return {
    msg:'编辑',
  previewVisible:false
  }
}
}
</script>

<style>

</style>
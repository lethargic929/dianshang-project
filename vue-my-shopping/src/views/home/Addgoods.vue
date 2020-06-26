<template>
  <div>
    <my-bread>
      商品管理
      <span slot="third">添加商品</span>
    </my-bread>
    <el-card style="margin-top:15px;">
      <el-alert
        title="添加商品信息"
        type="info"
        show-icon
        center
        :closable="false"
      >
      </el-alert>
      <!-- 进度步骤 -->
      <el-steps :active="activeIndex - 0" align-center finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- tabs选项 -->
      <el-form
        :model="goodsList"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          :tab-position="'left'"
          v-model="activeIndex"
          :before-leave="beforeLeave"
          @tab-click="tabClicked"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="goodsList.goods_name"> </el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price" type="number">
              <el-input v-model="goodsList.goods_price"> </el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight" type="number">
              <el-input v-model="goodsList.goods_weight"> </el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number" type="number">
              <el-input v-model="goodsList.goods_number"> </el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                expand-trigger="hover"
                v-model="goodsList.goods_cat"
                :options="addList"
                :props="addprops"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item
              v-for="item in manyTableData"
              :key="item.attr_id"
              :label="item.attr_name"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="cb"
                  v-for="(cb, i) in item.attr_vals"
                  :key="i"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              v-for="item in onlyTableData"
              :key="item.attr_id"
              :label="item.attr_name"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="cb"
                  v-for="(cb, i) in item.attr_vals"
                  :key="i"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              action="urlBase"
              :headers="header"
              list-type="picture-card"
              :auto-upload="false"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success='handleSuccess'
            >
              <el-button
                type="primary"
                style="margin-left:15px;"
                >图片上传</el-button
              >
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <!-- 富文本 -->
            <quill-editor v-model="goodsList.goods_introduce"></quill-editor>
            <el-button type="primary" @click="add" class="btn">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>  <!-- 图片预览 -->
    <el-dialog title="图片预览" :visible.sync="previewVisible">
      <img :src="previewPath" alt="" class="previewImg" width="100%">
    </el-dialog>

  </div>
</template>

<script>
import MyBread from "../../components/MyBread";
import lodash from 'lodash'

export default {
  data() {
    return {
      activeIndex: 0,
      // from表单的数据
      goodsList: {
        goods_name: "",
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        // 商品分类的数组
        goods_cat: [],
         // 图片的数组
        pics: [],
        // 富文本数据
        goods_introduce:'',
        attrs:[]
      },
      // 商品分类的数据
      addList: [],
      addprops: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      // 动态参数列表数据
      manyTableData: [],
      // 静态属性列表数据
      onlyTableData: [],
      // 图片上传的路径
      urlBase: "http://www.klxin.cn:8888/api/private/v1/upload",
      // 设置请求头
      header: {
        Authorization:window.sessionStorage.getItem('token')
      },
      previewPath:'',
      previewVisible:false,
      disabled: false,
      rules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" }
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" }
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" }
        ],
        goods_cat: [
          { required: true, message: "请输入商品分类", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getAddList();
  },
  methods: {
    // 获取所有商品列表数据
    async getAddList() {
      const { data: res } = await this.$http.get("categories");
      console.log(res);
      this.addList = res.data;
    },
    handleChange() {
      if (this.goodsList.goods_cat.length !== 3) {
        this.goodsList.goods_cat = [];
      }
    },
    // 若离开基本信息后未选择则会拦截
    beforeLeave(newNum, old) {
      if (old === "0" && this.goodsList.goods_cat.length !== 3) {
        this.$message.error("请选择商品分类");
        return false;
      }
    },
    async tabClicked() {
      if (this.activeIndex === "1") {
        const { data: res } = await this.$http.get(
          `categories/${this.addGoodsId}/attributes`,
          {
            params: { sel: "many" }
          }
        );
        if (res.meta.status !== 200) {
          return this.$message.error("获取动态参数列表失败！");
        }
        // 处理数据 若没有值就赋值[] 否则就split处理attr_vals
        res.data.forEach(item => {
          return (item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.split(" "));
        });
        this.manyTableData = res.data;
      } else if (this.activeIndex === "2") {
        const { data: res } = await this.$http.get(
          `categories/${this.addGoodsId}/attributes`,
          {
            params: { sel: "only" }
          }
        );
        if (res.meta.status !== 200) {
          return this.$message.error("获取静态属性失败！");
        }

        console.log(res.data);
        this.onlyTableData = res.data;
      }
    },
    // 图片预览功能
    handlePreview(file) {
      console.log(file)
      this.previewPath = file.url
      this.previewVisible = true
    },
    // 删除图片
    handleRemove (file) {
      console.log(file)
      // 1. 获取将要删除的图片的临时路径
      this.filePath =file.response.data.tmp_path
       // 2. 从 pics 数组中，找到这个图片对应的索引值
       const i = this.goodsList.pics.findIndex(item=>item.pic===filePath)
        // 3. 调用数组的 splice 方法，把图片信息对象，从 pics 数组中移除
        this.goodsList.pics.splice(i,1)
    },
    // 监听图片上传成功的事件
    handleSuccess (res) {
      // 1. 拼接得到一个图片信息对象
      const picInfo = {pic:res.data.tmp_path}
      // 2. 将图片信息对象，push 到pics数组中
      this.goodsList.pics.push(picInfo)
    },
    // 添加商品功能
    add () {
      // 验证
      this.$refs.ruleForm.validate(async valid=>{
        if(!valid) {
          return this.$message.error('请填写必填项')
        }
        // 执行添加业务逻辑
        // 这里需要复制goodsList的数据,因为级联的goods_cat必须是要是数组,问这里是字符串 同样使用一个数据,所以需要深拷贝
        // 深拷贝可以使用第三方插件lodash或者使用Json.parse(Json.stringify())注意这个方法里的深拷贝的里面方法拷贝不了
        const form= _.cloneDeep(this.goodsList)
        form.goods_cat=form.goods_cat.join(',')
        // 处理动态属性  manyTableData
        this.manyTableData.forEach(item=>{
          const newInfo = {attr_id:item.attr_id,attr_value:item.attr_vals.join('')}
          this.goodsList.attrs.push(newInfo)
        })
        // 处理静态属性  onlyTableData
        this.onlyTableData.forEach(item=>{
          const newInfo = {attr_id:item.attr_id,attr_value:item.attr_vals}
          this.goodsList.attrs.push(newInfo)
        })
        // 对接form的数据
        form.attrs=this.goodsList.attrs
         // 发起请求添加商品
        // 商品的名称，必须是唯一的
        const {data:res} = await this.$http.post('goods',form)
        console.log(res)
        // if (res.meta.status !== 201) {
        //   return this.$message.error('添加商品失败！')
        // }

        this.$message.success('添加商品成功！')
        this.$router.push('/goods')
      })

    }
  },
  computed: {
    addGoodsId() {
      if (this.goodsList.goods_cat.length === 3) {
        return this.goodsList.goods_cat[2];
      }
      return null;
    }
  },
  components: {
    MyBread
  }
};
</script>

<style lang="less" scoped>
.el-steps {
  margin: 20px auto;
}
 .btn {
  margin-top: 15px;
}
</style>

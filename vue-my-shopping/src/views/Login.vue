<template>
<div id="login">
    <el-form  class="demo-ruleForm" :model="loginForm" :rules="rules" ref="ruleForm">
  <el-form-item  prop="username">
    <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
  </el-form-item>
  <el-form-item  prop="password">
    <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.password"></el-input>
  </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="login('ruleForm')">登录</el-button>
    <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
name:'login',
data () {
    return {
        loginForm: {
            username:'',
            password:''
        },
        rules:{
            username:[ { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }] ,
            password:[
                { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
            ]

        }
    }
},
methods:{
    // 登录功能
    login (formName) {
       this.$refs[formName].validate((valid) => {
          if (valid) {
            // 发送请求
            this.$http.post('/login',{
               ...this.loginForm
            }).then((res)=>{
                console.log(res)
                const {data} = res
                if(res.status === 200) {
                    // 把token存起来
                localStorage.setItem('token',data.data.token)
                this.$message.success('登录成功');
                  this.$router.push('/home')
                }
            }).catch ((err)=>{
           this.$message.error('用户名或密码不正确');

            })
          } 
          
        });
    },
    // 重置功能
    resetForm (formName) {
       this.$refs[formName].resetFields();
    }
}
}
</script>

<style  lang='less' scoped>
#login {
  width: 100vw;
  height: 100vh;
 background-color: pink;
 position: relative;
 .el-form {
   position: absolute;
   left: 50%;
   top: 50%;
   transform: translate(-50%,-50%);
   width: 300px;
   height: 200px;
   box-shadow: 0 1px 2px 2px #ccc;
   background-color: #fff;
   .el-form-item {
     width: 280px;
     height: 40px;
    line-height: 40px;
    text-align: center;
     margin: 20px 10px;
   /deep/ .el-input__icon {
      font-size: 20px;
    }
   }
 }
}
</style>
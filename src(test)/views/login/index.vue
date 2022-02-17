<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="account">
        <el-input
          type="password"
          v-model="ruleForm.account"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pw">
        <el-input
          type="password"
          v-model="ruleForm.pw"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {login} from '@/api/http';
export default {
    data() {
      var validateAccount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          callback();
        }
      };
      var validatePw = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else {
          callback();
        }
      };
      return {
        ruleForm: {
          account: '',
          pw: '',
          age: ''
        },
        rules: {
          account: [
            { validator: validateAccount, trigger: 'blur' }
          ],
          pw: [
            { validator: validatePw, trigger: 'blur' }
          ],
          
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            login(this.ruleForm)
            .then((res) => {
              let {code,token} = res.data
              if(code === 0){
                sessionStorage.setItem("token",token)
                this.$message({
                  message:"登录成功",
                  type:"success"
                })
                this.$router.push("/")
              }else{
                this.$message({
                  message:"登录失败",
                  type:"error" 
                })
                this.ruleForm = {
                  account:'',
                  pw:''
                }
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
.login{
    width:100%;
    height:100%;
    background-color: #ccc;
    display:flex;
    justify-content: center;
    align-items: center;
    .el-form{
        width:400px;
        height:300px;
        background-color: #fff;
        border-radius:5px;
        padding:20px;
    }
}
</style>

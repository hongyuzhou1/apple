<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="40px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="account">
        <el-input
          type="text"
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
          >登录</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {validataAccount,validataPw} from '@/utils/validator.js';
import {login} from '@/api/http';
export default {
  data() {
      return {
        ruleForm: {
          account: '',
          pw: ''
        },
        rules: {
          account: [
            { validator: validataAccount, trigger: 'blur' }
          ],
          pw: [
            { validator: validataPw, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        // 验证数据有效性
        this.$refs[formName].validate((valid) => {
          if (valid) {
            login(this.ruleForm)
            .then((res) => {
              let {code,token} = res.data
              if(code === 0){
                sessionStorage.setItem("token",token)
                this.$message({
                  showClose:true,
                  message:"登录成功",
                  duration:2000,
                  type:"success"
                })
                this.$router.push("/")
              }else{
                this.$messge({
                  showClose:true,
                  messge:true,
                  duration:1000,
                  type:"error"
                  
                })
                this.ruleForm = {
                  account:'',
                  pw:''
                }
              }
            })
            .catch((err) => {
              console.log(err)
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
.login {
  height: 100%;
  background: #2d3a4b;
  display: flex;
  justify-content:center;
  align-items:center;
}
.demo-ruleForm{
  width:600px;
  height:300px;
  background-color: #c5c5c5;
  border-radius:5px;
  padding:20px;
}
</style>

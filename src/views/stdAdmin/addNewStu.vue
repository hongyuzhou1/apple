<template>
  <el-card class="add-student">
    <div slot="header" class="clearfix">
      <span>{{action === "edit" ? "编辑" : "新增"}}学生信息</span>
    </div>
    <el-form ref="form" :model="form" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="班级" prop="class">
            <el-select v-model="form.classId" placeholder="请选择班级">
              <el-option
                v-for="item in classList"
                :key="item.classId"
                :label="item.className"
                :value="item.classId"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <!-- 年龄 -->
          <el-form-item label="年龄" prop="age"> 
              <el-input v-model="form.age"></el-input>
          </el-form-item>

          <!-- 性别 -->
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="form.gender">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
              <el-radio label="2">其他</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 电话 -->
          <el-form-item label="电话" prop="tel">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          
          <!-- 身份证号 -->
          <el-form-item label="身份证号" prop="idCard">
            <el-input v-model="form.idCard"></el-input>
          </el-form-item>
          <!-- 住址 -->
          <el-form-item label="地址" prop="address">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-col>
        <!-- 右列 -->
        <el-col :span="12" :offset="4">
          <!-- 照片 -->
          <el-form-item label="照片" prop="imgUrl">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3000/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :headers="headers"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 缴费金额 -->
          <el-form-item label="缴费金额" prop="pay">
            <el-input v-model="form.pay"></el-input>
          </el-form-item>
          <!-- 缴费状态 -->
          <el-form-item label="缴费状态" prop="payStatus">
            <el-radio-group v-model="form.payStatus">
              <el-radio label="1">试听</el-radio>
              <el-radio label="2">欠费</el-radio>
              <el-radio label="3">已缴费</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="danger" @click="resetForm('form')">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
import { selectClassByStatus,addNewStudent,editStudent} from '@/api/http.js'
export default {
  data(){
    return{
      form:{
        name: "",
        classId: "",
        age: "",
        gender: "",
        tel: "",
        idCard: "",
        address: "",
        imgUrl: "",
        pay: "",
        payStatus: "1",
      },
      imageUrl:"",
      headers:{
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      classList:[],
      action:''
    }
  },
  created(){
    this.getClassInfo()
    let {row,action} = this.$route.params;
    if(action === "edit"){
      this.action = action;
      this.form = row;
      this.form.gender = row.gender.toString();
      this.form.payStatus = row.payStatus.toString();
      this.imageUrl = "http://localhost:3000/upload/" + this.form.imgUrl
    }
  },
  methods:{
    // 处理上传成功之后的代码
    handleAvatarSuccess(res, file) {
      //URL.createObjectURL 会基于提供的文件信息,生成一个可用的文件的url地址
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.imgUrl = res.url;
    },
    //处理上传之前格式和尺寸的验证
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      //return true,则继续完成上传的逻辑,return false, 终止上传的任务
      return isJPG && isLt2M;
    },
    // 获取未开班班级
    getClassInfo(){
      selectClassByStatus(0)
        .then((res) => {
          let {code,list} = res.data
          if(code === 0){
            this.classList = list
          }
        })
        .catch((err) => {
          console.log(err)
        }) 
    }, 
    // 新增学生
    handleAdd(){
      addNewStudent(this.form)
      .then((res) => {
        let {code} = res.data;
        if (code === 0){
          this.$message.success("添加成功");
          this.$router.push("/stdAdmin/stuInfo")
        }
      })
    },
    // 编辑学生
    handleEdit(){
      editStudent(this.form)
      .then((res) => {
        let {code} = res.data;
        if(code === 0){
          this.$message.success("编辑成功");
          this.$router.push({
            name:'stuInfo',
            params:{
              page:this.$route.params.page
            }
          })
        }
        console.log(this.$route)
      })
      .catch((err) =>{
        console.log(err)
      })
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          this.action === "edit" ? this.handleEdit() : this.handleAdd();
        }
        else{
          console.log("error submit!")
          return false
        }
      })
    },
    resetForm(formName){
      this.imageUrl = ''
      this.$refs['form'].resetFields()
    },
  }
}
</script>

<style lang="scss" scoped>
// 缩略图样式
.avatar-uploader ::v-deep .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader ::v-deep .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
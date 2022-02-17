<template>
  <div class="add-class">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="班级名称" prop="className">
        <el-input v-model="ruleForm.className"></el-input>
      </el-form-item>
      <el-form-item label="教室名称" prop="classroom">
        <el-select v-model="ruleForm.classroom" placeholder="请选择教室">
          <el-option label="王屋山" value="王屋山"></el-option>
          <el-option label="老君山" value="老君山"></el-option>
          <el-option label="嵩山" value="嵩山"></el-option>
          <el-option label="鄱阳湖" value="鄱阳湖"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开班时间" prop="startDate">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.startDate"
            style="width: 100%"
          ></el-date-picker>
      </el-form-item>

      <el-form-item label="班主任" prop="ht">
        <el-radio-group v-model="ruleForm.ht">
          <el-radio label="张三"></el-radio>
          <el-radio label="李四"></el-radio>
          <el-radio label="王二"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" v-if="action === 'new'" @click="submitForm('ruleForm')"
          >创建</el-button
        >
        <el-button type="primary" v-else @click="submitForm('ruleForm')"
          >修改</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="closeWindow">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import addClass from "@/api/http.js"
import {addClass,editClass} from "@/api/http.js";
import moment from 'moment'
export default {
  props:{
    ruleForm:Object,
    action:String
  },
  data() {
    return {
      // ruleForm: {
      //   className: "",
      //   classroom: "",
      //   startDate: "",
      //   ht:""
      // },
      rules: {
        className: [
          { required: true, message: "请输入班级名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
        classroom: [
          { required: true, message: "请选择活教室", trigger: "change" },
        ],
        startData: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        ht: [
          { required: true, message: "请选择班主任", trigger: "change" },
        ]
      },
    };
  },
  methods: {
    // 添加班级
    handleAddClass(){
        this.ruleForm.startDate = moment(this.ruleForm.startDate).format("YYYY-MM-DD")
        addClass(this.ruleForm)
        .then(res=>{
            let {code} = res.data
            if(code === 0){ 
                this.$message.success("添加成功")
                this.$emit("closeWindow",'add')
            }else{
                this.$message.error("添加失败")
            }
        })
        .catch(err => {
            console.log(err)
        })
    },
    // 修改班级
    handleEditClass(){
        this.ruleForm.startDate = moment(this.ruleForm.startDate).format("YYYY-MM-DD")
        editClass(this.ruleForm)
        .then(res=>{
            let {code} = res.data
            if(code === 0){ 
                this.$message.success("修改成功")
                this.$emit("closeWindow",'edit')
            }else{
                this.$message.error("添加失败")
            }
        })
        .catch(err => {
            console.log(err)
        })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.handleAddClass()
          this.action === "new" ? this.handleAddClass() :this.handleEditClass()
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    closeWindow(){
        this.$emit("closeWindow")
    }
  },
};
</script>

<style lang="scss" scoped>
 .add-class{
     width:100%;
     height:100%;
     background-color: rgba(0,0,0,.5);
    position:absolute;
    top:0;
    left:0;
    z-index:99;
    display:flex;
    justify-content:center;
    align-items:center;
    .demo-ruleForm{
        width:400px;
        height:500px;
        border-radius:4px;
        padding:20px;
        background-color: #fff;    
    }
 }
 ::v-deep .el-input__inner{
    width:auto;
}

</style>

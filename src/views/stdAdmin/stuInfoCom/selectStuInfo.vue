<template>
   <el-card class="box-card">
       <div slot="header" class="clearfix">
           <span>查询学生信息</span>
            <el-button style="float: right; padding: 3px 0" type="text"
                >操作按钮</el-button
            >
       </div>
       <el-form ref="form" :model="form" label-width="80px">
            <el-row>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="班级" prop="classId">
                    <el-select v-model="form.classId" placeholder="请选择班级">
                        <el-option label="所有班级" value="0"></el-option>
                        <el-option
                            v-for="item in classList"
                            :key="item.classId"
                            :label="item.className"
                            :value="item.classId"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="年龄" prop="age">
                    <el-input v-model="form.age"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-col :span="4" :offset="1">
                    <el-button type="primary" @click="submitForm('form')">查询</el-button>
                </el-col>
                <el-col :span="4">
                    <el-button type="danger" @click="resetForm('form')">重置</el-button>
                </el-col>
                
            </el-row>
       </el-form>
   </el-card>
</template>
 
<script>
import {selectClassByStatus,searchStudent} from "@/api/http.js"
export default{
    data(){
        return{
            form:{
                name:"",
                classId:"",
                age:''
            },
            classList:[],
        }
    },
    created(){
        this.getClassInfo()
    },
    methods:{
        // 未开班班级
        getClassInfo(){
            selectClassByStatus(0)
            .then((res) => {
                let {code,list} = res.data;
                if(code === 0){
                    this.classList = list
                }
            })
            .catch((err) =>{
                console.log(err)
            })
        },
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    searchStudent(this.form)
                    .then((res) => {
                        let data = res.data.list
                        this.$emit("send",data)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
                else{
                    console.log("error submit!!")
                    return false;
                }
            })
        },
        resetForm(formName){
            this.$refs["form"].resetFields();
        }
    }

}
</script>
 
<style lang="scss" scoped>
.el-form-item{
    width:260px;
    display:inline-block;
    .el-input__inner{
     width:150px;
    }
}
 
</style>
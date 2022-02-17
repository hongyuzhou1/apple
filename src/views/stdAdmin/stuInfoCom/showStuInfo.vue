<template>
  <el-card class="stu-info">
    <div slot="header" class="clearfix">
      <span>学生信息</span>
      <el-button style="float: right; padding: 3px 10px" type="primary"
        >批量操作</el-button
      >
      <el-button
        style="float: right; padding: 3px 10px; margin-right: 20px"
        type="primary"
        @click="addStudent"
        >新建</el-button
      >
    </div>

    <el-table :data="tableData" style="width: 100%" ref="filterTable">
      <el-table-column prop="name" label="姓名" ></el-table-column>
      <el-table-column prop="age" label="年龄" ></el-table-column>
      <el-table-column prop="gender" label="性别" >
        <template v-slot="scope">
          {{scope.row.gender | genderFormat}}
        </template>
      </el-table-column>
      <el-table-column prop="imgUrl" label="照片" >
        <template v-slot="scope">
          <img :src="'http://localhost:3000/upload/' + scope.row.imgUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="className" label="班级名称" >
      </el-table-column>
      <el-table-column prop="pay" label="缴费金额" >
      </el-table-column>
      <el-table-column prop="payStatus" label="缴费状态" >
        <template v-slot="scope">
            {{scope.row.payStatus | payStatusFormat}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.row.stuId)">
            <el-button type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="5"
      @current-change="changePage"
      :current-page="page"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import { selectStudent,delStudent} from "@/api/http.js";
export default {
    props:{
        parentTableData:Array
    },
    data(){
        return{
            tableData:[],
            page:1,
            total:0
        }
    },
    created(){
        this.getData()
    },
    filters:{
        genderFormat(gender){
            if(gender == 0) return '男'
            if(gender == 1) return '女'
            if(gender == 2) return '其他'
        },
        payStatusFormat(payStatus){
            if(payStatus == 1) return '试听'
            if(payStatus == 2) return '欠费'
            if(payStatus == 3) return '已缴费'
        }
    },
    methods:{
        async getData(){
            try{
                let res = await selectStudent({page:this.page});
                let {code,list,total} = res.data;
                if(code === 0){
                    this.tableData = list;
                    this.total = total;
                }
            }
            catch(err){
                console.log(err)
                console.log("访问异常")
            }
        },
        addStudent(){
            this.$router.push("/stdAdmin/addNewStu")
        },
        changePage(val){
            // console.log(val);
            this.page = val;
            this.getData();
        },
        // 删除
        async handleDelete(stuId){
            try{
                let res = await delStudent({stuId})
                if(res.data.code === 0){
                    this.$message.success("删除成功")
                    this.getData()
                }
                else{
                    this.$messge.error("删除失败")
                }
            }
            catch(err){
                console.log(err)
            }
        },
        // 编辑
        handleEdit(row){
            this.$router.push({
                name:'addNewStu',
                params:{
                    row,
                    action:'edit',
                    page:this.page
                }
            })
        }
    },
    watch:{
        parentTableData(){
            this.tableData = this.parentTableData
        }
    }
};
</script>

<style lang="scss" scoped>
img{
    width:60px;
    height:60px;
}
</style>

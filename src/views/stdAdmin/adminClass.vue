<template>
  <div class="admin-class">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>班级列表</span>
        <el-button style="float: right; padding: 3px 0" type="text"
          >批量操作</el-button
        >
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="changeWindowStatus('new')"
          >新建</el-button
        >
      </div>
      <!-- :data="tableData" -->
      <el-table
         v-loading="loading"
        ref="multipleTable"
        :data="filterData()"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"

        stripe
        :row-class-name="tableRowClassName"
        @select-change="handleSelectionChange"

      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <!-- <el-table-column label="classId" prop="classId" width="120"
        sortable
        >
        </el-table-column> -->
        <!-- 自定义索引 -->
        <el-table-column type="index" label="索引" :index="indexMethod"></el-table-column>
        <el-table-column prop="className" label="班级名称"
        :filters="filterItem"
        :filter-method="filterHandler"
        > 

        </el-table-column>
        <el-table-column prop="classroom" label="教室名称"> </el-table-column>
        <el-table-column prop="ht" label="班主任"> </el-table-column>
        <el-table-column prop="startDate" label="开班时间"> 
          <template v-slot="scope">   
            {{scope.row.startDate | formatDate}}
          </template>
        </el-table-column>

        <el-table-column align="right">
          <template v-slot:header>
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
          <template v-slot="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <!-- 删除气泡确认框 -->
            <el-popconfirm
              title="确定删除本班级吗?"
              @confirm="handleDelete(scope.$index,scope.row)"
            >
              <!-- 删除按钮 ?? -->     
              <el-button
                size="mini"
                type="danger"
                slot="reference"
                >Delete</el-button
              >
            </el-popconfirm>
            
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="5"
      :current-page="page"
      @current-change="currentChange"
      >
    </el-pagination>
    <!-- 新建弹窗 -->
    <add-class
      @closeWindow="changeWindowStatus"
      v-if="addClassShow"
      :rule-form="record"
      :action="action"
    ></add-class>
  </div>
</template>

<script>
import addClass from "./addClass.vue";
import { selectClass,delClass } from "@/api/http.js";
import moment from "moment";
export default {
  components: {
    addClass,
  },
  data() {
    return {
      loading: false,
      tableData: [],
      addClassShow: false,
      search: '',
      total:0,
      page:1,
      // 传递给弹窗的数据
      record:{},
      action:'',
      filterItem:[
        {
          text:"H5班",
          value:"H5"
        },
        {
          text:"Java班",
          value:"Java"
        }
      ]
    };
  },
  created() {
    this.getData(this.page);
  },
  methods: {
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 改变弹窗状态
    changeWindowStatus(action) {
      this.addClassShow = !this.addClassShow;
      // 新建班级
      if (action === "new") {
        this.record = {
        className: "",
        classroom: "",
        ht: "",
        startDate: "",
        };
        this.action = "new"
      }
      // 添加班级
      if (action === "add") {
        this.getData(1);
      }
      // 修改班级
      if(action === "edit"){
        this.getData(this.page);
        this.action = "edit"
      }
    },
    // 获取数据
    getData(page) {
      this.loading = true
      selectClass()
        .then((res) => {
          if (res.data.code === 0) {
            // res.data.list.map((item) => {
            //   item.startDate = moment(item.startDate).format("YYYY-MM-DD");
            //   return item;
            // });
            this.allData = res.data.list;
            this.currentChange(page);
            this.total = res.data.total;
            this.page = page;
            this.loading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "warning-row";
      } else if (rowIndex === 2) {
        return "success-row";
      }
      return "";
    },
    // 编辑
    handleEdit(index, row) {
        // console.log(index, row);
        this.changeWindowStatus("edit");
        this.record = JSON.parse(JSON.stringify(row));
    },
    // 删除
    handleDelete(index, row) {
        // console.log(index, row);
        let {classId} = row;
        delClass({
          id:classId
        })
        .then((res) => {
          if(res.data.code === 0){
            this.$message.success("删除成功");
            this.getData(this.page);
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 过滤班级
    filterHandler(value,row,column){
      const property = column["property"]
      return row[property].toLowerCase().indexOf(value.toLowerCase()) !== -1
      // return /^H5/i.test(row[property])
    },
    // 搜索
    filterData(){
      return this.tableData.filter((item) => {
        return(
          !this.search || item.classroom.includes(this.search)
        )
      })
    },
    // 自定义索引处理每页的索引值
    indexMethod(index){
      // console.log(this.page)
      // 0 1 2 3 4
      // (this.page - 1) * 5 + index --->(0,1,2,3,4)
      // 5 6 7 8 9
      return (this.page - 1 ) * 5 + index;
    },
    // 页码改变时
    currentChange(page){
      this.page = page;
      let start = (page - 1) * 5;
      let end = page * 5;
      this.tableData = this.allData.slice(start,end)
    }
  },
};
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-table ::v-deep .warning-row {
  background: oldlace;
}

.el-table ::v-deep .success-row {
  background: #f0f9eb;
}
</style>

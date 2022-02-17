import axios from './config'
export function login(data){
    return axios({
        url:'/login',
        method:"post",
        data
    })
}
// 添加班级
export const addClass = data => axios.post("/class",data);
// 查询班级
export const selectClass = params => axios.get("/class",{params});
// 删除班级
export const delClass = params => axios.delete("/class",{params});
// 修改班级
export const editClass = data => axios.put("/class",data);

// 查询未开班的班级
export const selectClassByStatus = status => axios.get(`/class/${status}`);
// 添加新生
export const addNewStudent = data => axios.post("/student",data);
// 查询学生信息
export const selectStudent = params => axios.get("/student",{params});
// 删除学生
export const delStudent = params => axios.delete("/student",{params});
// 修改学生
export const editStudent = data => axios.put("/student",data);
// 查询符合条件学生
export const searchStudent = params => axios.get("/searchStudent",{params})
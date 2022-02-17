import axios from './config'
export function login(data){
    return axios({
        url:'/login',
        method:"post",
        data
    })
}
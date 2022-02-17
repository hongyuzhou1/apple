import axios from 'axios'
const instance = axios.create({
    baseURL:'http://localhost:3000',
    timeout:5000
})
//添加请求拦截器，会在发起请求之前执行相应的需求 interceptors:拦截器
instance.interceptors.request.use(function (config) {
    let token = sessionStorage.getItem("token")
    if (token){
        config.headers.common['Authorization'] = 'Bearer ' + token;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

//添加响应拦截器，会在返回数据后先执行相应的需求
instance.interceptors.response.use(function (response) {
    // 如果token失效
    if(response.data.code === 401){
      sessionStorage.clear();
      window.location.reload();
    }
    return response;
  }, function (error) {
    // console.log('res-err',response);
    return Promise.reject(error);
  });
export default instance


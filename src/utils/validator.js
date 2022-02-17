export const validataAccount = (rule,value,callback) => {
    if(value === ''){
        callback(new Error('请输入账号'));
    }else{
        if(/^[a-z]{3,6}$/i.test(value)){
            callback();
        }else{
            callback(new Error('请输入3-6位字母'))
        }
    }
}
export const validataPw = (rule,value,callback) => {
    if(value === ''){
        callback(new Error('请输入密码'))
    }else{
        if(/^[a-z\d]{3,6}$/i.test(value)){
            callback()
        }else{
            callback(new Error('请输入3-6位字母'))
        }
    }
}
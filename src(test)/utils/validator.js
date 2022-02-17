export const validateAccount = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入账号'));
    } else {
        if (/^[a-z]{3,6}$/i.test(value)) {
            callback();
        } else {
            callback(new Error('请输入3-6位之间的字母'));
        }
    }
};
export const validatePw = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入账号'));
    } else {
        if (/^[a-z\d]{3,6}$/i.test(value)) {
            callback();
        } else {
            callback(new Error('请输入3-6位之间的字母'));
        }

    }
};
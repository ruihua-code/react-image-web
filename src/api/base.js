import axios from 'axios';
import { message } from 'antd';
const instance = axios.create({
    withCredentials: true,
});
instance.interceptors.request.use((config) => {
    const userInfo = JSON.parse(localStorage.getItem('userinfo')) || null;
    config.headers.Authorization = userInfo ? userInfo.token : null;

    return config;
}, error => Promise.reject(error));

instance.interceptors.response.use((response) => {
    let res = response.data;
    if (res instanceof Blob || res instanceof ArrayBuffer) {
        res = response;
        return Promise.resolve(res);
    } else if (!res.success) {        
        message.info(res.msg);
        return Promise.reject(res);
    }
    return Promise.resolve(res.data);
}, (error) => {
    console.log(error)
    if (error.response.status === 401) {
        // router.push('/');
    } else if (error.message.includes('timeout')) {
        message.error('请求超时，请检查网络是否连接正常');
    } else {
        // Message.error(`请求失败，错误码${error.response.status}`);        
        message.error('请求失败，请联系管理员');
    }

    return Promise.reject(error);
});

export default instance;
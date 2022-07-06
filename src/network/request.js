import axios from 'axios';
import router from '../router';
import { ElNotification } from 'element-plus'
export function request(config) {
    const instance = axios.create({
        baseURL: 'https://api.shop.eduwork.cn',
        timeout: 5000,
    })
    //请求拦截
    instance.interceptors.request.use(config => {
        //如果有接口需要认证才可以访问,在这里统一设置
        const token = window.localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        }
        //直接放行
        return config;
    }, err => { })

    //响应拦截
    instance.interceptors.response.use(res => {
        return res.data ? res.data : res;
    }, err => {
        //如果有错误,这里处理错误,显示错误信息
        ElNotification({
            title: 'Error',
            message: err.response.data.errors[Object.keys(err.response.data.errors)[0]][0],
            type: 'error',
        })
    })
    return instance(config);
}
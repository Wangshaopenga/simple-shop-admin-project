import {request} from './request'

export function login(data) {
    return request ({
        url:'/api/auth/login',
        method:'post',
        data
    })
}
export function getUserList(data) {
    return request({
        url:`/api/admin/users?name=${data.name}&current=${data.current}&email=${data.email}`,
    })
}
export function addUser(data) {
    return request({
        url:'/api/admin/users',
        method:'post',
        data
    })
}
export function editUser(id,data) {
    return request({
        url:`/api/admin/users/${id}`,
        method:'put',
        data
    })
}

export function isLocked(id) {
    return request({
        url:`/api/admin/users/${id}/lock`,
        method:'patch'
    })
}
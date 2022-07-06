import { request } from "./request";
export function getCategoryList() {
    return request({
        url:'/api/admin/category'
    })
}
export function addCategory(data) {
    return request({
        url:'/api/admin/category',
        method:'post',
        data
    })
}

export function editCategory(data) {
    return request({
        url:`/api/admin/category/${data.id}`,
        method:'PUT',
        data
    })
}
export function Forbidden(id) {
   return request({
       url:`/api/admin/category/${id}/status`,
       method:'patch'
   })
}
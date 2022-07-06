import { request } from "./request";

export function getGoods(data) {
    if (data.is_recommend !== '' && data.is_on !== '') {
        return request({
            url: `/api/admin/goods?current=${data.current}&title=${data.title}&is_recommend=${data.is_recommend}&is_on=${data.is_on}`
        })
    } else if (data.is_recommend !== '') {
        return request({
            url: `/api/admin/goods?current=${data.current}&title=${data.title}&is_recommend=${data.is_recommend}`
        })
    } else if (data.is_on !== '') {
        return request({
            url: `/api/admin/goods?current=${data.current}&title=${data.title}&is_on=${data.is_on}`
        })
    }
    else {
        return request({
            url: `/api/admin/goods?current=${data.current}&title=${data.title}`
        })
    }
}
export function addGoods(data) {
    return request({
        url: '/api/admin/goods',
        method: 'post',
        data
    })
}
export function changeIsOn(id) {
    return request({
        url: `/api/admin/goods/${id}/on`,
        method: 'PATCH'
    })
}
export function changeIsRecommend(id) {
    return request({
        url: `/api/admin/goods/${id}/recommend`,
        method: 'PATCH'
    })
}
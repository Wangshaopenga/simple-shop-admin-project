import { request } from "./request";

export function getSlides(current=1) {
    return request({
        url: `/api/admin/slides?current=${current}`
    })
}

export function  forbidSlide(id) {
    return request({
        url:`/api/admin/slides/${id}/status`,
        method:'PATCH'
    })
}

export function deleteSlide(id) {
    return request({
        url:`/api/admin/slides/${id}`,
        method:'delete'
    })
}
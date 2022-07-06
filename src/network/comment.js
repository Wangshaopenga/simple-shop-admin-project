import { request  } from "./request";

export function getComments(data) {
    return request({
        url:`/api/admin/comments?current=${data.current}&goods_title=${data.goods_title}`
    })
}
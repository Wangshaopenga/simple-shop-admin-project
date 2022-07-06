import { request } from "./request";

export function getOder(data) {
    console.log(data);
    return request({
        url: `/api/admin/orders?current=${data.current}&order_no=${data.order_no}`,
    })
}
import { request } from "./request";
export function getData() {
    return request ({
        url:'/api/admin/index',
    })
}
import { request } from "./request";
export function getMenus() {
    return request ({
        url:'/api/admin/menus',
    })
}
import request from "@/axios/request";

// 登录方法
export function login(username, password) {
    const data = {
        username,
        password
    }
    return request.post(
        url
    )
}
import request from "@/axios/request";
// 登录方法
export const login = (data) => request.post("/api/login",data)


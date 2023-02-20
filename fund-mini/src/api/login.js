import {post} from "@/axios/axios";
// 登录方法
export const login = (data) => post("/api/login",data)


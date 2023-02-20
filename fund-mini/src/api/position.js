import request from "@/axios/request";

// 查询个人持仓列表
export const getAllPosition = (data) => {
    return request.post("/api/position/all",data)
}

// 查询个人持仓总数据

// 新增个人持仓数据
export const addPosition = (data) => {
    return request.post("/api/position/add",data)
}
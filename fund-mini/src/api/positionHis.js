import request from "@/axios/request";

// 查询个人持仓列表
export const getAllPositionHis = (data) => {
    return request.post("/api/positionHis/all",data)
}

// 新增个人持仓数据
export const addPosition = (data) => {
    return request.post("/api/position/add",data)
}
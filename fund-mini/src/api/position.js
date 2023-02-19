import request from "@/axios/request";

// 查询个人持仓列表
export const getAllPosition = (data) => {
    return request.post("/api/position/all",data)
}


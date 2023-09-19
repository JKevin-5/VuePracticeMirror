const add = require('../add')

// test和it是等价的

// 组合的多例子的用describe和it
describe("add",()=>{
    it("1+1=2",()=>{

        // 准备数据 -> given
        const a = 1
        const b = 2
    
        // 触发测试动作 -> when
        const result = add(a,b)
    
        // then 验证
        expect(result).toBe(3);
    })
    it("1+1=2",()=>{

        // 准备数据 -> given
        const a = 2
        const b = 2
    
        // 触发测试动作 -> when
        const result = add(a,b)
    
        // then 验证
        expect(result).toBe(3);
    })
})

// 单独的测试用test（习惯用法）
test("1+1=2",()=>{

    // 准备数据 -> given
    const a = 1
    const b = 2

    // 触发测试动作 -> when
    const result = add(a,b)

    // then 验证
    expect(result).toBe(3);
})

test("判断两个对象是否相等",() => {
    const objA = {
        name:"objA"
    }
    const objB = {
        name:"objA"
    }

    expect(objA).toEqual(objB)
})

test("string contain str",()=>{
    const str = "string"

    expect(str).toContain("str")
})
import Mock from'mockjs'
export default[
    {
        url: '/test/getUserInfo',
        method: 'post',
        response: () => {
            return {
                code: 0,
                message: 'ok',
                email: Mock.mock('@email'),
                data:{
                    'username': 'string',
                    'date':Mock.Random.date(),
                    'age|3': 18,
                    'list|10':[
                        {
                            'id|+1':1,
                            'type|+1':['one','two']
                        }
                    ]
                }
            }
        }
    }
]
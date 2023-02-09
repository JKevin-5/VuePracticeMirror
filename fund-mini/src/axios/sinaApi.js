import axios from "axios";
import {stock} from '@/axios/fund'
export function getSinaInfo(billNo,successFunction){
    let arr = []
    for(let no of billNo){
        arr.push(axios.get('/sina/list=' + no));
    }
    axios.all(arr).then(axios.spread(function (v1, v2, v3){
        let arr1 = [];
        let strings = v1.data.split('"')
        let results = strings[1].split(',')
        arr1.push(new stock(results))
        strings = v2.data.split('"')
        results = strings[1].split(',')
        arr1.push(new stock(results))
        strings = v3.data.split('"')
        results = strings[1].split(',')
        arr1.push(new stock(results))
        successFunction(arr1)
    }));
    // axios.get(
    //     '/sina/list=' + billNo
    // ).then(res=>{
    //     // 拆分字符串
        // let strings = res.data.split('"')
        // let results = strings[1].split(',')
        // successFunction(results)
    // })
}
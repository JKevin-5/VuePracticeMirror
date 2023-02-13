import axios from "axios";
import {stock} from '@/axios/fund'
export function getSinaInfo(billNo,successFunction){
    let arr = []
    for(let no of billNo){
        arr.push(axios.get('/sina/list=' + no));
    }
    axios.all(arr).then(axios.spread(function (...data){
        let arr1 = []
        for(let value of data){
            let strings = value.data.split('"')
            let results = strings[1].split(',')
            arr1.push(new stock(results))
        }
        console.log(arr1)
        successFunction(arr1)
    }));
}
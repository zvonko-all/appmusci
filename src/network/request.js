import axios from "axios"


export function myaxios(config){
    return new Promise((resolve,reject)=>{
        const instance1 = axios.create({
            baseURL: "http://www.guozipeng.tk",
            timeout: 5000
        })

        instance1(config).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}
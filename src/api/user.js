import instance from "@/utility/request";
export function login(data={}){
    return instance({
        url:'/students/sys/loginWeb',
        method:'POST',
        data,
        isToken:false
    })
}
export function userInfo(data={}){
    return instance({
        url:'/students/sys/validUser',
        method:'POST',
        data
    })
}
import instance from "@/utility/request";
export function getClass(data={}){
    return instance({
        url:'/students/classes/page',
        method:'POST',
        data
    })
}
export function createClass(data={}){
    return instance({
        url:'/students/classes/create',
        method:'POST',
        data
    })
}
export function editClass(data={}){
    return instance({
        url:'/students/classes/update',
        method:"POST",
        data
    })
}
export function destroyClass(params={}){
    return instance({
        url:'/students/classes/destroy',
        method:'GET',
        params
    })
}
export function classlist(params={}){
    return instance({
        url:'/students/classes/query',
        method:'GET',
        params
    })
}
export function studentlist(data={}){
    return instance({
        url:'/students/classes/page',
        method:'POST',
        data
    })
}
export function studentMajor(params={}){
    return instance({
        url:'/students/major/query',
        method:'GET',
        params
    })
}
export function register(data={}){
    return instance({
        url:'/students/sys/register',
        method:'POST',
        data
    })
}
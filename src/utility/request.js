import axios from "axios";
import Cookie from "vue-cookies"
import { MessageBox } from "element-ui";
import router from "@/router/index"
const instance=axios.create({
    baseURL:'http://120.78.172.212:7789/'
})
//请求拦截
instance.interceptors.request.use((config)=>{
    console.log(config)
    
    if(!config.hasOwnProperty('isToken')) config.isToken=true
    
    if(config.isToken){
       config.headers={
        ...config.headers,
        Authorization:`Bearer ${Cookie.get('token')}`
       }
       
    }
    return config
})
//响应拦截
instance.interceptors.response.use((res)=>{
    console.log(res);
    if(res.status==401||res.data.code==401||res.data.status==401){
        MessageBox.alert('登陆失败',{
            title:'提示',
            type:'error',
            showClose:false
        }).then(()=>{
            Cookie.remove('token'),
            router.push('/login')
        })
    }
    return res.data
})
export default instance
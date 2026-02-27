import axios from "axios"

const URI=import.meta.env.VITE_API_URI
const instance=(token:string)=>{
    return axios.create({
        baseURL:URI,
        headers:{
            "Authorization":`Bearer ${token ? token : {}}`
        }
    })
}
export default instance

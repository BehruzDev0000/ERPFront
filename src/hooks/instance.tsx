import axios from "axios"

const URI=import.meta.env.VITE_API_URI
const instance=()=>{
    return axios.create({
        baseURL:URI
    })
}
export default instance

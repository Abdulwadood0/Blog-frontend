import axios from "axios";

const request = axios.create({
    baseURL: "https://blog-backend-c1ma.onrender.com"
})

export default request
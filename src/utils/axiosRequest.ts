import axios from 'axios'

const axiosRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

export default axiosRequest

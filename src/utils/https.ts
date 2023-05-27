import axios, { AxiosError, AxiosResponse, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'

const http = axios.create({
  baseURL: 'https://api-ecom.duthanhduoc.com/',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})
http.interceptors.response.use(
  function (response: AxiosResponse) {
    toast.success(response.data.message)
    return response
  },
  function (error: AxiosError) {
    if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
      console.log('404')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any | undefined = error.response?.data
      const message = data.message || error.message
      toast.error(message)
    }
    return Promise.reject(error)
  }
)

export default http

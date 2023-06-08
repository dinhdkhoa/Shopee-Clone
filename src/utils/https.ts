import axios, { AxiosInstance, AxiosError, HttpStatusCode } from 'axios'
import { getTokenFromLS, removeAccessToken, saveProfiletoLS, saveTokentoLS } from './auth'
import { toast } from 'react-toastify'
import { path } from 'src/constant/path'
import { AuthResponse } from 'src/types/auth.types'

// const http = axios.create({
//   baseURL: 'https://api-ecom.duthanhduoc.com/',
//   timeout: 10000,
//   headers: { 'Content-Type': 'application/json' }
// })

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getTokenFromLS()
    ;(this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })),
      this.instance.interceptors.response.use(
        (response) => {
          const { url } = response.config
          if (url === path.login) {
            const { data } = response.data as AuthResponse
            this.accessToken = data.access_token
            saveTokentoLS(this.accessToken)
            saveProfiletoLS(data.user)
          } else if (url === path.logout) {
            removeAccessToken()
          }
          return response
        },
        function (error: AxiosError) {
          if (error.response?.status === HttpStatusCode.Unauthorized) {
            removeAccessToken()
          }
          if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data: any | undefined = error.response?.data
            const message = data.message || error.message
            toast.error(message)
          }
          return Promise.reject(error)
        }
      ),
      this.instance.interceptors.request.use((config) => {
        if (this.accessToken) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      })
  }
}

const http = new Http().instance

export default http

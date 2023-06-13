import axios, { AxiosInstance, AxiosError, HttpStatusCode, InternalAxiosRequestConfig } from 'axios'
import {
  getAccessTokenFromLS,
  clearLocalStorage,
  saveProfiletoLS,
  saveAccessTokentoLS,
  getRefreshTokenFromLS,
  saveRefreshTokentoLS
} from './auth'
import { toast } from 'react-toastify'
import { AuthResponse, RefreshTokenSuccessResponse } from 'src/types/auth.types'
import { authURL } from 'src/apis/auth.api'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
import { ErrorResponse } from 'src/types/utils.type'

// const http = axios.create({
//   baseURL: 'https://api-ecom.duthanhduoc.com/',
//   timeout: 10000,
//   headers: { 'Content-Type': 'application/json' }
// })

class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.refreshTokenRequest = null
    ;(this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 100000000,
        'expire-refresh-token': 60 * 60 * 1000000
      }
    })),
      this.instance.interceptors.response.use(
        (response) => {
          const { url } = response.config
          if (url === authURL.login) {
            const { data } = response.data as AuthResponse
            this.accessToken = data.access_token
            this.refreshToken = data.refresh_token
            saveAccessTokentoLS(this.accessToken)
            saveRefreshTokentoLS(this.refreshToken)
            saveProfiletoLS(data.user)
          } else if (url === authURL.logout) {
            clearLocalStorage()
            this.accessToken = ''
            this.refreshToken = ''
          }
          return response
        },
        (error: AxiosError) => {
          // Chỉ toast lỗi không phải 422 và 401
          if (
            ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(
              error.response?.status as number
            )
          ) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data: any | undefined = error.response?.data
            const message = data?.message || error.message
            toast.error(message)

            // Lỗi Unauthorized (401) có rất nhiều trường hợp
            // - Token không đúng
            // - Không truyền token
            // - Token hết hạn*

            // Nếu là lỗi 401
            if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
              const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
              const { url } = config
              // Trường hợp Token hết hạn và request đó không phải là của request refresh token
              // thì chúng ta mới tiến hành gọi refresh token
              if (isAxiosExpiredTokenError(error) && url !== authURL.refreshToken) {
                // Hạn chế gọi 2 lần handleRefreshToken
                this.refreshTokenRequest = this.refreshTokenRequest
                  ? this.refreshTokenRequest
                  : this.handleRefreshToken().finally(() => {
                      // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
                      setTimeout(() => {
                        this.refreshTokenRequest = null
                      }, 10000)
                    })
                return this.refreshTokenRequest.then((access_token) => {
                  // Nghĩa là chúng ta tiếp tục gọi lại request cũ vừa bị lỗi
                  return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
                })
              }

              // Còn những trường hợp như token không đúng
              // không truyền token,
              // token hết hạn nhưng gọi refresh token bị fail
              // thì tiến hành xóa local storage và toast message

              clearLocalStorage()
              this.accessToken = ''
              this.refreshToken = ''
              toast.error(error.response?.data.data?.message || error.response?.data.message)
            }
            return Promise.reject(error)
          }
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
  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenSuccessResponse>(authURL.refreshToken, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        this.accessToken = access_token
        saveAccessTokentoLS(access_token)
        return access_token
      })
      .catch((error) => {
        clearLocalStorage()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
}

const http = new Http().instance

export default http

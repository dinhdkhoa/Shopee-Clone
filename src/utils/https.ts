import axios, { AxiosInstance, AxiosError, HttpStatusCode, InternalAxiosRequestConfig } from 'axios'
import {
  clearLocalStorage,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  saveAccessTokentoLS,
  saveProfiletoLS,
  saveRefreshTokentoLS
} from './auth'
import { toast } from 'react-toastify'
import { AuthResponse } from 'src/types/auth.types'
import { authURL } from 'src/apis/auth.api'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
import { ErrorResponse } from 'src/types/utils.type'

// const http = axios.create({
//   baseURL: 'https://api-ecom.duthanhduoc.com/',
//   timeout: 10000,
//   headers: { 'Content-Type': 'application/json' }
// })

export class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private requestRefreshToken: Promise<string> | null
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.requestRefreshToken = null
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 3600,
        'expire-refresh-token': 864000
      }
    })
    this.instance.interceptors.request.use((config) => {
      if (this.accessToken !== '') {
        config.headers.authorization = this.accessToken
        return config
      }
      return config
    })
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === 'me') {
          console.log(1)
        }
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
        // if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }
        if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
          const { url } = config
          if (
            isAxiosExpiredTokenError<ErrorResponse<{ name: string; message: string }>>(error) &&
            url !== authURL.refreshToken
          ) {
            this.requestRefreshToken = this.requestRefreshToken
              ? this.requestRefreshToken
              : this.handleRefreshToken().finally(() => {
                  setTimeout(() => {
                    this.requestRefreshToken = null
                  }, 10000)
                })
            return this.requestRefreshToken.then((access_token) => {
              return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
            })
          }
          clearLocalStorage()
          this.accessToken = ''
          this.refreshToken = ''
          toast.error('Session Expired')
        }
        return Promise.reject(error)
      }
    )
  }
  private handleRefreshToken() {
    return this.instance
      .post(authURL.refreshToken, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        this.accessToken = res.data.data.access_token
        saveAccessTokentoLS(this.accessToken)
        return this.accessToken
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

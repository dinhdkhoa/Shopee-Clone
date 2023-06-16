import { AuthResponse } from 'src/types/auth.types'
import http from 'src/utils/https'

export const authURL = {
  register: 'register',
  login: 'login',
  logout: 'logout',
  refreshToken: 'refresh-access-token'
}

const authApi = {
  registerAccount: (body: { email: string; password: string }) => http.post<AuthResponse>(authURL.register, body),
  login: (body: { email: string; password: string }) => http.post<AuthResponse>(authURL.login, body),
  logout: () => http.post<AuthResponse>(authURL.logout)
}

// export const registerAccount = (body: { email: string; password: string }) =>
//   http.post<AuthResponse>(path.register, body)

// export const login = (body: { email: string; password: string }) => http.post<AuthResponse>(path.login, body)

// export const logout = () => http.post<AuthResponse>(path.logout)

export default authApi

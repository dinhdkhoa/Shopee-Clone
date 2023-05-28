import { path } from 'src/constant/path'
import { AuthResponse } from 'src/types/auth.types'
import http from 'src/utils/https'

export const registerAccount = (body: { email: string; password: string }) =>
  http.post<AuthResponse>(path.register, body)

export const login = (body: { email: string; password: string }) => http.post<AuthResponse>(path.login, body)

export const logout = () => http.post<AuthResponse>(path.logout)

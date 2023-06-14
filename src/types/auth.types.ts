import { SuccessResponse } from './utils.type'
import { User } from './user.types'

export type AuthResponse = SuccessResponse<{
  access_token: string
  refresh_token: string
  expires: number
  expires_refresh_token: number
  user: User
}>

export type RefreshTokenSuccessResponse = SuccessResponse<{ access_token: string }>

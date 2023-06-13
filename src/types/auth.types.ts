import { SuccessResponse } from './utils.type'
import { User } from './user.types'

export type AuthResponse = SuccessResponse<{
  access_token: string
  refresh_token: string
  expires: string
  user: User
}>

export type RefreshTokenSuccessResponse = SuccessResponse<{ access_token: string }>

import { SuccessResponse } from './utils.type'
import { User } from './user.types'

export type AuthResponse = SuccessResponse<{
  access_token: string
  expires: string
  user: User
}>

export type UserResponse = SuccessResponse<User>

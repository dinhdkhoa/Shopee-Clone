import { ResponseApi } from './utils.type'
import { User } from './user.types'

export type AuthResponse = ResponseApi<{
  access_token: string
  expires: string
  user: User
}>

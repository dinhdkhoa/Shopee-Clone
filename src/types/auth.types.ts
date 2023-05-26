import { responseApi } from './utils.type'
import { User } from './user.types'

type Auth = responseApi<{
  access_token: string
  expires: string
  user: User
}>

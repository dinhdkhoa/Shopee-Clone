import { User } from 'src/types/user.types'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/https'

interface BodyForm extends Omit<User, '_id' | 'roles' | 'email' | 'createdAt' | 'updatedAt'> {
  password?: string
  new_password?: string
}

const userApi = {
  getUser: () => {
    return http.get<SuccessResponse<User>>('me')
  },
  updateUser: (body: BodyForm) => {
    return http.put<SuccessResponse<User>>('user', body)
  },
  uploadUserAvatar: (body: FormData) => {
    return http.post<SuccessResponse<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userApi

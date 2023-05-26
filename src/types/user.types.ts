type Roles = 'User' | 'Admin'

export interface User {
  _id: string
  roles: Roles[]
  email: string
  createdAt: string
  updatedAt: string
}

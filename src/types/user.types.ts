type Roles = 'User' | 'Admin'

export interface User {
  _id: string
  roles: Roles[]
  email: string
  createdAt: string
  updatedAt: string
  address?: string
  avatar?: string
  date_of_birth?: string
  name?: string
  phone?: string
}

import { User } from 'src/types/user.types'

export const saveTokentoLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}
export const getTokenFromLS = () => localStorage.getItem('access_token') || ''

export const removeAccessToken = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile') || null
  return result ? JSON.parse(result) : null
}

export const saveProfiletoLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

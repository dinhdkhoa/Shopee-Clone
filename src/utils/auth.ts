import { User } from 'src/types/user.types'

export const LocalStorageEventTarget = new EventTarget()

export const saveAccessTokentoLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}
export const saveRefreshTokentoLS = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}
export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''
export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token') || ''

export const clearLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile') || null
  return result ? JSON.parse(result) : null
}

export const saveProfiletoLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

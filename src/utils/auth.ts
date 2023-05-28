export const saveTokentoLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}
export const getTokenFromLS = () => localStorage.getItem('access_token') || ''

export const removeAccessToken = () => {
  localStorage.removeItem('access_token')
}

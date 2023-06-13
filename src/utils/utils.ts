import { AxiosError, isAxiosError } from 'axios'
import { HttpStatusCode } from 'src/constant/httpStatusCode.enum'
import { ErrorResponse } from 'src/types/utils.type'

export default function isAxiosUnprocessableError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError<FormError>(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) &&
    error.response?.data?.data?.name === 'EXPIRED_TOKEN'
  )
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
    .format(value)
    .replace('.', ',')
    .toLocaleLowerCase()
}

export function rateSale(original: number, sale: number) {
  return Math.round(((original - sale) / original) * 100) + '%'
}

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}

const defaultAvatar =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA83Aa64pQYUL2GNSPYANXnMXqhGTGM4_G6y8xATpHxNa4e9zuv4cYAOJstnU_3EMAykM&usqp=CAU'
export const getAvatarURL = (avatarName?: string) =>
  avatarName ? `https://api-ecom.duthanhduoc.com/images/${avatarName}` : defaultAvatar

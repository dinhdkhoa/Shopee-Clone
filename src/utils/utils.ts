import { AxiosError, isAxiosError } from 'axios'
import { HttpStatusCode } from 'src/constant/httpStatusCode.enum'

export default function isAxiosUnprocessableError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError<FormError>(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

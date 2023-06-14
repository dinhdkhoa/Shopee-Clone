import { AxiosError, isAxiosError } from 'axios'
import { describe, expect, it } from 'vitest'
import { isAxiosUnauthorizedError } from '../utils'
import { HttpStatusCode } from 'src/constant/httpStatusCode.enum'

// The two tests marked with concurrent will be run in parallel
describe('Test isAxiosError', () => {
  it('isAxiosError return boolean', () => {
    expect(isAxiosError(new Error())).toBe(false)
    expect(isAxiosError(new AxiosError())).toBe(true)
  })
})

describe('Test isAxiosUnauthorizedError', () => {
  it('isAxiosUnauthorizedError return boolean', () => {
    expect(isAxiosUnauthorizedError(new Error())).toBe(false)
    expect(
      isAxiosUnauthorizedError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.Unauthorized
        } as any)
      )
    ).toBe(true)
  })
})

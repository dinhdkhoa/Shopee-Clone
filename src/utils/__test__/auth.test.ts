import { describe, expect, it } from 'vitest'
import { getAccessTokenFromLS, getRefreshTokenFromLS, saveAccessTokentoLS, saveRefreshTokentoLS } from '../auth'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmY2NjkwMWFmYzJlMWExZjk2NzljYiIsImVtYWlsIjoiZGRrMUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA2LTE0VDA0OjA4OjE5LjI5OVoiLCJpYXQiOjE2ODY3MTU2OTksImV4cCI6MTY4NzU3OTY5OX0.v8PzW--PStrTB0qHxYIN7MS7Y3F8nDO7fr8sW9ATMSk'
const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmY2NjkwMWFmYzJlMWExZjk2NzljYiIsImVtYWlsIjoiZGRrMUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA2LTE0VDA0OjA4OjE5LjI5OVoiLCJpYXQiOjE2ODY3MTU2OTksImV4cCI6MTY4NjgwMjA5OX0.QD5ojSv8gd-YZGveYo_SVCjRmbij3ztwGGSOQf1Y0DA'

describe('Test saveAccessTokentoLS', () => {
  it('access_token save on LS ', () => {
    saveAccessTokentoLS(access_token)
    expect(localStorage.getItem('access_token')).toBe(access_token)
  })
})

describe('Test saveRefreshTokentoLS', () => {
  it('refresh_token save on LS ', () => {
    saveRefreshTokentoLS(refresh_token)
    expect(localStorage.getItem('refresh_token')).toBe(refresh_token)
  })
})
describe('Test getAccessTokenFromLS', () => {
  it('get access_token from LS ', () => {
    expect(getAccessTokenFromLS()).toBe(access_token)
  })
})

describe('Test saveRefreshTokentoLS', () => {
  it('get refresh_token from LS ', () => {
    expect(getRefreshTokenFromLS()).toBe(refresh_token)
  })
})
describe('Test clearLocalStorage', () => {
  it('test clear localStorage ', () => {
    expect(getRefreshTokenFromLS()).toBe(refresh_token)
  })
})

import { HttpStatusCode } from 'src/constant/httpStatusCode.enum'
import { describe, expect, it, beforeEach } from 'vitest'
import { saveAccessTokentoLS, saveRefreshTokentoLS } from '../auth'
import { Http } from '../https'

describe('http axios', () => {
  let http = new Http().instance
  beforeEach(() => {
    localStorage.clear()
    http = new Http().instance
  })
  const access_token_1s =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzAzNDUzMWFmYzJlMWExZjk2N2EwYSIsImVtYWlsIjoidXNlcjQzQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDYtMTRUMjM6MzM6MDUuODk4WiIsImlhdCI6MTY4Njc4NTU4NSwiZXhwIjoxNjg2Nzg1NTg2fQ.Tvw2PNrWHMUxdZRujyWDv8qSdAO3t5PHI1kFYRK7UU0'
  const refresh_token_1000days =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzAzNDUzMWFmYzJlMWExZjk2N2EwYSIsImVtYWlsIjoidXNlcjQzQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDYtMTRUMjM6MzM6MDUuODk4WiIsImlhdCI6MTY4Njc4NTU4NSwiZXhwIjoxNzczMTg1NTg1fQ.yVcrrleHw24yj4_BEEJgScvzmXmlDBb6eIeVIigKhXk'
  it('Gọi API', async () => {
    // Không nên đụng đến thư mục apis
    // Vì chúng ta test riêng file http thì chỉ "nên" dùng http thôi
    // vì lỡ như thư mục apis có thay đổi gì đó
    // thì cũng không ảnh hưởng gì đến file test này
    const res = await http.get('products')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('Auth Request', async () => {
    // Nên có 1 cái account test
    // và 1 server test
    await http.post('login', {
      email: 'd3@gmail.com',
      password: 'useruser'
    })
    const res = await http.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('Refresh Token', async () => {
    saveAccessTokentoLS(access_token_1s)
    saveRefreshTokentoLS(refresh_token_1000days)
    const httpNew = new Http().instance
    const res = await httpNew.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  }, 10000)
})

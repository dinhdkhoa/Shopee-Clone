import { describe, expect, test } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
import App from './App'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'

expect.extend(matchers)

describe('App render', () => {
  test('App Render và chuyển trang', async () => {
    render(<App />, {
      wrapper: BrowserRouter
    })
    const user = userEvent.setup()
    /**
     * waitFor sẽ run callback 1 vài lần
     * cho đến khi hết timeout hoặc expect pass
     * số lần run phụ thuộc vào timeout và interval
     * mặc định: timeout = 1000ms và interval = 50ms
     */

    // Verify vào đúng trang chủ
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Shopee')
    })

    await user.click(screen.getByText(/Đăng nhập/i))
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee Clone')
      expect(screen.queryByText('Bạn chưa có tài khoản?')).toBeInTheDocument()
      expect(screen.queryByPlaceholderText('Email ')).toBeInTheDocument()
    })
  })
})

describe.only('Bad Route render 404 page', () => {
  test('Bad Route render 404 page', async () => {
    const badRoute = '/a/12311231'
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.queryByText(/Page not found/i)).toBeInTheDocument
    })
  })
})

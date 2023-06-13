import { Outlet } from 'react-router-dom'
import Footer from 'src/components/Footer'
import RegisterHeader from 'src/components/RegisterHeader'

interface props {
  children?: React.ReactNode
}

export default function RegisterLayout({ children }: props) {
  return (
    <>
      <RegisterHeader />
      {children}
      <Outlet />
      <Footer />
    </>
  )
}

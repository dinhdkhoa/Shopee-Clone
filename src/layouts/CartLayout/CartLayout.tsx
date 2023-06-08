import CartHeader from 'src/components/CartHeader'
import Footer from 'src/components/Footer'

interface props {
  children?: React.ReactNode
}

export default function CartLayout({ children }: props) {
  return (
    <>
      <CartHeader />
      {children}
      <Footer />
    </>
  )
}

import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

interface props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

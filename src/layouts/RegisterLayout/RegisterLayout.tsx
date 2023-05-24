import Footer from 'src/components/Footer'
import RegisterHeader from 'src/components/RegisterHeader'

interface childrenLayout {
  children?: React.ReactNode
}

export default function RegisterLayout({ children }: childrenLayout) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}

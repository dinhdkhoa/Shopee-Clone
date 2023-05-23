interface childrenLayout {
  children?: React.ReactNode
}

export default function RegisterLayout({ children }: childrenLayout) {
  return (
    <div>
      RegisterLayout
      {children}
    </div>
  )
}

import { useEffect } from 'react'
import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAppContext } from './context/app.context'
import { LocalStorageEventTarget } from './utils/auth'

function App() {
  const { reset } = useAppContext()
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  const routeElements = useRouteElements()
  return (
    <>
      {routeElements}
      <ToastContainer autoClose={1500} />
    </>
  )
}

export default App

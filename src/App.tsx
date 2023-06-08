import { useContext, useEffect } from 'react'
import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppContext } from './context/app.context'
import { LocalStorageEventTarget } from './utils/auth'

function App() {
  const { reset } = useContext(AppContext)
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
      <ToastContainer />
    </>
  )
}

export default App

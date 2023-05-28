import { createContext, useState } from 'react'
import { getTokenFromLS } from 'src/utils/auth'

interface AppContext {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const initialAppContext: AppContext = {
  isAuthenticated: Boolean(getTokenFromLS()),
  setIsAuthenticated: () => null
}

export const AppContext = createContext<AppContext>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  return <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AppContext.Provider>
}

import { createContext, useState } from 'react'
import { Purchase } from 'src/types/purchase.types'
import { User } from 'src/types/user.types'
import { getProfileFromLS, getTokenFromLS } from 'src/utils/auth'

interface ExtendedPurchase extends Purchase {
  checked: boolean
  disabled: boolean
}
interface AppContext {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchases: ExtendedPurchase[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
}

const initialAppContext: AppContext = {
  isAuthenticated: Boolean(getTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null
}

export const AppContext = createContext<AppContext>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  return (
    <AppContext.Provider
      value={{ extendedPurchases, setExtendedPurchases, isAuthenticated, setIsAuthenticated, profile, setProfile }}
    >
      {children}
    </AppContext.Provider>
  )
}

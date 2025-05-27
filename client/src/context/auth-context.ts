import { createContext, useContext } from 'react'

const AuthContext = createContext({
  authChanged: Date.now(),
  handleAuthChanged: () => {},
})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = AuthContext.Provider
export default AuthContext

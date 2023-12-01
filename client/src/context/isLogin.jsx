import { createContext, useState } from 'react'

// Creamos el contexto <- el que vamos a consumir
export const LoginContext = createContext()

// Creamos el provider <- el que provee el contexto
export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem('token'))

  const handleLogin = () => {
    localStorage.clear()
    setIsLogin(false)
    window.location.href = window.location.origin
  }

  return (
    <LoginContext.Provider value={{ isLogin, handleLogin }}>
      {children}
    </LoginContext.Provider>
  )
}

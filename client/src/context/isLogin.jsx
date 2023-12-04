import { createContext, useState } from 'react'

// Creamos el contexto <- el que vamos a consumir
export const LoginContext = createContext()

// Creamos el provider <- el que provee el contexto
export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem('token'))

  const handleLogin = () => {
    localStorage.clear() // Se limpia el local storage para borrar las credenciales del usuario
    setIsLogin(false)// se setea en false para identificar que el usuario dejo de estar logueado
    window.location.href = window.location.origin // Se recarga de esta manera para que los componentes se actualizen
  }

  return (
    <LoginContext.Provider value={{ isLogin, handleLogin }}>
      {children}
    </LoginContext.Provider>
  )
}

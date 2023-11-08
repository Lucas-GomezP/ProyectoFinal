import { createContext, useState } from 'react'

// Creamos el contexto <- el que vamos a consumir
export const UserContext = createContext()

// Creamos el provider <- el que provee el contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

import { createContext, useState } from 'react'

// Creamos el contexto <- el que vamos a consumir
export const UserContext = createContext()

// Creamos el provider <- el que provee el contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const handleUser = () => {
    const newUser = {
      id: localStorage.id,
      token: localStorage.token,
      username: localStorage.username
    }
    setUser(newUser)
  }

  return (
    <UserContext.Provider value={{ user, handleUser }}>
      {children}
    </UserContext.Provider>
  )
}

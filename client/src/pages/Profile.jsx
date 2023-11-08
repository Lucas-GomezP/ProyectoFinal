import { Menu } from '../components/Menu'
import { UserContext } from '../context/user'
import { useContext } from 'react'

export const Profile = () => {
  const { setUser } = useContext(UserContext)

  const closeSesion = () => {
    setUser(null)
  }

  return (
    <Menu>
      <h2>Hola</h2>
      <button
        onClick={closeSesion}
        className='bg-red-400 p-2 rounded-md font-bold border border-red-700 hover:bg-red-700 hover:text-white'
      >Cerrar Sesion
      </button>
    </Menu>
  )
}

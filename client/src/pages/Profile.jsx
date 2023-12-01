import { useContext } from 'react'
import { Menu } from '../components/Menu'
import { LoginContext } from '../context/isLogin'
import { Link } from 'react-router-dom'

export const Profile = () => {
  const { handleLogin } = useContext(LoginContext)
  const LogOut = () => {
    handleLogin()
  }

  return (
    <Menu>
      <Link
        onClick={() => LogOut()}
        className='bg-red-400 p-2 rounded-md font-bold border border-red-700 hover:bg-red-700 hover:text-white'
      >Cerrar Sesion
      </Link>
    </Menu>
  )
}

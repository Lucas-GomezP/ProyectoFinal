import { Link } from 'react-router-dom'
import logo from '../../public/logo.svg'
import { useContext } from 'react'
import { LoginContext } from '../context/isLogin'

export const NavBar = () => {
  // Se trae al contexto Login para poder manejar las debidas rutas de cerrar sesion, iniciarla y registrarse
  const { isLogin, handleLogin } = useContext(LoginContext)

  const LogOut = () => {
    handleLogin()
  }

  return (
    <nav className='flex justify-between max-h-20 px-1 sm:px-5 bg-gray-100'>
      <section className='flex items-center  sm:gap-x-3'>
        <img src={logo} alt='Logo de la empresa' className='w-10 sm:w-12' />
        <h1 className='font-semibold sm:text-xl'>FacturIZI</h1>
      </section>
      <section className='flex items-center sm:gap-x-5 justify-end'>
        {isLogin && (
          <Link onClick={() => LogOut()} className='border rounded p-1 text-xs sm:p-2 hover:bg-[#a855f7] flex items-center hover:text-[#ffed00]'>Cerrar sesion</Link>
        )}
        {!isLogin && (
          <>
            <Link to='/signIn' className='border rounded p-1 text-xs sm:p-2 hover:bg-[#a855f7] flex items-center hover:text-[#ffed00]'>Registrarse</Link>
            <Link to='/login' className='border rounded p-1 text-xs sm:p-2 hover:bg-[#a855f7] flex items-center hover:text-[#ffed00]'>Iniciar sesion</Link>
          </>
        )}
      </section>
    </nav>
  )
}

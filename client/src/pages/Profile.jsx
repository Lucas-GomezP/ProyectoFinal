import { Menu } from '../components/Menu'

export const Profile = () => {
  const closeSesion = () => {
    localStorage.clear()
    window.location.reload()
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

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from './Header'
import { IconDashboard, IconProducts, IconClient, IconBills } from '../components/Icons'

// El menu utiliza el componente Header para mantener siempre la cabecera visible, pero el aside bar para ser responsivo usa un useState y toma el children para acomodarlo dependiendo de la vision misma de la pagina

const navigationBar = [
  { name: 'Dashboard', route: '/dashboard', icon: <IconDashboard />, current: true },
  { name: 'Productos', route: '/products', icon: <IconProducts />, current: false },
  { name: 'Clientes', route: '/clients', icon: <IconClient />, current: false },
  { name: 'Facturas', route: '/bills', icon: <IconBills />, current: false }
]

export const Menu = ({ children }) => {
  const [responsiveSideMenu, setResponsiveSideMenu] = useState(true)

  const handleClick = (item) => {
    navigationBar.forEach(i => {
      if (i.name === item.name) {
        i.current = true
      } else {
        i.current = false
      }
    })
  }
  return (
    <>
      <Header setResponsiveSideMenu={setResponsiveSideMenu} responsiveSideMenu={responsiveSideMenu} />
      <main className='flex'>
        <aside
          onClick={() => { setResponsiveSideMenu(!responsiveSideMenu) }}
          className={`bg-slate-950 bg-opacity-50 fixed top-0 left-0 pt-14  z-40 ${responsiveSideMenu ? '-translate-x-full' : ' w-full'} lg:translate-x-0 lg:w-40 transition`}
        >
          <nav className='w-52 bg-gray-100 h-screen p-4'>
            <ul className='flex gap-2 flex-col'>
              {navigationBar.map(item => {
                return (
                  <li key={item.name}>
                    <Link
                      to={item.route}
                      onClick={() => handleClick(item)}
                      className={`p-1 flex items-center text-base text-gray-500 font-bold hover:ring-2 hover:ring-purple-500 hover:rounded-md hover:text-purple-500 focus:bg-white focus:text-purple-500 rounded-md focus:shadow-sm ${item.current ? 'bg-white text-purple-500 shadow-sm' : ''}`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>
        <section className='transition-all px-4 w-full lg:ml-52 pt-16 lg:pt-4'>
          {children}
        </section>
      </main>
    </>
  )
}

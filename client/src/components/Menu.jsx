import { useState } from 'react'
import { ItemMenu } from './ItemMenu'
import { Header } from './Header'
import { IconDashboard, IconProducts, IconClient, IconBills } from '../components/Icons'

// El menu utiliza el componente Header para mantener siempre la cabecera visible, pero el aside bar para ser responsivo usa un useState y toma el children para acomodarlo dependiendo de la vision misma de la pagina
export const Menu = ({ children }) => {
  const [responsiveSideMenu, setResponsiveSideMenu] = useState(true)

  return (
    <>
      <Header setResponsiveSideMenu={setResponsiveSideMenu} responsiveSideMenu={responsiveSideMenu} />
      <main className='flex'>
        <aside
          onClick={() => { setResponsiveSideMenu(!responsiveSideMenu) }}
          className={`bg-slate-950 bg-opacity-50 fixed top-0 left-0 pt-10  z-40 ${responsiveSideMenu ? '-translate-x-full' : ' w-full'} lg:translate-x-0 lg:w-40 transition`}
        >
          <nav className='w-40 bg-gray-100 h-screen p-4'>
            <ul className='flex gap-2 flex-col'>
              <ItemMenu route='/dashboard' icon={<IconDashboard />}>Dashboard</ItemMenu>
              <ItemMenu route='/products' icon={<IconProducts />}>Productos</ItemMenu>
              <ItemMenu route='/clients' icon={<IconClient />}>Clientes</ItemMenu>
              <ItemMenu route='/bills' icon={<IconBills />}>Facturas</ItemMenu>
            </ul>
          </nav>
        </aside>
        <section className='transition-all p-4 w-full lg:ml-40 pt-12 lg:pt-4'>
          {children}
        </section>
      </main>
    </>
  )
}

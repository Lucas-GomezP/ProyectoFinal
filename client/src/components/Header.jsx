import { IconMenu } from './Icons'
import logo from '../../public/logo.svg'

export const Header = ({ setResponsiveSideMenu, responsiveSideMenu }) => {
  return (
    <header className='bg-slate-100 fixed top-0 w-full h-14 z-50 flex items-center justify-between text-lg lg:w-52 transition-all lg:justify-start'>
      <div className='flex gap-2 items-center'>
        <img src={logo} alt='Logo de la empresa' className='w-8 ml-4' />
        <h1 className='font-bold text-2xl'>FacturIZI</h1>
      </div>
      <button
        onClick={() => { setResponsiveSideMenu(!responsiveSideMenu) }}
        className='p-1 lg:hidden focus:bg-white rounded mr-1'
      >
        <IconMenu />
      </button>
    </header>
  )
}

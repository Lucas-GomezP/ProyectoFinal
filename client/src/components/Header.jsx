import { IconMenu } from './Icons'

export const Header = ({ setResponsiveSideMenu, responsiveSideMenu }) => {
  return (
    <header className='bg-slate-100 fixed top-0 w-full h-10 z-50 flex items-center justify-between text-lg lg:w-40 transition-all lg:justify-start'>
      <h1>logo</h1>
      <button
        onClick={() => { setResponsiveSideMenu(!responsiveSideMenu) }}
        className='p-1 lg:hidden focus:bg-white rounded'
      >
        <IconMenu />
      </button>
    </header>
  )
}

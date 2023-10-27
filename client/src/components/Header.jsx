import { IconMenu } from './Icons'

export const Header = ({ setResponsiveSideMenu, responsiveSideMenu }) => {
  return (
    <header className='bg-slate-300 relative top-0 w-full h-10 z-50 flex items-center text-lg'>
      <button
        onClick={() => { setResponsiveSideMenu(!responsiveSideMenu) }}
        className='p-1 lg:hidden focus:bg-white rounded'
      >
        <IconMenu />
      </button>
      logo
    </header>
  )
}

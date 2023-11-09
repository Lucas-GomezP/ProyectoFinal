import { IconClose } from './Icons'
import logo from '../../public/logo.svg'

export const ModalUI = ({ children, visible, setVisible }) => {
  return (
    <>
      {visible &&

        <article
          className='p-14 pt-24 lg:pt-14 absolute top-0 left-0 w-full h-full'
        >
          <div className='bg-slate-100 h-full rounded-xl p-4 flex flex-col gap-4 overflow-auto ring ring-slate-200 z-10'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-2 items-center'>
                <img src={logo} alt='Logo de la empresa' className='w-8 ml-4' />
                <h1 className='font-bold text-2xl'>FacturIZI</h1>
              </div>
              <IconClose
                onClick={setVisible}
                className='hover:bg-red-500 w-8 h-8 rounded cursor-pointer ring ring-red-500'
              />
            </div>
            <div className='z-10 h-full'>
              {children}
            </div>
          </div>
        </article>}
    </>
  )
}

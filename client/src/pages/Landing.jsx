import { NavBar } from '../components/NavBar'
import app from '../../public/app.png'
import billing from '../../public/billing.png'
import cash from '../../public/cash.png'

export function Landing () {
  return (
    <>
      <NavBar />
      <article className='flex flex-col justify-center pt-16 px-28 text-center'>
        <h2 className='text-5xl text-center'>Simplificamos la facturación para ti</h2>
        <p className='pt-8 sm:px-8 md:px-40'>En FacturIZI, estamos comprometidos a simplificar el proceso de facturación para tu negocio. Nuestra plataforma te ofrece todo lo que necesitas para gestionar tus facturas de manera eficiente y sin complicaciones.</p>
        <button className='mx-auto mt-10 border p-2 rounded hover:bg-[#a855f7] hover:text-white'>Comenzar</button>
      </article>
      <div className='flex w-full flex-overflow-hidden'>
        <img src={billing} alt='billing' className='w-1/3 object-cover' />
        <img src={cash} alt='billing' className='w-1/3 object-cover' />
        <img src={app} alt='billing' className='w-1/3 object-cover' />
      </div>
      <aside>
        <h2>Preguntas frecuentes</h2>
      </aside>
    </>
  )
}

import { NavBar } from '../components/NavBar'
import app from '../../public/app.png'
import billing from '../../public/billing.png'
import cash from '../../public/cash.png'
import { Footer } from '../components/Footer'
import { PreguntasFrecuentes } from '../components/FAQ'

export function Landing () {
  return (
    <>
      <NavBar />
      <article className='flex flex-col justify-center max-w-lg m-auto p-4 md:p-0 text-center'>
        <h2 className='text-3xl md:text-5xl text-center'>Simplificamos la facturación para ti</h2>
        <p className='pt-8 text-sm md:text-base'>En FacturIZI, estamos comprometidos a simplificar el proceso de facturación para tu negocio. Nuestra plataforma te ofrece todo lo que necesitas para gestionar tus facturas de manera eficiente y sin complicaciones.</p>
        <button className='mx-auto mt-10 border p-2 rounded hover:bg-[#a855f7] hover:text-white'>Comenzar</button>
      </article>
      <div className='flex w-full flex-overflow-hidden'>
        <img src={billing} alt='billing' className='w-1/3 object-cover' />
        <img src={cash} alt='billing' className='w-1/3 object-cover' />
        <img src={app} alt='billing' className='w-1/3 object-cover' />
      </div>
      <a className='flex justify-center text-white hover:bg-[#fff] hover:text-black border-solid border border-black rounded-lg p-1.5 w-1/4 bg-[#a855f7] m-auto mt-2.5 mb-2.5' href='#'>Empezar</a>
      <PreguntasFrecuentes />
      <Footer />
    </>
  )
}

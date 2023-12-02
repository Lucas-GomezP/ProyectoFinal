import { NavBar } from '../components/NavBar'
import app from '../../public/app.png'
import billing from '../../public/billing.png'
import cash from '../../public/cash.png'
import { Footer } from '../components/Footer'
import { PreguntasFrecuentes } from '../components/FAQ'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { LoginContext } from '../context/isLogin'

export function Landing () {
  // Se trae el contexto de Login para poder manejar a donde redirige el boton "empezar"
  const { isLogin } = useContext(LoginContext)
  return (
    <main>
      <NavBar />
      <article className='flex flex-col justify-center max-w-lg m-auto p-4 md:p-0 text-center'>
        <h1 className='text-3xl md:text-5xl text-center'>Simplificamos la facturación para ti</h1>
        <p className='pt-8 text-sm md:text-base'>Nuestra plataforma te ofrece todo lo que necesitas para gestionar tus facturas de manera eficiente y sin complicaciones.</p>
      </article>
      <section className='flex w-full flex-overflow-hidden'>
        <figure className='w-1/3 h-full flex items-center justify-center flex-col'>
          <img src={billing} alt='billing' className='object-cover h-full max-h-[370px]' />
          <figcaption className='text-sm md:text-base text-center text-[#7894c5] font-bold border-b-2 hover:border-[#a855f7]'>Facturación fácil y rápida</figcaption>
        </figure>
        <figure className='w-1/3 h-full flex items-center justify-center flex-col'>
          <img src={app} alt='billing-phone' className='object-cover h-full max-h-[370px]' />
          <figcaption className='text-sm md:text-base text-center text-[#7894c5] font-bold border-b-2 hover:border-[#a855f7]'>Acceso desde cualquier lugar</figcaption>
        </figure>
        <figure className='w-1/3 h-full flex items-center justify-center flex-col'>
          <img src={cash} alt='billing-cash' className='object-cover h-full max-h-[370px]' />
          <figcaption className='text-sm md:text-base text-center text-[#7894c5] font-bold border-b-2 hover:border-[#a855f7]'>Los mejores precios</figcaption>
        </figure>
      </section>
      <Link className='flex justify-center text-white hover:bg-[#fff] hover:text-black border-solid border border-black rounded-lg p-1.5 w-1/4 bg-[#a855f7] m-auto mt-3' to={isLogin ? '/dashboard' : '/login'}>Empezar</Link>
      <Link className='flex justify-center text-white hover:bg-[#fff] hover:text-black border-solid border border-black rounded-lg p-1.5 w-1/4 bg-[#a855f7] m-auto mt-3' to='/apidoc'>Doc. API</Link>
      <PreguntasFrecuentes />
      <Footer />
    </main>
  )
}

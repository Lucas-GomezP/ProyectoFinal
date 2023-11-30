import { Link } from 'react-router-dom'

export const ErrorPage = () => {
  return (
    <section className='flex justify-center flex-col items-center h-screen gap-[10vh] bg-neutral-800'>
      <img src='./404error.gif' alt='404 error' className='' />
      <Link to='/' className='text-white bg-transparent p-2.5 rounded-xl w-1/4 text-center font-semibold backdrop-blur-sm border hover:bg-[#b65cff] transition-all duration-500 ease-in-out transform hover:w-2/6'>Volver</Link>
    </section>
  )
}

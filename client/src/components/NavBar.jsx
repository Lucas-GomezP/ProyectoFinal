import logo from '../../public/logo.svg'

export const NavBar = () => {
  return (
    <nav className='flex justify-between max-h-20 px-5 bg-gray-100'>
      <section className='flex items-center gap-x-3'>
        <img src={logo} alt='Logo de la empresa' className='w-16' />
        <h1 className='font-semibold text-xl'>FacturIZI</h1>
      </section>
      <section className='flex w-9/12 items-center gap-x-5 justify-end'>
        <a href='' className='border rounded p-2 hover:bg-[#ffed00] hover:text-white'>HOLA</a>
        <a href='' className='border rounded p-2 hover:bg-[#ffed00] hover:text-white'>ASDSA</a>
        <a href='' className='border rounded p-2 hover:bg-[#ffed00] hover:text-white'>asdasd</a>
      </section>
      <section className='flex items-center gap-x-5 justify-end'>
        <a href='' className='border rounded p-2 hover:bg-[#a855f7] flex items-center hover:text-[#ffed00]'>Login</a>
      </section>
    </nav>
  )
}

export function Footer () {
  return (
    <footer className='flex justify-end items-end h-72 mt-24'>
      <section className='relative w-full min-h-[100px] bg-[#7b98c9] flex justify-center items-center flex-col'>
        <div className='absolute top-[-100px] left-0 w-full bg-[url("/wave.png")] bg-[length:1000px_100px] h-[100px] z-[1000] opacity-100 bottom-0 animate-[animateWave_4s_linear_infinite]'> </div>
        <div className='absolute top-[-100px] left-0 w-full bg-[url("/wave.png")] bg-[length:1000px_100px] h-[100px] z-[999] opacity-50 bottom-2.5 animate-[animateWave02_4s_linear_infinite]'> </div>
        <div className='absolute top-[-100px] left-0 w-full bg-[url("/wave.png")] bg-[length:1000px_100px] h-[100px] z-[1000] opacity-30 bottom-3.5 animate-[animateWave_3s_linear_infinite]'> </div>
        <div className='absolute top-[-100px] left-0 w-full bg-[url("/wave.png")] bg-[length:1000px_100px] h-[100px] z-[999] opacity-70 bottom-1.25rem animate-[animateWave02_3s_linear_infinite]'> </div>
        <p className='text-center text-white mt-1.5 max-w-3xl'>FacturIZI es tu aliado confiable en soluciones de facturación.</p>
        <p className='text-center text-white mt-1.5'>Contáctanos:<br />
          Calle Siempre Viva 123<br />
          Teléfono: 11987654321<br />
          Correo electrónico: consulta@Facturizi.com
        </p>
        <p className='text-white'>@FacturIZI 2023</p>
      </section>
    </footer>
  )
}

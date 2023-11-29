import { useState } from 'react'
import preguntasFrecuentes from '../utils/FAQ'

const PreguntaFrecuentes = ({ pregunta, respuesta }) => {
  const [abierta, setAbierta] = useState(false)
  return (
    <div className='bg-white p-4 shadow-sm rounded-md mb-4 bg-[#dcdce8] cursor-pointer ' onClick={() => setAbierta(!abierta)}>
      <div className='flex justify-between items-center'>
        <h6 className='text-l font-medium'>{pregunta}</h6>
      </div>
      <div className={`overflow-hidden transition-all ease-in-out ${abierta ? 'max-h-screen' : 'max-h-0'}`}>
        <p className='mt-2 `overflow-hidden transition-all duration-500 ease-in-out'>{respuesta}</p>
      </div>
    </div>
  )
}

export const PreguntasFrecuentes = () => {
  return (
    <aside className='p-2.5'>
      <h2 className='text-xl font-semibold md:text-3xl p-4 text-center '>Preguntas frecuentes</h2>
      {preguntasFrecuentes.map((faq) => (
        <PreguntaFrecuentes key={faq.id} {...faq} />
      ))}
    </aside>
  )
}

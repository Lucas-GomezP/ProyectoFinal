import { IconGitHub } from '../components/Icons'
import { CodeBlock, dracula } from 'react-code-blocks'
import { apiDocData } from '../utils/apiDocData'

export const ApiDoc = () => {
  return (
    <>
      <header className='bg-purple-500 text-white text-center py-4'>
        <h1 className='font-bold text-2xl'>Documentación API</h1>
        <p className='font-semibold text-xl'><i>FacturIZI</i></p>
        <p className='font-semibold text-xs'>Proyecto Informatico - grupo 16</p>
        <a className='flex justify-center items-center' target='_blank' href='https://github.com/Lucas-GomezP/ProyectoFinal/tree/A-FusionFacturaCliente' rel='noreferrer'><IconGitHub /> Repositorio</a>
      </header>
      <main className='p-2'>
        {apiDocData.map((data, idx) => {
          return (
            <section key={idx}>
              <header className='pl-2 border-l-2 border-purple-500'>
                <h2 className='font-bold text-purple-500'>{data.endpoin} [{data.method}]</h2>
                <small>{data.fullUrl}</small>
              </header>
              <main className='flex flex-col md:flex-row'>
                <div className='md:w-1/2 p-2'>
                  {data.describe.map((d, i) => {
                    return (
                      <p key={i}>{d}</p>
                    )
                  })}
                </div>
                <div className='md:w-1/2 bg-purple-200 p-2 rounded-md'>
                  <p className='text-center text-purple-500 font-bold'><i>Ejemplo petición</i></p>
                  <CodeBlock
                    text={data.exampleSend}
                    language='javascript'
                    showLineNumbers
                    theme={dracula}
                  />
                  <p className='text-center text-purple-500 font-bold'><i>Ejemplo respuesta</i></p>
                  <CodeBlock
                    text={data.exampleResponse}
                    language='javascript'
                    showLineNumbers
                    theme={dracula}
                  />
                </div>
              </main>
              <hr className='my-2' />
            </section>
          )
        })}
      </main>
    </>
  )
}

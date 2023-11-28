/* eslint-disable react/jsx-closing-tag-location */
import { Menu } from '../components/Menu'
import { Loader } from '../components/Loader'
import { useFetch } from '../hooks/useFetch'
import { TablePagesFooter } from '../components/TablePagesFooter'
import { useState } from 'react'
import { IconAdd } from '../components/Icons'
import { ModalUI } from '../components/ModalUI'
import { useForm } from 'react-hook-form'
import { API_BASE_URL } from '../routes/apiUrl'

const useObtainClient = () => {
  const endpointAllClient = `user/${localStorage.id}/client`

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token,
      'user-id': localStorage.id
    }
  }

  const { data, isPending } = useFetch({ endpoint: endpointAllClient, requestOptions })

  return { data, isPending }
}

export const Clients = () => {
  const { data, isPending } = useObtainClient()
  const [showingData, setShowingData] = useState()

  const [insertClient, setInsertClient] = useState(false)
  const handleInsertClient = () => {
    setInsertClient(!insertClient)
  }

  return (
    <>
      <Menu>
        <header className='flex justify-between items-center'>
          <h2 className='font-bold text-2xl'>Clientes</h2>
          <IconAdd
            onClick={handleInsertClient}
            className='h-10 w-10 mr-2 hover:text-purple-500 cursor-pointer hover:scale-105 transition'
          />
        </header>
        {isPending
          ? <Loader />
          : <table className='w-full table-auto'>
            <thead>
              <tr className=' bg-slate-100 text-slate-500 border-b border-slate-200'>
                <th className='p-2'>id_cliente</th>
                <th className='p-2'>nombre</th>
                <th className='p-2'>id_usuario</th>
              </tr>
            </thead>
            <tbody className='w-full'>
              {showingData?.map((client) => {
                return (
                  <tr key={client.id_cliente} className='h-14 border-b text-sm md:text-base border-slate-200 hover:bg-slate-200 hover:cursor-pointer'>
                    <td className='h-14 py-1 text-center'>{client.id_cliente}</td>
                    <td className='h-14 py-1 text-center'>{client.nombre}</td>
                    <td className='h-14 py-1 text-center'>{client.id_usuario}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>}
        <InsertClient insertClient={insertClient} handleInsertClient={handleInsertClient} />
        <TablePagesFooter isPending={isPending} data={data} updateShowingData={setShowingData} />
      </Menu>
    </>
  )
}

const InsertClient = ({ insertClient, handleInsertClient }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  // '/user/<int:id_user>/client', methods=['POST']
  const onSubmitInsert = handleSubmit((data) => {
    const endpointInsertClient = `user/${localStorage.id}/client`

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      },
      body: JSON.stringify(data)
    }
    fetch(API_BASE_URL + endpointInsertClient, requestOptions)
      .then(res => {
        if (!res.ok) throw new Error('Error HTTP: ' + res.status)
        return res.json
      })
      .then(res => {
        console.log(res)
      })
      .catch(error => console.log(error + error.message))
  })
  return (
    <ModalUI visible={insertClient} setVisible={handleInsertClient}>
      <form
        onSubmit={onSubmitInsert}
        className='flex flex-col gap-8'
      >
        <label htmlFor='nombre' className='font-bold flex flex-col relative'>Nombre del cliente:
          <input
            {...register('nombre', {
              required: { value: true, message: 'Ingrese un nombre' },
              minLength: { value: 3, message: 'El nomrbre debe tener al menos 3 caracteres' },
              maxLength: { value: 100, message: 'El nombre no puede superar los 100 caracteres' }
            })}
            type='text'
            id='nombre'
            className='p-1 rounded-md font-normal focus:outline-purple-500'
          />
          {errors.nombre && <span className='h-4 text-sm text-red-500 absolute top-14'>{errors.nombre.message}
          </span>}
        </label>

        <button type='submit' className=' p-2 rounded-md w-min self-center font-bold text-xl text-purple-500 bg-purple-100 border-2 border-purple-500 hover:bg-purple-500 hover:border-purple-100 hover:text-purple-100'>Cargar</button>
      </form>
    </ModalUI>
  )
}

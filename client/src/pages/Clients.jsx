/* eslint-disable react/jsx-closing-tag-location */
import { Menu } from '../components/Menu'
import { Loader } from '../components/Loader'
import { useFetch } from '../hooks/useFetch'
import { TablePagesFooter } from '../components/TablePagesFooter'
import { useState } from 'react'
import { IconAdd, IconDelete, IconEdit } from '../components/Icons'
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
  const [actualClient, setActualClient] = useState()
  const handleActualClient = (client) => {
    setActualClient(client)
    handleDetailClient()
  }
  const [detailClient, setDetailClient] = useState(false)
  const handleDetailClient = () => {
    setDetailClient(!detailClient)
  }

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
                  <tr
                    onClick={() => handleActualClient(client)}
                    key={client.id_cliente}
                    className='h-14 border-b text-sm md:text-base border-slate-200 hover:bg-slate-200 hover:cursor-pointer'
                  >
                    <td className='h-14 py-1 text-center'>{client.id_cliente}</td>
                    <td className='h-14 py-1 text-center'>{client.nombre}</td>
                    <td className='h-14 py-1 text-center'>{client.id_usuario}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>}
        <DetailClient detailClient={detailClient} handleDetailClient={handleDetailClient} client={actualClient} />
        <InsertClient insertClient={insertClient} handleInsertClient={handleInsertClient} />
        <TablePagesFooter isPending={isPending} data={data} updateShowingData={setShowingData} />
      </Menu>
    </>
  )
}

const DetailClient = ({ detailClient, handleDetailClient, client }) => {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const handleConfirmDelete = () => {
    handleDetailClient()
    setConfirmDelete(!confirmDelete)
  }
  const [realiceEdit, setRealiceEdit] = useState(false)
  const handleRealiceEdit = () => {
    handleDetailClient()
    setRealiceEdit(!realiceEdit)
  }

  const deleteClient = () => {
    const endpointDeleteClient = `user/${localStorage.id}/client/${parseInt(client.id_cliente)}`

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      }
    }
    console.log(endpointDeleteClient, requestOptions)
    fetch(API_BASE_URL + endpointDeleteClient, requestOptions)
      .then(res => {
        if (!res.ok) throw new Error('Error HTTP: ' + res.status)
        return res.json
      })
      .then(res => {
        window.location.reload()
      })
      .catch(error => console.log(error))
  }

  const { register, handleSubmit, formState: { errors } } = useForm()
  const editProduct = handleSubmit((data) => {
    const endpointUpdateClient = `user/${localStorage.id}/client/${client.id_cliente}`

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      },
      body: JSON.stringify(data)
    }
    fetch(API_BASE_URL + endpointUpdateClient, requestOptions)
      .then(res => {
        if (!res.ok) throw new Error('Error HTTP: ' + res.status)
        return res.json
      })
      .then(res => {
        window.location.reload()
      })
      .catch(error => console.log(error))
  })
  return (
    <>
      <ModalUI visible={detailClient} setVisible={handleDetailClient}>
        <h2 className='text-2xl text-center font-bold my-2'>{client?.nombre}</h2>
        <div className='flex w-full justify-evenly'>
          <IconDelete
            onClick={handleConfirmDelete}
            className='h-16 w-16 text-red-500 border-2 rounded-md border-red-500 py-1 bg-red-100 hover:text-red-100 hover:border-red-100 hover:bg-red-500 cursor-pointer'
          />
          <IconEdit
            onClick={handleRealiceEdit}
            className='h-16 w-16 text-purple-500 border-2 rounded-md border-purple-500 py-1 bg-blue-100 hover:text-purple-100 hover:purple-blue-100 hover:bg-purple-500 cursor-pointer'
          />
        </div>
      </ModalUI>
      <ModalUI visible={confirmDelete} setVisible={handleConfirmDelete}>
        <div className='h-5/6 flex flex-col justify-evenly'>
          <h2 className='font-bold text-2xl text-center'>Seguro que desea borrar <span className='text-purple-500'>{client?.nombre}</span>?</h2>
          <div className='flex justify-evenly'>
            <button
              className='text-2xl w-1/3 text-red-500 border-2 border-red-500 rounded-md bg-red-100 cursor-pointer hover:text-red-100 hover:border-red-100 hover:bg-red-500'
              onClick={deleteClient}
            >Si</button>
            <button
              className='text-2xl w-1/3 text-purple-500 border-2 border-purple-500 rounded-md bg-purple-100 cursor-pointer hover:text-purple-100 hover:border-purple-100 hover:bg-purple-500'
              onClick={handleConfirmDelete}
            >No</button>
          </div>
        </div>
      </ModalUI>
      <ModalUI visible={realiceEdit} setVisible={handleRealiceEdit}>
        <h2 className='text-2xl font-bold my-2 text-center'>Editando <span className='text-purple-500'>{client?.nombre}</span></h2>
        <form
          onSubmit={editProduct}
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

          <button type='submit' className=' p-2 rounded-md w-min self-center font-bold text-xl text-purple-500 bg-purple-100 border-2 border-purple-500 hover:bg-purple-500 hover:border-purple-100 hover:text-purple-100'>Guardar cambios</button>
        </form>
      </ModalUI>
    </>
  )
}

const InsertClient = ({ insertClient, handleInsertClient }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const [succesInsert, setSuccesInsert] = useState(false)
  const [nameInsert, setNameInsert] = useState('')
  const handleSuccesInsert = () => {
    setSuccesInsert(!succesInsert)
  }

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
        setNameInsert(data.nombre)
        handleInsertClient()
        handleSuccesInsert()
      })
      .catch(error => console.log(error + error.message))
  })

  const reloadOffer = () => {
    window.location.reload()
  }

  return (
    <>
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
      <ModalUI visible={succesInsert} setVisible={handleSuccesInsert}>
        <div className='flex flex-col justify-evenly h-96 items-center'>
          <h2 className='font-bold text-xl text-center'>Carga exitosa del cliente:</h2>
          <h3 className='font-bold text-3xl text-center text-purple-500'>{nameInsert}</h3>
          <button
            onClick={reloadOffer}
            className=' p-2 rounded-md w-min self-center font-bold text-xl text-purple-500 bg-purple-100 border-2 border-purple-500 hover:bg-purple-500 hover:border-purple-100 hover:text-purple-100'
          >Aceptar</button>
        </div>
      </ModalUI>
    </>
  )
}

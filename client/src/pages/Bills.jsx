/* eslint-disable camelcase */
import { Menu } from '../components/Menu'
import { useFetch } from '../hooks/useFetch'
import { IconAdd, IconClose } from '../components/Icons'
import { Loader } from '../components/Loader'
import { useEffect, useState } from 'react'
import { ModalUI } from '../components/ModalUI'
import { useForm } from 'react-hook-form'

const useObtainBills = () => {
  const endpointAllBills = `user/${localStorage.id}/facturas`

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token,
      'user-id': localStorage.id
    }
  }

  const { data, isPending, error } = useFetch({ endpoint: endpointAllBills, requestOptions })

  return { data, isPending, error }
}

export const Bills = () => {
  const { data, isPending } = useObtainBills()
  const [insertBill, setInsertBill] = useState(false)

  const handleInsertBill = () => {
    setInsertBill(!insertBill)
  }

  return (
    <>
      <Menu>
        <header className='flex justify-between items-center'>
          <h2 className='font-bold text-2xl'>Facturas</h2>
          <IconAdd
            onClick={handleInsertBill}
            className='h-10 w-10 mr-2 hover:text-purple-500 cursor-pointer hover:scale-105 transition'
          />
        </header>

        {isPending
          ? <Loader />
          : data?.messaje
            ? <h3 className='text-red-400 font-bold text-center'>No hay facturas cargadas</h3>
            : <h2>{JSON.stringify(data)}</h2>}

        <InsertBill insertBill={insertBill} handleInsertBill={handleInsertBill} />
      </Menu>
    </>
  )
}

const AddOfferBill = ({ actualOffer, register }) => {
  return (
    <fieldset className='flex gap-4 justify-center items-center'>
      <label htmlFor={`offername${actualOffer.id_oferta}`} className='font-bold flex flex-col'>Nombre:
        <input
          {...register(`offername${actualOffer.id_oferta}`, {
            required: true
          })}
          type='text'
          value={actualOffer.nombre}
          id={`offername${actualOffer.id_oferta}`}
          className='p-1 rounded-md font-normal focus:outline-purple-500'
        />
      </label>
      <label htmlFor={`offerprice${actualOffer.id_oferta}`} className='font-bold flex flex-col'>Precio:
        <input
          {...register(`offerprice${actualOffer.id_oferta}`, {
            required: true
          })}
          min={1}
          value={actualOffer.precio}
          type='number'
          id={`offerprice${actualOffer.id_oferta}`}
          className='p-1 rounded-md font-normal focus:outline-purple-500'
        />
      </label>
      <IconClose className='hover:border hover:border-red-500 hover:text-red-500 rounded-md cursor-pointer' />
    </fieldset>
  )
}

const useObtainOffer = () => {
  const endpointAllOffer = `user/${localStorage.id}/oferta`

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token,
      'user-id': localStorage.id
    }
  }

  const { data, isPending, error } = useFetch({ endpoint: endpointAllOffer, requestOptions })

  return { data, isPending, error }
}

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

const InsertBill = ({ insertBill, handleInsertBill }) => {
  const [currentBill, setCurrentBill] = useState([])

  const [actualCount, setActualCount] = useState([])
  const handleCount = (event, id) => {
    const newCount = [...actualCount]
    newCount.splice(id, 1, parseInt(event.target.value))
    setActualCount(newCount)
  }

  const addCountOffer = (option) => {
    const newCurrentBill = [...currentBill, option]
    setCurrentBill(newCurrentBill)
    const newCount = [...actualCount, 1]
    setActualCount(newCount)
    setSearchOptions([])
  }

  const removeBillItem = (idx) => {
    const newCurrentBill = [...currentBill]
    newCurrentBill.splice(idx, 1)
    setCurrentBill(newCurrentBill)
  }

  const { data, isPending } = useObtainOffer()
  const [searchOptions, setSearchOptions] = useState([])
  const handleSearchOptions = (event) => {
    if (event.target.value.length === 0) {
      setSearchOptions([])
    } else {
      const filterPass = (d) => {
        const billNames = currentBill.map(c => c.nombre)
        if (billNames.includes(d.nombre)) {
          return false
        }
        if ((d.tipo === 'P' && d.stock === 0) || (d.tipo === 'S' && d.disponibilidad === 0)) {
          return false
        }
        return true
      }
      const newRegex = new RegExp(`^${event.target.value}`, 'gi')
      const newSearchOptions = data.filter(d => d.nombre.match(newRegex))
      const newSearch = newSearchOptions.filter(filterPass)
      setSearchOptions(newSearch)
    }
  }

  const { data: dataClient, isPending: isPendingClient } = useObtainClient()
  const [actualClient, setActualClient] = useState()
  const [searchClient, setSearchClient] = useState([])
  const handleSearchClient = ({ show, client }) => {
    if (show) {
      setSearchClient(dataClient)
    } else {
      setSearchClient([])
      setActualClient(client)
    }
  }

  const [totalPrice, setTotalPrice] = useState(0)
  useEffect(() => {
    let newTotalPrice = 0
    for (let i = 0; i < currentBill.length; i++) {
      newTotalPrice += parseInt(currentBill[i].precio) * actualCount[i]
    }
    setTotalPrice(newTotalPrice)
  }, [currentBill, actualCount])

  const [confirmBill, setConfirmBill] = useState(false)
  const cancelBill = () => {
    setCurrentBill([])
    setActualCount([])
    setActualClient()
    setTotalPrice(0)
    setConfirmBill(false)
    handleInsertBill()
  }

  const handleSubmit = () => {
    // const endpointInsertOffer = `user/${localStorage.id}/oferta`
    const detalle_fc = []
    for (let i = 0; i < currentBill.length; i++) {
      const id_oferta = currentBill[i].id_oferta
      // Cantidad va a ser igual a 0 en caso de que sea un servicio
      let cantidad
      if (currentBill[i].tipo === 'P') {
        cantidad = actualCount[i]
      } else {
        cantidad = 0
      }
      detalle_fc.push({ id_oferta, cantidad })
    }
    const body = {
      encabezado: {
        id_usuario: localStorage.id,
        id_cliente: actualClient.id_cliente
      },
      detalle_fc
    }

    console.log(body)
    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-access-token': localStorage.token,
    //     'user-id': localStorage.id
    //   },
    //   body: JSON.stringify(data)
    // }
    // fetch(API_BASE_URL + endpointInsertOffer, requestOptions)
    //   .then(res => {
    //     if (!res.ok) throw new Error('Error HTTP: ' + res.status)
    //     return res.json
    //   })
    //   .then(res => {
    //     console.log(res)
    //     setNameInsert(data.nombre)
    //     handleInsertOffer()
    //     handleSuccesInsert()
    //   })
    //   .catch(error => console.log(error + error.message))
  }

  return (
    <ModalUI visible={insertBill} setVisible={handleInsertBill}>
      <h2 className='text-xl font-bold my-2 text-center mb-2'>Crear Factura</h2>
      {isPending
        ? <Loader />
        : <fieldset className='h-12 flex items-center justify-center gap-2 p-2 rounded-md relative'>
          <label htmlFor='search' className='font-bold flex flex-col relative w-full'>Agregar producto/servicio:
            <input
              onKeyUp={handleSearchOptions}
              placeholder='Ingrese el nombre a buscar'
              type='text'
              className='p-1 rounded-md font-normal focus:outline-purple-500'
            />
          </label>
          {searchOptions.length > 0 &&
            <ul className='bg-white border border-slate-300 rounded-md w-full p-1 absolute overflow-y-auto max-h-96 top-12 z-20'>
              {searchOptions?.map(option => {
                return (
                  <li
                    key={option.id_oferta}
                    onClick={() => { addCountOffer(option) }}
                    className='hover:bg-slate-200 cursor-pointer p-1 rounded-md'
                  >{option.nombre}
                  </li>
                )
              })}
            </ul>}
          </fieldset>}

      {isPendingClient
        ? <Loader />
        : <div className='flex justify-between items-center p-4 relative'>
          <p className='font-bold text-lg'>Cliente:</p>
          <input
            onClick={() => handleSearchClient({ show: true })}
            onChange={() => true}
            type='text'
            placeholder='Ingrese el cliente'
            value={actualClient ? actualClient.nombre : ''}
            className='p-1 rounded-md font-normal focus:outline-purple-500 relative w-52 cursor-pointer'
          />
          {searchClient.length > 0 &&
            <ul className='bg-white border border-slate-300 rounded-md right-4 p-1 absolute overflow-y-auto max-h-96 top-12 w-52'>
              {searchClient?.map(client => {
                return (
                  <li
                    key={client.id_cliente}
                    onClick={() => { handleSearchClient({ show: false, client }) }}
                    className='hover:bg-slate-200 cursor-pointer p-1 rounded-md'
                  >{client.nombre}
                  </li>
                )
              })}
            </ul>}
          </div>}

      <table className='table-auto w-full p-4'>
        <thead>
          <tr>
            <th>Borrar</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>SubTotal</th>
          </tr>
        </thead>
        <tbody>
          {currentBill.map(offer => {
            return (
              <tr key={offer.id_oferta}>
                <td className='text-center flex justify-center'>
                  <IconClose
                    onClick={() => removeBillItem(currentBill.indexOf(offer))}
                    className='text-red-500 border border-red-500 rounded-md hover:bg-red-300 cursor-pointer'
                  />
                </td>
                <td className='text-center'>{offer.nombre}</td>
                <td className='text-center'>{offer.tipo}</td>
                <td className='text-center'>
                  <input
                    onChange={(event) => handleCount(event, currentBill.indexOf(offer))}
                    value={actualCount[currentBill.indexOf(offer)]}
                    type='number'
                    min={1}
                    max={offer.stock}
                    className='w-16'
                  />
                </td>
                <td className='text-center'>${offer.precio}</td>
                <td className='text-center'>${parseInt(offer.precio) * actualCount[currentBill.indexOf(offer)]}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <hr />

      <div className='flex justify-between'>
        <p className='font-bold'>Importe final:</p>
        <p className='pr-4'>${totalPrice}</p>
      </div>

      <div className='flex justify-evenly items-center p-4'>
        <button
          type='submit'
          onClick={cancelBill}
          className=' p-2 rounded-md w-min self-center font-bold text-xl text-red-500 bg-red-100 border-2 border-red-500 hover:bg-red-500 hover:border-red-100 hover:text-red-100'
        >Cancelar
        </button>
        <button
          onClick={() => setConfirmBill(!confirmBill)}
          type='submit'
          className={` p-2 rounded-md w-min self-center font-bold text-xl text-purple-500 bg-purple-100 border-2 border-purple-500 hover:bg-purple-500 hover:border-purple-100 hover:text-purple-100 ${confirmBill ? ' hidden' : ''}`}
        >Crear
        </button>
        <div className={`flex flex-col justify-center ${confirmBill ? '' : ' hidden'}`}>
          <p>¿Seguro que desea cargar esta factura?</p>
          <div className='flex justify-evenly'>
            <button
              onClick={() => setConfirmBill(!confirmBill)}
              type='submit'
              className=' p-2 rounded-md w-min self-center font-bold text-xl text-red-500 bg-red-100 border-2 border-red-500 hover:bg-red-500 hover:border-red-100 hover:text-red-100'
            >No
            </button>
            <button
              onClick={handleSubmit}
              type='submit'
              className=' p-2 rounded-md w-min self-center font-bold text-xl text-purple-500 bg-purple-100 border-2 border-purple-500 hover:bg-purple-500 hover:border-purple-100 hover:text-purple-100'
            >Si
            </button>
          </div>
        </div>
      </div>
    </ModalUI>
  )
}

/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable camelcase */
import { Menu } from '../components/Menu'
import { useFetch } from '../hooks/useFetch'
import { IconAdd, IconClose, IconPayments, IconDelete } from '../components/Icons'
import { Loader } from '../components/Loader'
import { useEffect, useState } from 'react'
import { ModalUI } from '../components/ModalUI'
// import { useForm } from 'react-hook-form'
import { API_BASE_URL } from '../routes/apiUrl'

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
  const { data, isPending, error } = useObtainBills()
  const [insertBill, setInsertBill] = useState(false)

  const handleInsertBill = () => {
    setInsertBill(!insertBill)
  }

  const [detailBill, setDetailBill] = useState(false)
  const [actualBill, setActualBill] = useState()
  const handleDetailBill = () => {
    setDetailBill(!detailBill)
  }

  const handleActualBill = (bill) => {
    setActualBill(bill)
    handleDetailBill()
  }
  useEffect(() => {
    setActualBill()
    setDetailBill(false)
  }, [])
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
          : error
            ? <h3 className='text-red-400 font-bold text-center'>No hay facturas cargadas</h3>
            : <table className='w-full table-auto'>
              <thead>
                <tr className=' bg-slate-100 text-slate-500 border-b border-slate-200'>
                  <th className='p-2'>Nº</th>
                  <th className='p-2'>Cliente</th>
                  <th className='p-2 hidden md:table-cell'>CUIT/CUIL</th>
                  <th className='p-2'>Importe</th>
                  <th className='p-2'>Estado</th>
                </tr>
              </thead>
              <tbody className='w-full'>
                {data?.map((bill) => {
                  const encabezado = bill?.encabezado
                  return (
                    <tr
                      key={encabezado.id_factura}
                      onClick={() => { handleActualBill(bill) }}
                      className={`h-14 border-b text-sm md:text-base border-slate-200 hover:bg-slate-200 hover:cursor-pointer ${encabezado.estado === 1 ? ' bg-yellow-200 ' : ' bg-green-200'}`}
                    >
                      <td className='h-14 py-1 text-center'>{encabezado?.id_factura}</td>
                      <td className='h-14 py-1 text-center'>{encabezado?.nombre_cliente + ' ' + encabezado?.apellido_cliente}</td>
                      <td className='h-14 py-1 text-center hidden md:table-cell'>{encabezado?.cuit_cuil}</td>
                      <td className='h-14 py-1 text-center'>${encabezado?.importe_total}</td>
                      <td className='h-14 py-1 text-center'>{encabezado?.estado}</td>
                    </tr>
                  )
                })}
              </tbody>
              </table>}
        <DetailBill detailBill={detailBill} handleActualBill={handleActualBill} actualBill={actualBill} />
        <InsertBill insertBill={insertBill} handleInsertBill={handleInsertBill} />
      </Menu>
    </>
  )
}

const DetailBill = ({ detailBill, handleActualBill, actualBill }) => {
  const encabezado = actualBill?.encabezado
  const detalle = actualBill?.detalle

  const [confirmDelete, setConfirmDelete] = useState(false)
  const handleConfirmDelete = () => {
    handleActualBill(actualBill)
    setConfirmDelete(!confirmDelete)
  }

  const [realicePayment, setRealicePayment] = useState(false)
  const handleRealicePayment = () => {
    setRealicePayment(!realicePayment)
    setPaymentMethod(0)
  }

  const [paymentMethod, setPaymentMethod] = useState(0)
  const handlePaymentMethod = (event) => {
    setSubmitPaymentError(false)
    setPaymentMethod(event.target.value)
  }

  const [submitPaymentError, setSubmitPaymentError] = useState(false)
  const onSubmitPayment = () => {
    setSubmitPaymentError(false)
    if (paymentMethod === '0' || paymentMethod === 0) {
      setSubmitPaymentError(true)
      return
    }
    // ACA HACER EL FETCH
    console.log(actualBill)
    const endpointPayBill = `user/${localStorage.id}/facturas/${encabezado.id_factura}`

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      },
      body: JSON.stringify({ forma_pago: paymentMethod })
    }
    fetch(API_BASE_URL + endpointPayBill, requestOptions)
      .then(res => {
        if (!res.ok) throw new Error('Error HTTP: ' + res.status)
        return res.json
      })
      .then(res => {
        window.location.reload()
      })
      .catch(error => console.log(error))
  }

  const deleteBill = () => {
    const endpointDeleteBill = `user/${localStorage.id}/facturas/${encabezado.id_factura}`

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      }
    }
    fetch(API_BASE_URL + endpointDeleteBill, requestOptions)
      .then(res => {
        if (!res.ok) throw new Error('Error HTTP: ' + res.status)
        return res.json
      })
      .then(res => {
        window.location.reload()
      })
      .catch(error => console.log(error))
  }

  const [actualState, setActualState] = useState()
  useEffect(() => {
    if (encabezado?.estado === 1) {
      setActualState('Sin Pagar')
    } else if (encabezado?.estado === 3) {
      setActualState('Pagado (Efectivo)')
    } else if (encabezado?.estado === 4) {
      setActualState('Pagado (Debito)')
    } else if (encabezado?.estado === 5) {
      setActualState('Pagado (Cheque)')
    }
  }, [encabezado?.estado, actualBill])

  return (
    <>
      <ModalUI visible={detailBill} setVisible={() => handleActualBill(actualBill)}>
        <div className='flex flex-col justify-between h-full'>
          <div className='overflow-auto'>
            <h2 className='text-2xl font-bold my-2 text-center mb-2'>Detalle Factura <span className='text-purple-500'>Nº {encabezado?.id_factura}</span></h2>
            <hr />
            <h3 className='font-bold text-lg text-center'>Emisor de la factura</h3>
            <p><span className='font-bold'>Nombre: </span>{encabezado?.nombre_usuario}</p>
            <p><span className='font-bold'>Apellido: </span>{encabezado?.apellido_usuario}</p>
            <hr />
            <h3 className='font-bold text-lg text-center'>Cliente</h3>
            <p><span className='font-bold'>Nombre: </span>{encabezado?.nombre_cliente}</p>
            <p><span className='font-bold'>Apellido: </span>{encabezado?.apellido_cliente}</p>
            <p><span className='font-bold'>CUIT/CUIL: </span>{encabezado?.cuit_cuil}</p>
            <p><span className='font-bold'>Domicilio: </span>{encabezado?.domicilio}</p>
            <p><span className='font-bold'>Telefono: </span>{encabezado?.telefono}</p>
            <p><span className='font-bold'>Email: </span>{encabezado?.email}</p>
            <hr />
            <h3 className='font-bold text-lg text-center'>Detalle</h3>
            <div className='flex justify-evenly'>
              <div className='flex flex-col items-center'>
                <p className='font-bold'>Fecha de emision:</p>
                <p>{encabezado?.fecha}</p>
              </div>
              <div className='flex flex-col items-center'>
                <p className='font-bold'>Estado actual:</p>
                <p>{actualState}</p>
              </div>
            </div>
            <table className='w-full table-auto'>
              <thead>
                <tr className=' bg-white border-b border-slate-200'>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Importe unitario</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {detalle?.map((d, i) => {
                  return (
                    <tr key={i} className='border-b text-sm md:text-base border-slate-200'>
                      <td className='py-1 text-center'>{d.nombre_oferta}</td>
                      <td className='py-1 text-center'>{d.tipo}</td>
                      <td className='py-1 text-center'>${d.importe}</td>
                      <td className='py-1 text-center'>{d.cantidad}</td>
                      <td className='py-1 text-center'>${d.subtotal}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div>
            <hr />
            <div className='flex justify-between'>
              <p className='font-bold'>IMPORTE TOTAL</p>
              <p>${encabezado?.importe_total}</p>
            </div>
            <hr />
            <div className='flex justify-evenly mt-4'>
              <IconDelete
                onClick={handleConfirmDelete}
                className='h-16 w-16 text-red-500 border-2 rounded-md border-red-500 py-1 bg-red-100 hover:text-red-100 hover:border-red-100 hover:bg-red-500 cursor-pointer'
              />
              {realicePayment
                ? <div className='flex flex-col justify-center'>
                  {submitPaymentError && <small className='text-red-500 text-center'>Seleccione un metodo de pago</small>}
                  <p>Seleccione un metodo de pago:</p>
                  <select
                    onChange={handlePaymentMethod}
                    className='p-1 rounded-md'
                  >
                    <option value='0'>Seleccione metodo</option>
                    <option value='3'>Efectivo</option>
                    <option value='4'>Debito</option>
                    <option value='5'>Cheque</option>
                  </select>
                  <div className='flex justify-evenly'>
                    <button
                      onClick={handleRealicePayment}
                      className='p-1 border-2 border-red-500 bg-red-100 text-red-500 hover:border-red-100 hover:bg-red-500 hover:text-red-100 rounded-md cursor-pointer'
                    >Cancelar
                    </button>
                    <button
                      onClick={onSubmitPayment}
                      className='p-1 border-2 border-purple-500 bg-purple-100 text-purple-500 hover:border-purple-100 hover:bg-purple-500 hover:text-purple-100 rounded-md cursor-pointer'
                    >Aceptar
                    </button>
                  </div>
                  </div>
                : actualState === 'Sin Pagar'
                  ? <IconPayments
                      onClick={handleRealicePayment}
                      className='h-16 w-16 text-purple-500 border-2 rounded-md border-purple-500 py-1 bg-blue-100 hover:text-purple-100 hover:purple-blue-100 hover:bg-purple-500 cursor-pointer'
                    />
                  : <p className='text-purple-500 text-lg font-bold'>Factura ya pagada</p>}
            </div>
          </div>
        </div>
      </ModalUI>
      <ModalUI visible={confirmDelete} setVisible={handleConfirmDelete}>
        <div className='flex flex-col h-full justify-evenly'>
          <h2 className='text-2xl text-center'>Seguro que desea <span className='text-red-500 font-bold'>ELIMINAR</span> la factura <span className='text-purple-500 font-bold'>Nº {encabezado?.id_factura}</span>?</h2>
          <div className='flex justify-evenly'>
            <button
              className='text-2xl w-1/3 text-red-500 border-2 border-red-500 rounded-md bg-red-100 cursor-pointer hover:text-red-100 hover:border-red-100 hover:bg-red-500'
              onClick={deleteBill}
            >Si
            </button>
            <button
              className='text-2xl w-1/3 text-purple-500 border-2 border-purple-500 rounded-md bg-purple-100 cursor-pointer hover:text-purple-100 hover:border-purple-100 hover:bg-purple-500'
              onClick={handleConfirmDelete}
            >No
            </button>
          </div>
        </div>
      </ModalUI>
    </>
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
    setBillError(false)
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
      setClientError(false)
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

  const [clientError, setClientError] = useState(false)
  const [billError, setBillError] = useState(false)
  const handleSubmit = () => {
    setClientError(false)
    if (!actualClient) {
      setClientError(true)
      return
    }
    setBillError(false)

    if (currentBill.length === 0) {
      setBillError(true)
      return
    }
    const endpointInsertBill = `user/${localStorage.id}/client/${actualClient.id_cliente}/facturas`
    const detalle_fc = []
    for (let i = 0; i < currentBill.length; i++) {
      const id_oferta = currentBill[i].id_oferta
      let cantidad
      if (currentBill[i].tipo === 'P') {
        cantidad = actualCount[i]
      } else {
        cantidad = 1
      }
      detalle_fc.push({ id_oferta, cantidad })
    }
    const body = {
      // eslint-disable-next-line object-shorthand
      detalle_fc: detalle_fc
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      },
      body: JSON.stringify(body)
    }
    fetch(API_BASE_URL + endpointInsertBill, requestOptions)
      .then(res => {
        if (!res.ok) throw new Error('Error HTTP: ' + res.status)
        return res.json
      })
      .then(res => {
        console.log(res)
        cancelBill()
        handleSuccesInsert()
        window.location.reload()
      })
      .catch(error => console.log(error + error.message))
  }
  const [insertSucces, setInsertSucces] = useState(false)
  const handleSuccesInsert = () => {
    setInsertSucces(!insertSucces)
  }
  return (
    <>
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
            <div>
              {clientError && <small className='text-red-500 mr-2'>Seleccione un cliente</small>}
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
            </div>
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
                      max={offer.tipo === 'P' ? offer.stock : 1}
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
        <div className='flex justify-center'>
          {billError && <small className='text-red-500 text-center'>Cargue al menos un producto y/o servicio</small>}
        </div>
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
      <ModalUI visible={insertSucces} setVisible={handleSuccesInsert}>
        <div className='flex flex-col h-full justify-evenly'>
          <h2 className='text-2xl text-purple-500 font-bold my-2 text-center mb-2'>Carga exitosa!</h2>
          <button
            onClick={handleSuccesInsert}
            type='button'
            className=' p-2 rounded-md w-min self-center font-bold text-xl text-purple-500 bg-purple-100 border-2 border-purple-500 hover:bg-purple-500 hover:border-purple-100 hover:text-purple-100'
          >Cerrar
          </button>
        </div>
      </ModalUI>
    </>
  )
}

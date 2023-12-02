/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-closing-tag-location */
import { Menu } from '../components/Menu'
import { Loader } from '../components/Loader'
import { TablePagesFooter } from '../components/TablePagesFooter'
import { ModalUI } from '../components/ModalUI'
import { useFetch } from '../hooks/useFetch'
import { useEffect, useState } from 'react'
import { IconSearch, IconFilter, IconAdd, IconDelete, IconEdit } from '../components/Icons'
import { useForm } from 'react-hook-form'
import { API_BASE_URL } from '../routes/apiUrl'

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

export const Offer = () => {
  const { data, isPending } = useObtainOffer()
  // Estado del filtro actual
  const [filterData, setFilterData] = useState(data)
  const [actualFilter, setActualFilter] = useState('all')
  // Estado de la informacion que se muestra
  const [showingData, setShowingData] = useState()
  // Estado para la modal del producto/servicio a mostrar
  const [detailProduct, setDetailProduct] = useState(false)
  const [productInfo, setProductInfo] = useState({})
  // Mostrar barra de busqueda
  const [showSearchBar, setShowSearchBar] = useState(false)
  // Estado para las opciones de la busqueda
  const [searchOptions, setSearchOptions] = useState([])
  // Estado para mostrar las opciones de orden de la informacion
  const [showOrder, setShowOrder] = useState(false)
  // Estado del orden actual
  const [actualOrder, setActualOrder] = useState('Carga -')

  const handleDetailProduct = () => {
    setDetailProduct(!detailProduct)
  }

  const showingProductInfo = (product) => {
    const newProduct = product
    setProductInfo(newProduct)
    handleDetailProduct()
    setShowSearchBar(false)
  }

  const handleShowSearchBar = () => {
    setSearchOptions([])
    setShowSearchBar(!showSearchBar)
  }

  useEffect(() => {
    setFilterData(data)
  }, [data])

  useEffect(() => {
    setSearchOptions([])
  }, [actualFilter, actualOrder, showSearchBar])

  const order = ['Alfabetico ↑', 'Alfabetico ↓', 'Precio ↑', 'Precio ↓', 'Stock ↑', 'Stock ↓']

  const handleOrder = (order) => {
    if (order === 'Carga -') {
      setActualOrder('Carga -')
      const newData = [...data]
      setShowOrder(false)
      return newData
    } else if (order === 'Precio ↑') {
      setActualOrder('Precio ↑')
      const newData = [...data.sort((a, b) => b.precio - a.precio)]
      setShowOrder(false)
      return newData
    } else if (order === 'Precio ↓') {
      setActualOrder('Precio ↓')
      const newData = [...data.sort((a, b) => a.precio - b.precio)]
      setShowOrder(false)
      return newData
    } else if (order === 'Alfabetico ↑') {
      setActualOrder('Alfabetico ↑')
      const newData = [...data.sort((a, b) => a.nombre.localeCompare(b.nombre))]
      setShowOrder(false)
      return newData
    } else if (order === 'Alfabetico ↓') {
      setActualOrder('Alfabetico ↓')
      const newData = [...data.sort((a, b) => b.nombre.localeCompare(a.nombre))]
      setShowOrder(false)
      return newData
    } else if (order === 'Stock ↑') {
      setActualOrder('Stock ↑')
      const newData = [...data.sort((a, b) => b.stock - a.stock)]
      setShowOrder(false)
      return newData
    } else if (order === 'Stock ↓') {
      setActualOrder('Stock ↓')
      const newData = [...data.sort((a, b) => a.stock - b.stock)]
      setShowOrder(false)
      return newData
    }
  }

  const filterProductService = ({ type = 'all', order = 'Carga -' }) => {
    if (type === 'all') {
      const newData = handleOrder(order)
      setActualFilter('all')
      setFilterData(newData)
    } else if (type === 'product') {
      const newData = handleOrder(order)
      const filterData = newData.filter(d => d.tipo === 'P')
      setActualFilter('product')
      setFilterData(filterData)
    } else if (type === 'service') {
      const newData = handleOrder(order)
      const filterData = newData.filter(d => d.tipo === 'S')
      setActualFilter('service')
      setFilterData(filterData)
    }
  }

  const handleSearchOptions = (event) => {
    if (event.target.value.length === 0) {
      setSearchOptions([])
    } else {
      const newRegex = new RegExp(`^${event.target.value}`, 'gi')
      const newSearchOptions = filterData.filter(d => d.nombre.match(newRegex))
      setSearchOptions(newSearchOptions)
    }
  }

  const [insertOffer, setInsertOffer] = useState(false)

  const handleInsertOffer = () => {
    setInsertOffer(!insertOffer)
  }

  return (
    <>
      <Menu>
        <header className='flex justify-between items-center'>
          <h2 className='font-bold text-2xl'>Oferta</h2>
          <IconAdd
            onClick={handleInsertOffer}
            className='h-10 w-10 mr-2 hover:text-purple-500 cursor-pointer hover:scale-105 transition'
          />
        </header>

        <div className='p-2 flex flex-wrap w-full items-center gap-2 justify-between'>
          <div className='bg-slate-100 p-1 py-2 flex gap-2 rounded-md'>
            <button
              onClick={() => { filterProductService({ type: 'all', order: actualOrder }) }}
              className={`p-1 rounded-md ring-1 hover:bg-white hover:text-black ${actualFilter === 'all' ? ' bg-white text-purple-500 ring-purple-500 font-bold ' : ' text-white bg-slate-300 ring-slate-300 '}`}
            >Todos</button>
            <button
              onClick={() => { filterProductService({ type: 'product', order: actualOrder }) }}
              className={`p-1 rounded-md ring-1 hover:bg-white hover:text-black ${actualFilter === 'product' ? ' bg-white text-purple-500 ring-purple-500 font-bold ' : ' text-white bg-slate-300 ring-slate-300 '}`}
            >Productos</button>
            <button
              onClick={() => { filterProductService({ type: 'service', order: actualOrder }) }}
              className={`p-1 rounded-md ring-1 hover:bg-white hover:text-black ${actualFilter === 'service' ? ' bg-white text-purple-500 ring-purple-500 font-bold ' : ' text-white bg-slate-300 ring-slate-300 '}`}
            >Servicios</button>
          </div>
          <div className='bg-slate-100 h-12 flex items-center justify-center gap-2 p-2 rounded-md'>
            <div className='w-60 relative hidden sm:block'>
              <input
                onKeyUp={handleSearchOptions}
                placeholder='Ingrese el nombre a buscar...'
                type='text'
                className='p-1 w-full focus:outline-purple-500 rounded-md'
              />
              {searchOptions.length > 0 && <ul className='bg-white border border-slate-300 rounded-md w-full p-1 sm:absolute overflow-y-auto max-h-96'>
                {searchOptions?.map(option => {
                  return (
                    <li
                      key={option.id_oferta}
                      onClick={() => { showingProductInfo(option) }}
                      className='hover:bg-slate-200 cursor-pointer p-1 rounded-md'
                    >{option.nombre}</li>
                  )
                })}
              </ul>}
            </div>
            <IconSearch
              onClick={handleShowSearchBar}
              className='p-1 h-full w-fit hover:text-purple-500 cursor-pointer '
            />
            <div className='h-11 p-1 w-fit relative'>
              <IconFilter
                onClick={() => setShowOrder(!showOrder)}
                className={`p-1 h-full w-fit hover:text-purple-500 cursor-pointer ${actualOrder !== 'Carga -' ? ' text-purple-500 ' : ' '}`}
              />
              <div className={`${showOrder ? ' absolute ' : ' hidden '} right-0 z-10`}>
                <ul className='bg-white border border-slate-300 rounded-md p-1 w-max'>
                  {order.map((o, i) => {
                    return (
                      <li
                        key={i}
                        onClick={() => { filterProductService({ type: actualFilter, order: o }) }}
                        className={`hover:bg-slate-200 ${actualOrder === o ? ' border border-purple-500 text-purple-500 ' : ' '} cursor-pointer p-1 rounded-md`}
                      >{o}</li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className='w-full relative'>
            <input
              onKeyUp={handleSearchOptions}
              placeholder='Ingrese el nombre a buscar...'
              type='text'
              className={`p-1 w-full focus:outline-purple-500  rounded-md sm:hidden ${showSearchBar ? ' inline-flex ' : ' hidden '} border-2 border-slate-200`}
            />
            {searchOptions.length > 0 && <ul className='bg-white border border-slate-300 rounded-md absolute w-full p-1 sm:hidden overflow-y-auto max-h-96'>
              {searchOptions?.map(option => {
                return (
                  <li
                    key={option.id_oferta}
                    onClick={() => { showingProductInfo(option) }}
                    className='hover:bg-slate-200 cursor-pointer p-1 rounded-md'
                  >{option.nombre}</li>
                )
              })}
            </ul>}
          </div>
        </div>

        {isPending
          ? <Loader />
          : <table className='w-full table-auto'>
            <thead>
              <tr className=' bg-slate-100 text-slate-500 border-b border-slate-200'>
                <th className='p-2'>Nombre</th>
                <th className='p-2'>Stock</th>
                <th className='p-2 hidden md:table-cell'>Descripcion</th>
                <th className='p-2'>Precio</th>
              </tr>
            </thead>
            <tbody className='w-full'>
              {showingData?.map((product) => {
                return (
                  <tr
                    onClick={() => showingProductInfo(product)}
                    key={product?.id_oferta} className='h-14 border-b text-sm md:text-base border-slate-200 hover:bg-slate-200 hover:cursor-pointer'
                  >
                    <td className='h-14 py-1 pl-2 md:truncate'>{product?.nombre}</td>
                    <td className='h-14 py-1 text-center'>{product?.stock}</td>
                    <td className='h-14 py-1 text-ellipsis overflow-hidden hidden md:inline-block'>{product?.disponibilidad}</td>
                    <td className='h-14 py-1 pr-2 text-center'>${product?.precio}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>}

        <DetailProduct detailProduct={detailProduct} handleDetailProduct={handleDetailProduct} productInfo={productInfo} />

        <InsertOffer insertOffer={insertOffer} handleInsertOffer={handleInsertOffer} />

        <TablePagesFooter isPending={isPending} data={filterData} updateShowingData={setShowingData} />
      </Menu>
    </>
  )
}

const DetailProduct = ({ detailProduct, handleDetailProduct, productInfo }) => {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [realiceEdit, setRealiceEdit] = useState(false)
  const [productOrService, setProductOrService] = useState('P')

  const handleProductOrService = (event) => {
    setProductOrService(event.target.value)
  }

  const handleRealiceEdit = () => {
    handleDetailProduct()
    setRealiceEdit(!realiceEdit)
  }

  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  useEffect(() => {
    setValue('nombre', productInfo.nombre)
    setValue('tipo', productInfo.tipo)
    setValue('stock', productInfo.stock)
    setValue('disponibilidad', productInfo.disponibilidad)
    setValue('precio', productInfo.precio)
    setValue('descripcion', productInfo.descripcion)
    setProductOrService(productInfo.tipo)
  }, [productInfo])

  const editProduct = handleSubmit((data) => {
    const endpointDeleteOffer = `user/${localStorage.id}/oferta/${productInfo.id_oferta}`

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      },
      body: JSON.stringify(data)
    }
    fetch(API_BASE_URL + endpointDeleteOffer, requestOptions)
      .then(res => {
        if (!res.ok) throw new Error('Error HTTP: ' + res.status)
        return res.json
      })
      .then(res => {
        window.location.reload()
      })
      .catch(error => console.log(error))
  })

  const handleConfirmDelete = () => {
    handleDetailProduct()
    setConfirmDelete(!confirmDelete)
  }

  const deleteProduct = () => {
    const endpointDeleteOffer = `user/${localStorage.id}/oferta/${productInfo.id_oferta}`

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      }
    }
    fetch(API_BASE_URL + endpointDeleteOffer, requestOptions)
      .then(res => {
        if (!res.ok) throw new Error('Error HTTP: ' + res.status)
        return res.json
      })
      .then(res => {
        window.location.reload()
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <ModalUI visible={detailProduct} setVisible={handleDetailProduct}>
        <h2 className='text-2xl text-center font-bold my-2'>{productInfo?.nombre}</h2>
        <div className='flex flex-col justify-between h-5/6'>
          <div>
            <p className='font-bold'>Descripcion:</p>
            <p>{productInfo?.descripcion}</p>
            <p><strong>Precio:</strong> ${productInfo?.precio}</p>
            {productInfo?.tipo === 'P'
              ? <div>
                <p><strong>Tipo:</strong> Producto</p>
                <p><strong>Stock actual:</strong> {productInfo?.stock}</p>
              </div>
              : <div>
                <p><strong>Tipo:</strong> Servicio</p>
                {productInfo?.disponibilidad === 1
                  ? <p><strong>Cuenta con disponibilidad</strong></p>
                  : <p><strong>NO cuenta con disponibilidad</strong></p>}
              </div>}
          </div>
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
        </div>
      </ModalUI>
      <ModalUI visible={confirmDelete} setVisible={handleConfirmDelete}>
        <div className='h-5/6 flex flex-col justify-evenly'>
          <h2 className='font-bold text-2xl text-center'>Seguro que desea borrar <span className='text-purple-500'>{productInfo.nombre}</span>?</h2>
          <div className='flex justify-evenly'>
            <button
              className='text-2xl w-1/3 text-red-500 border-2 border-red-500 rounded-md bg-red-100 cursor-pointer hover:text-red-100 hover:border-red-100 hover:bg-red-500'
              onClick={deleteProduct}
            >Si</button>
            <button
              className='text-2xl w-1/3 text-purple-500 border-2 border-purple-500 rounded-md bg-purple-100 cursor-pointer hover:text-purple-100 hover:border-purple-100 hover:bg-purple-500'
              onClick={handleConfirmDelete}
            >No</button>
          </div>
        </div>
      </ModalUI>

      <ModalUI visible={realiceEdit} setVisible={handleRealiceEdit}>
        <h2 className='text-2xl font-bold my-2 text-center'>Editando <span className='text-purple-500'>{productInfo.nombre}</span></h2>
        <form
          onSubmit={editProduct}
          className='flex flex-col gap-8'
        >
          <label htmlFor='nombre' className='font-bold flex flex-col relative'>Nombre producto/servicio:
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
          <fieldset className='flex justify-between'>
            <label htmlFor='tipo' className='font-bold'>Tipo:
              <select
                onChangeCapture={handleProductOrService}
                {...register('tipo',
                  { required: true })}
                id='tipo'
                className='p-1 rounded-md font-normal focus:outline-purple-500'
              >
                <option
                  value='P'
                >Producto</option>
                <option
                  value='S'
                >Servicio</option>
              </select>
            </label>
            <label htmlFor='stock' className={`font-bold ${productOrService === 'P' ? '' : ' hidden '}`}>Stock actual:
              <input
                {...register('stock', {
                  required: true
                })}
                min={0}
                type='number'
                id='stock'
                className='p-1 rounded-md font-normal focus:outline-purple-500 w-24'
              />
            </label>
            <label htmlFor='disponibilidad' className={`font-bold ${productOrService === 'S' ? '' : ' hidden '}`}>Disponibilidad:
              <select
                {...register('disponibilidad',
                  { required: true })}
                id='disponibilidad'
                className='p-1 rounded-md font-normal focus:outline-purple-500'
              >
                <option value={1}>Disponible</option>
                <option value={0}>No disponible</option>
              </select>
            </label>
          </fieldset>
          <label htmlFor='descripcion' className='font-bold flex flex-col relative'>Descripcion:
            <textarea
              {...register('descripcion', {
                required: { value: true, message: 'Ingrese una descripcion' },
                minLength: { value: 10, message: 'El nomrbre debe tener al menos 10 caracteres' },
                maxLength: { value: 150, message: 'El nombre no puede superar los 150 caracteres' }
              })}
              id='descripcion'
              cols='30'
              rows='4'
              className='resize-none font-normal p-1 rounded-md focus:outline-purple-500'
            />
            {errors.descripcion && <span className='h-4 text-sm text-red-500 absolute top-32'>{errors.descripcion.message}</span>}
          </label>
          <label htmlFor='precio' className='font-bold'>Precio:</label>
          <input
            {...register('precio', {
              required: true
            })}
            min={0}
            type='number'
            id='precio'
            className='p-1 rounded-md focus:outline-purple-500'
          />
          <input
            {...register('id_usuario')}
            value={localStorage.id}
            type='number'
            className='hidden'
          />
          <input
            {...register('estado')}
            value='A'
            type='text'
            className='hidden'
          />
          <button type='submit' className=' p-2 rounded-md w-min self-center font-bold text-xl text-purple-500 bg-purple-100 border-2 border-purple-500 hover:bg-purple-500 hover:border-purple-100 hover:text-purple-100'>Guardar cambios</button>
        </form>
      </ModalUI>
    </>
  )
}

const InsertOffer = ({ insertOffer, handleInsertOffer }) => {
  const [productOrService, setProductOrService] = useState('P')
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const [succesInsert, setSuccesInsert] = useState(false)
  const [nameInsert, setNameInsert] = useState('')

  useEffect(() => {
    setValue('nombre', '')
    setValue('stock', 0)
    setValue('precio', 0)
    setValue('descripcion', '')
  }, [insertOffer])

  const handleProductOrService = (event) => {
    setProductOrService(event.target.value)
  }

  const handleSuccesInsert = () => {
    setSuccesInsert(!succesInsert)
  }

  const reloadOffer = () => {
    window.location.reload()
  }

  const onSubmitInsert = handleSubmit((data) => {
    const endpointInsertOffer = `user/${localStorage.id}/oferta`

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      },
      body: JSON.stringify(data)
    }
    fetch(API_BASE_URL + endpointInsertOffer, requestOptions)
      .then(res => {
        if (!res.ok) throw new Error('Error HTTP: ' + res.status)
        return res.json
      })
      .then(res => {
        setNameInsert(data.nombre)
        handleInsertOffer()
        handleSuccesInsert()
      })
      .catch(error => console.log(error + error.message))
  })

  return (
    <>
      <ModalUI visible={insertOffer} setVisible={handleInsertOffer}>
        <h2 className='text-xl font-bold my-2 text-center'>Insertar Oferta</h2>
        <form
          onSubmit={onSubmitInsert}
          className='flex flex-col gap-8'
        >
          <label htmlFor='nombre' className='font-bold flex flex-col relative'>Nombre producto/servicio:
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
          <fieldset className='flex justify-between'>
            <label htmlFor='tipo' className='font-bold'>Tipo:
              <select
                onChangeCapture={handleProductOrService}
                {...register('tipo',
                  { required: true })}
                id='tipo'
                className='p-1 rounded-md font-normal focus:outline-purple-500'
              >
                <option
                  value='P'
                >Producto</option>
                <option
                  value='S'
                >Servicio</option>
              </select>
            </label>
            <label htmlFor='stock' className={`font-bold ${productOrService === 'P' ? '' : ' hidden '}`}>Stock actual:
              <input
                {...register('stock', {
                  required: true
                })}
                min={0}
                type='number'
                id='stock'
                className='p-1 rounded-md font-normal focus:outline-purple-500 w-24'
              />
            </label>
            <label htmlFor='disponibilidad' className={`font-bold ${productOrService === 'S' ? '' : ' hidden '}`}>Disponibilidad:
              <select
                {...register('disponibilidad',
                  { required: true })}
                id='disponibilidad'
                className='p-1 rounded-md font-normal focus:outline-purple-500'
              >
                <option value={1}>Disponible</option>
                <option value={0}>No disponible</option>
              </select>
            </label>
          </fieldset>
          <label htmlFor='descripcion' className='font-bold flex flex-col relative'>Descripcion:
            <textarea
              {...register('descripcion', {
                required: { value: true, message: 'Ingrese una descripcion' },
                minLength: { value: 10, message: 'El nomrbre debe tener al menos 10 caracteres' },
                maxLength: { value: 150, message: 'El nombre no puede superar los 150 caracteres' }
              })}
              id='descripcion'
              cols='30'
              rows='4'
              className='resize-none font-normal p-1 rounded-md focus:outline-purple-500'
            />
            {errors.descripcion && <span className='h-4 text-sm text-red-500 absolute top-32'>{errors.descripcion.message}</span>}
          </label>
          <label htmlFor='precio' className='font-bold'>Precio:</label>
          <input
            {...register('precio', {
              required: true
            })}
            min={0}
            type='number'
            id='precio'
            className='p-1 rounded-md focus:outline-purple-500'
          />
          <input
            {...register('id_usuario')}
            value={localStorage.id}
            type='number'
            className='hidden'
          />
          <input
            {...register('estado')}
            value='A'
            type='text'
            className='hidden'
          />
          <button type='submit' className=' p-2 rounded-md w-min self-center font-bold text-xl text-purple-500 bg-purple-100 border-2 border-purple-500 hover:bg-purple-500 hover:border-purple-100 hover:text-purple-100'>Cargar</button>
        </form>
      </ModalUI>
      <ModalUI visible={succesInsert} setVisible={handleSuccesInsert}>
        <div className='flex flex-col justify-evenly h-96 items-center'>
          <h2 className='font-bold text-xl text-center'>Carga exitosa de:</h2>
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

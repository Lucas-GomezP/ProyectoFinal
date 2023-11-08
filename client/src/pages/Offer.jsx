/* eslint-disable react/jsx-closing-tag-location */
import { Menu } from '../components/Menu'
import { Loader } from '../components/Loader'
import { TablePagesFooter } from '../components/TablePagesFooter'
import { ModalUI } from '../components/ModalUI'
import { useFetch } from '../hooks/useFetch'
import { useEffect, useState } from 'react'
import { IconSearch, IconFilter } from '../components/Icons'

export const Offer = () => {
  const { data, isPending } = useFetch({ endpoint: 'products' })
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

  const order = ['Alfabetico ↑', 'Alfabetico ↓', 'Precio ↑', 'Precio ↓', 'Stock ↑', 'Stock ↓']

  const handleOrder = (order) => {
    if (order === 'Carga -') {
      setActualOrder('Carga -')
      const newData = [...data]
      setShowOrder(false)
      return newData
    } else if (order === 'Precio ↑') {
      setActualOrder('Precio ↑')
      const newData = [...data.sort((a, b) => b.price - a.price)]
      setShowOrder(false)
      return newData
    } else if (order === 'Precio ↓') {
      setActualOrder('Precio ↓')
      const newData = [...data.sort((a, b) => a.price - b.price)]
      setShowOrder(false)
      return newData
    } else if (order === 'Alfabetico ↑') {
      setActualOrder('Alfabetico ↑')
      const newData = [...data.sort((a, b) => a.name.localeCompare(b.name))]
      setShowOrder(false)
      return newData
    } else if (order === 'Alfabetico ↓') {
      setActualOrder('Alfabetico ↓')
      const newData = [...data.sort((a, b) => b.name.localeCompare(a.name))]
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
      const filterData = newData.filter(d => d.type)
      setActualFilter('product')
      setFilterData(filterData)
    } else if (type === 'service') {
      const newData = handleOrder(order)
      const filterData = newData.filter(d => !d.type)
      setActualFilter('service')
      setFilterData(filterData)
    }
  }

  const handleSearchOptions = (event) => {
    if (event.target.value.length === 0) {
      setSearchOptions([])
    } else {
      const newRegex = new RegExp(`^${event.target.value}`, 'gi')
      const newSearchOptions = filterData.filter(d => d.name.match(newRegex))
      setSearchOptions(newSearchOptions)
    }
  }

  return (
    <>
      <Menu>
        <h2 className='font-bold text-xl'>Productos</h2>
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
                placeholder='Ingrese el nombre del producto...'
                type='text'
                className='p-1 w-full focus:outline-purple-500 rounded-md'
              />
              {searchOptions.length > 0 && <ul className='bg-white border border-slate-300 rounded-md w-full p-1 sm:absolute overflow-y-auto max-h-96'>
                {searchOptions?.map(option => {
                  return (
                    <li
                      key={option.id}
                      onClick={() => { showingProductInfo(option) }}
                      className='hover:bg-slate-200 cursor-pointer p-1 rounded-md'
                    >{option.name}</li>
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
              placeholder='Ingrese el nombre del producto...'
              type='text'
              className={`p-1 w-full focus:outline-purple-500  rounded-md sm:hidden ${showSearchBar ? ' inline-flex ' : ' hidden '} border-2 border-slate-200`}
            />
            {searchOptions.length > 0 && <ul className='bg-white border border-slate-300 rounded-md absolute w-full p-1 sm:hidden overflow-y-auto max-h-96'>
              {searchOptions?.map(option => {
                return (
                  <li
                    key={option.id}
                    onClick={() => { showingProductInfo(option) }}
                    className='hover:bg-slate-200 cursor-pointer p-1 rounded-md'
                  >{option.name}</li>
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
                    key={product?.id} className='h-14 border-b text-sm md:text-base border-slate-200 hover:bg-slate-200 hover:cursor-pointer'
                  >
                    <td className='h-14 py-1 pl-2 md:truncate'>{product?.name}</td>
                    <td className='h-14 py-1 text-center'>{product?.stock}</td>
                    <td className='h-14 py-1 text-ellipsis overflow-hidden hidden md:inline-block'>{product?.description}</td>
                    <td className='h-14 py-1 pr-2 text-center'>${product?.price}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>}
        <ModalUI visible={detailProduct} setVisible={handleDetailProduct}>
          <h2 className='text-xl font-bold my-2'>{productInfo?.name}</h2>
          <p>{productInfo?.description}</p>
          <p>{productInfo?.type ? 'producto' : 'servicio'}</p>
          <p>{productInfo?.date}</p>
        </ModalUI>
        <TablePagesFooter isPending={isPending} data={filterData} updateShowingData={setShowingData} />
      </Menu>
    </>
  )
}

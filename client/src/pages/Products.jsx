import { Menu } from '../components/Menu'
import { Loader } from '../components/Loader'
import { useFetch } from '../hooks/useFetch'
import { useEffect, useState } from 'react'

export const Products = () => {
  const { data, isPending } = useFetch({ endpoint: 'products' })
  const [showingData, setShowingData] = useState()
  const [countPagesData, setCountPagesData] = useState([0])
  const [currentPageData, setCurrentPageData] = useState(1)

  const handlePrePage = () => {
    if (currentPageData > 1) {
      const newCurrentPage = currentPageData - 1
      setCurrentPageData(newCurrentPage)
    }
  }

  const handleNextPage = () => {
    if (currentPageData < countPagesData.length) {
      const newCurrentPage = currentPageData + 1
      setCurrentPageData(newCurrentPage)
    }
  }

  useEffect(() => {
    let newData = [0]
    const endData = 10 * currentPageData
    const startData = endData - 10
    let newCountPages

    data
      ? newData = data.slice(startData, endData)
      : newData = []

    data
      ? newCountPages = Array.from({ length: Math.floor(data.length / 10) + 1 }, (_, i) => i + 1)
      : newCountPages = []

    setShowingData(newData)
    setCountPagesData(newCountPages)
  }, [data, currentPageData])

  return (
    <>
      <Menu>
        <h2 className='font-bold text-xl'>Productos</h2>
        {isPending
          ? <Loader />
          : data &&
            <table className='w-full table-auto'>
              <thead>
                <tr className=' bg-slate-100 text-slate-500 border-b border-slate-200'>
                  <th className='p-2'>Nombre</th>
                  <th className='p-2'>Stock</th>
                  <th className='p-2 hidden md:table-cell'>Descripcion</th>
                  <th className='p-2'>Precio</th>
                </tr>
              </thead>
              <tbody className='w-full'>
                {showingData.map((product) => {
                  return (
                    <tr key={product.id} className='h-14 border-b border-slate-200 hover:bg-slate-200 hover:cursor-pointer'>
                      <td className='h-14 py-1 pl-2 truncate'>{product.name}</td>
                      <td className='h-14 py-1 text-center'>{product.stock}</td>
                      <td className='h-14 py-1 text-ellipsis overflow-hidden hidden md:inline-block'>{product.description}</td>
                      <td className='h-14 py-1 pr-2 text-center'>${product.price}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>}
        <footer className='flex justify-between py-2'>
          <button
            onClick={handlePrePage}
            className='bg-slate-100 p-2 rounded-md text-purple-500 border-2 border-purple-500 font-semibold hover:bg-purple-500 hover:text-slate-100'
          >Anterior
          </button>
          <div className='flex gap-2 items-center place-content-center'>
            {countPagesData.map(page => {
              return (
                <button
                  key={page}
                  onClick={() => { setCurrentPageData(page) }}
                  className={`${page === currentPageData ? 'bg-purple-500 text-slate-100 border-purple-500 ' : 'text-purple-500 '}w-10 h-10 rounded-md  border-2 hover:border-purple-500 font-semibold hover:bg-purple-500 hover:text-slate-100`}
                >
                  {page}
                </button>
              )
            })}
          </div>
          <button
            onClick={handleNextPage}
            className='bg-slate-100 p-2 rounded-md text-purple-500 border-2 border-purple-500 font-semibold hover:bg-purple-500 hover:text-slate-100'
          >Siguiente
          </button>
        </footer>
      </Menu>
    </>
  )
}

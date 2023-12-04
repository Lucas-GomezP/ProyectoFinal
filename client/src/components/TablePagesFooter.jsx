/* eslint-disable react/jsx-closing-tag-location */
import { useEffect } from 'react'
import { useShowingData } from '../hooks/useShowingData'

export const TablePagesFooter = ({ isPending, data, updateShowingData }) => {
  const { showingData, countPagesData, currentPageData, handlePrePage, handleNextPage, handleSetCurrentPage } = useShowingData({ data })

  useEffect(() => {
    const newData = showingData
    updateShowingData(newData)
  }, [showingData, updateShowingData])

  return (
    isPending
      ? ''
      : countPagesData
        ? <footer className='flex justify-between py-2'>
          <button
            onClick={handlePrePage}
            className='bg-slate-100 p-2 rounded-md text-purple-500 border-2 border-purple-500 font-semibold hover:bg-purple-500 hover:text-slate-100'
          >Anterior
          </button>
          <div className='flex gap-2 items-center place-content-center'>
            {countPagesData?.map(page => {
              return (
                <button
                  key={page}
                  onClick={() => handleSetCurrentPage(page)}
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
        : <div className='text-center text-red-500 font-bold'>No hay clientes cargados</div>
  )
}

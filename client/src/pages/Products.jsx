/* eslint-disable react/jsx-closing-tag-location */
import { Menu } from '../components/Menu'
import { Loader } from '../components/Loader'
import { useFetch } from '../hooks/useFetch'
import { TablePagesFooter } from '../components/TablePagesFooter'
import { useState } from 'react'

export const Products = () => {
  const { data, isPending } = useFetch({ endpoint: 'products' })
  const [showingData, setShowingData] = useState()

  return (
    <>
      <Menu>
        <h2 className='font-bold text-xl'>Productos</h2>
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
                  <tr key={product.id} className='h-14 border-b text-sm md:text-base border-slate-200 hover:bg-slate-200 hover:cursor-pointer'>
                    <td className='h-14 py-1 pl-2 md:truncate'>{product.name}</td>
                    <td className='h-14 py-1 text-center'>{product.stock}</td>
                    <td className='h-14 py-1 text-ellipsis overflow-hidden hidden md:inline-block'>{product.description}</td>
                    <td className='h-14 py-1 pr-2 text-center'>${product.price}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>}
        <TablePagesFooter isPending={isPending} data={data} updateShowingData={setShowingData} />
      </Menu>
    </>
  )
}

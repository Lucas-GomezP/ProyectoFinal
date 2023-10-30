import { Menu } from '../components/Menu'
import { Loader } from '../components/Loader'
import { useFetch } from '../hooks/useFetch'

export const Products = () => {
  const { data, isPending } = useFetch({ endpoint: 'products' })

  return (
    <>
      <Menu>
        <h2 className='font-bold text-xl'>Productos</h2>
        {isPending
          ? <Loader />
          : data &&
            <table className='table-auto'>
              <thead>
                <tr className=' bg-slate-100 text-slate-500 border-b border-slate-200'>
                  <th className='p-2'>Nombre</th>
                  <th className='p-2'>Stock</th>
                  <th className='p-2 hidden md:block'>Descripcion</th>
                  <th className='p-2'>Precio</th>
                </tr>
              </thead>
              <tbody>
                {data.map((product) => {
                  return (
                    <tr key={product.id} className=' text-clip overflow-hidden border-b border-slate-200 hover:bg-slate-200 hover:cursor-pointer'>
                      <td className='py-1 px-2 truncate'>{product.name}</td>
                      <td className='text-center'>{product.stock}</td>
                      <td className='line-clamp-1 hidden md:block'>{product.description}</td>
                      <td className='text-center'>{product.price}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>}
      </Menu>
    </>
  )
}

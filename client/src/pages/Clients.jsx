/* eslint-disable react/jsx-closing-tag-location */
import { Menu } from '../components/Menu'
import { Loader } from '../components/Loader'
import { useFetch } from '../hooks/useFetch'
import { TablePagesFooter } from '../components/TablePagesFooter'
import { useState } from 'react'

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

  return (
    <>
      <Menu>
        <h2 className='font-bold text-xl'>Clientes</h2>
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
        <TablePagesFooter isPending={isPending} data={data} updateShowingData={setShowingData} />
      </Menu>
    </>
  )
}

/* eslint-disable react/jsx-indent */
import { useState } from 'react'
import { Loader } from '../components/Loader'
import { Menu } from '../components/Menu'
import { useFetch } from '../hooks/useFetch'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

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

export const Dashboard = () => {
  const { data: dataBill, isPending: isPendingBill } = useObtainBills()
  const { data: dataOffer, isPending: isPendingOffer } = useObtainOffer()
  // console.log(dataBill)
  // console.log(isPendingBill)

  return (
    <>
      <Menu>
        <h2 className='font-bold text-2xl mb-4'>Dashboard</h2>
        <div className='flex flex-col gap-10 justify-center'>
          <div className='max-h-96'>
            {isPendingBill ? <Loader /> : <ChartDailyIncome data={dataBill} />}
          </div>
          <div className='max-h-96'>
            {isPendingBill ? <Loader /> : <ChartTypeIncome dataBill={dataBill} />}
          </div>
          <div>
            <hr />
            {isPendingBill ? <Loader /> : <ChartTopProductsServices data={dataBill} />}
          </div>
          <div>
            <hr />
            {isPendingOffer ? <Loader /> : <ControlStock data={dataOffer} />}
          </div>
        </div>
      </Menu>
    </>
  )
}

const paramsDailyIncome = ({ dataBill }) => {
  const labels = []
  const datasets = [
    {
      label: 'Productos',
      data: [],
      backgroundColor: 'rgb(255, 99, 132)'
    }, {
      label: 'Servicios',
      data: [],
      backgroundColor: 'rgb(75, 192, 192)'
    }]

  const datos = {}
  dataBill?.forEach(d => {
    if (d.encabezado.estado !== 1 && d.encabezado.estado !== 2) {
      const fecha = d.encabezado.fecha
      const detalleFactura = d.detalle
      detalleFactura.forEach(detalle => {
        if (fecha in datos) {
          if (detalle.tipo === 'P') {
            datos[fecha][0] += parseInt(detalle.subtotal)
          } else {
            datos[fecha][1] += parseInt(detalle.subtotal)
          }
        } else {
          if (detalle.tipo === 'P') {
            datos[fecha] = [parseInt(detalle.subtotal), 0]
          } else {
            datos[fecha] = [0, parseInt(detalle.subtotal)]
          }
        }
      })
    }
  })

  for (const dato in datos) {
    labels.push(dato)
    datasets[0].data.push(datos[dato][0])
    datasets[1].data.push(datos[dato][1])
  }

  const dataDailyIncome = {
    labels,
    datasets
  }

  const optionsDailyIncome = {
    plugins: {
      title: {
        display: true,
        text: 'Ingresos diarios de productos y servicios'
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  }

  return { dataDailyIncome, optionsDailyIncome }
}

const ChartDailyIncome = ({ data }) => {
  const { dataDailyIncome, optionsDailyIncome } = paramsDailyIncome({ dataBill: data })
  return (
    <>
      <div className='max-h-96 flex flex-col justify-center items-center'>
        <hr className='w-full' />
        <h2 className='text-purple-500 text-xl font-bold'>Ingresos diarios de productos y servicios</h2>
        {dataDailyIncome.labels.length !== 0 ? <Bar options={optionsDailyIncome} data={dataDailyIncome} /> : <p className='text-red-500 font-bold text-center'>No hay facturas pagas aun para realizar el calculo</p>}
      </div>
    </>
  )
}

const paramsTopProductsServices = ({ dataBill }) => {
  const datosProductos = []
  const datosServicios = []
  const datosClientes = []
  dataBill?.forEach(d => {
    if (d.encabezado.estado !== 1 && d.encabezado.estado !== 2) {
      const detalleFactura = d.detalle
      detalleFactura.forEach(detalle => {
        let idx
        if (detalle.tipo === 'P') {
          idx = datosProductos.findIndex(e => e.label === detalle.nombre_oferta)
        } else {
          idx = datosServicios.findIndex(e => e.label === detalle.nombre_oferta)
        }
        if (idx === -1) {
          const dato = {
            label: detalle.nombre_oferta,
            data: {
              recaudado: parseInt(detalle.subtotal) * parseInt(detalle.cantidad),
              vendido: detalle.cantidad,
              facturas: 1
            },
            id: detalle.id_oferta
          }
          if (detalle.tipo === 'P') {
            datosProductos.push(dato)
          } else {
            datosServicios.push(dato)
          }
        } else {
          if (detalle.tipo === 'P') {
            datosProductos[idx].data.recaudado += parseInt(detalle.subtotal) * parseInt(detalle.cantidad)
            datosProductos[idx].data.vendido += parseInt(detalle.cantidad)
            datosProductos[idx].data.facturas += 1
          } else {
            datosServicios[idx].data.recaudado += parseInt(detalle.subtotal)
            datosServicios[idx].data.vendido += parseInt(detalle.cantidad)
            datosServicios[idx].data.facturas += 1
          }
        }
      })
      const nombreCliente = d.encabezado.nombre_cliente + ' ' + d.encabezado.apellido_cliente
      const idxC = datosClientes.findIndex(c => c.nombre === nombreCliente)
      if (idxC === -1) {
        const dato = {
          nombre: nombreCliente,
          data: {
            recaudado: parseInt(d.encabezado.importe_total)
          },
          id: d.encabezado.id_cliente
        }
        datosClientes.push(dato)
      } else {
        datosClientes[idxC].data.recaudado += parseInt(d.encabezado.importe_total)
      }
    }
  })
  const topProducts = datosProductos.sort((a, b) => b.data.recaudado - a.data.recaudado).slice(0, 5)
  const topServices = datosServicios.sort((a, b) => b.data.recaudado - a.data.recaudado).slice(0, 5)
  const topClients = datosClientes.sort((a, b) => b.data.recaudado - a.data.recaudado).slice(0, 5)
  return { topProducts, topServices, topClients }
}

const ChartTopProductsServices = ({ data }) => {
  const { topProducts, topServices, topClients } = paramsTopProductsServices({ dataBill: data })
  return (
    <>
      <h2 className='text-purple-500 text-xl font-bold text-center'>Top productos y servicios</h2>
      <h3 className='text-center font-bold text-purple-500 text-lg'>Top Productos</h3>
      {topProducts.length !== 0
        ? <div className='flex gap-2 lg:flex-row flex-wrap justify-evenly bg-purple-100 p-2 rounded-md'>
          {topProducts.map((p, i) => {
            return (
              <div key={p.id} className='bg-slate-100 rounded-md p-2 flex justify-center items-center gap-2 w-fit border-2 border-purple-500'>
                <h3 className='text-purple-500 font-bold'><i>TOP {i + 1}</i></h3>
                <div>
                  <p className='font-bold'>{p.label}</p>
                  <p>Total recaudado: ${Math.round(p.data.recaudado * 100) / 100}</p>
                  <p>Cantidad vendida: {p.data.vendido}</p>
                </div>
              </div>
            )
          })}
          </div>
        : <p className='text-red-500 font-bold text-center'>No hay productos pagados aun para realizar el calculo</p>}
      <h3 className='text-center font-bold text-purple-500 text-lg'>Top Servicios</h3>
      {topServices.length !== 0
        ? <div className='flex gap-2 flex-wrap justify-evenly bg-purple-100 p-2 rounded-md'>
          {topServices.map((s, i) => {
            return (
              <div key={s.id} className='bg-slate-100 rounded-md p-2 flex justify-center items-center gap-2 border-2 border-purple-500'>
                <h3 className='text-purple-500 font-bold'><i>TOP {i + 1}</i></h3>
                <div>
                  <p className='font-bold'>{s.label}</p>
                  <p>Total recaudado: ${Math.round(s.data.recaudado * 100) / 100}</p>
                  <p>Cantidad vendida: {s.data.vendido}</p>
                </div>
              </div>
            )
          })}
          </div>
        : <p className='text-red-500 font-bold text-center'>No hay servicios pagados aun para realizar el calculo</p>}
      <h3 className='text-center font-bold text-purple-500 text-lg'>Top Clientes</h3>
      {topClients.length !== 0
        ? <div className='flex gap-2 flex-wrap justify-evenly bg-purple-100 p-2 rounded-md'>
          {topClients.map((c, i) => {
            return (
              <div key={c.id} className='bg-slate-100 rounded-md p-2 flex justify-center items-center gap-2 border-2 border-purple-500'>
                <h3 className='text-purple-500 font-bold'><i>TOP {i + 1}</i></h3>
                <div>
                  <p className='font-bold'>{c.nombre}</p>
                  <p>Total comprado: ${Math.round(c.data.recaudado * 100) / 100}</p>
                </div>
              </div>
            )
          })}
          </div>
        : <p className='text-red-500 font-bold text-center'>No hay facturas pagadas aun para realizar el calculo</p>}
    </>
  )
}

const ControlStock = ({ data }) => {
  const [minStock, setMinStock] = useState(0)
  const handleMinStock = (event) => {
    setMinStock(event.target.value)
  }
  return (
    <>
      <h2 className='text-purple-500 text-xl font-bold text-center'>Control de stock</h2>
      <label htmlFor='min-stock' className='font-bold text-purple-500 flex justify-center items-center gap-4 mb-2'>Stock Minimo:
        <input
          onChange={() => handleMinStock(event)}
          min={0}
          id='min-stock'
          value={minStock}
          type='number'
          className='border-2 p-1 border-purple-500 rounded-md font-normal'
        />
      </label>
      <table className='w-full p-2'>
        <thead>
          <tr className='bg-slate-100'>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Tipo</th>
            <th className='p-2'>Stock</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(d => {
            if (d.stock <= minStock) {
              return (
                <tr key={d.id_oferta} className='border-b'>
                  <td className='text-center'>{d.nombre}</td>
                  <td className='text-center'>{d.tipo}</td>
                  <td className='text-center'>{d.stock}</td>
                </tr>
              )
            }
            return null
          })}
        </tbody>
      </table>
    </>
  )
}

const ChartTypeIncome = ({ dataBill }) => {
  const data = [0, 0, 0]
  dataBill?.forEach(d => {
    const encabezado = d.encabezado
    if (encabezado.estado === 3) {
      data[0] += parseInt(encabezado.importe_total)
    } else if (encabezado.estado === 4) {
      data[1] += parseInt(encabezado.importe_total)
    } else if (encabezado.estado === 5) {
      data[2] += parseInt(encabezado.importe_total)
    }
  })
  const dataPie = {
    labels: ['Efectivo', 'Debito', 'Cheque'],
    datasets: [
      {
        label: 'Ingresado: $',
        data,
        backgroundColor: [
          'rgb(75, 192, 192)',
          'rgb(255, 99, 132)',
          'rgb(53, 162, 235)'
        ]
      }
    ]
  }
  console.log(dataBill)
  return (
    <>
      <div className='max-h-96 flex flex-col justify-center items-center'>
        <hr className='w-full' />
        <h2 className='text-purple-500 text-xl font-bold'>Tipo de ingreso por compra</h2>
        <Pie data={dataPie} />
      </div>
    </>
  )
}

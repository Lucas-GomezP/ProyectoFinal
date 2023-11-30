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
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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
  const { data: dataBill, isPending: isPendingBill, error: errorBill } = useObtainBills()
  const { data: dataOffer, isPending: isPendingOffer, error: errorOffer } = useObtainOffer()
  // console.log(dataBill)
  // console.log(isPendingBill)

  return (
    <>
      <Menu>Dashboard
        <div className='max-h-96'>
          {isPendingBill ? <Loader /> : <ChartDailyIncome data={dataBill} />}
        </div>
        <div>
          {isPendingBill ? <Loader /> : <ChartTopProductsServices data={dataBill} />}
        </div>
        <div>
          {isPendingOffer ? <Loader /> : <ControlStock data={dataOffer} />}
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
      <h2>Ingresos diarios de productos y servicios</h2>
      <Bar options={optionsDailyIncome} data={dataDailyIncome} />
    </>
  )
}

// const paramsTopProductsServices = ({ dataBill }) => {
//   const labels = ['Top 1', 'Top 2', 'Top 3', 'Top 5', 'Top 5']
//   const datos = []
//   dataBill?.forEach(d => {
//     const detalleFactura = d.detalle
//     detalleFactura.forEach(detalle => {
//       const idx = datos.findIndex(e => e.label === detalle.nombre_oferta)
//       if (idx === -1) {
//         const dato = {
//           label: detalle.nombre_oferta,
//           data: [parseInt(detalle.subtotal)],
//           backgroundColor: detalle.tipo === 'P' ? 'rgb(255, 99, 132)' : 'rgb(75, 192, 192)'
//         }
//         datos.push(dato)
//       } else {
//         datos[idx].data[0] += parseInt(detalle.subtotal)
//       }
//     })
//   })
//   const datasets = datos.sort((a, b) => b.data[0] - a.data[0]).slice(0, 5)
//   datasets.forEach((d, i) => {
//     const base = [0, 0, 0, 0, 0]
//     base[i] = d.data[0]
//     d.data = base
//   })

//   const dataTopProductsServices = {
//     labels,
//     datasets
//   }

//   const optionsTopProductsServices = {
//     indexAxis: 'y',
//     responsive: true,
//     plugins: {
//       legend: null,
//       title: {
//         display: true,
//         text: 'Top 5 productos y servicios por recaudacion'
//       }
//     }
//   }

//   return { dataTopProductsServices, optionsTopProductsServices }
// }

const paramsTopProductsServices = ({ dataBill }) => {
  const datosProductos = []
  const datosServicios = []
  dataBill?.forEach(d => {
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
            recaudado: detalle.subtotal,
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
          datosProductos[idx].data.recaudado += parseInt(detalle.subtotal)
          datosProductos[idx].data.vendido += parseInt(detalle.cantidad)
          datosProductos[idx].data.facturas += 1
        } else {
          datosServicios[idx].data.recaudado += parseInt(detalle.subtotal)
          datosServicios[idx].data.vendido += parseInt(detalle.cantidad)
          datosServicios[idx].data.facturas += 1
        }
      }
    })
  })

  const topProducts = datosProductos.sort((a, b) => b.data.recaudado - a.data.recaudado).slice(0, 5)
  const topServices = datosServicios.sort((a, b) => b.data.recaudado - a.data.recaudado).slice(0, 5)
  return { topProducts, topServices }
}
const ChartTopProductsServices = ({ data }) => {
  const { topProducts, topServices } = paramsTopProductsServices({ dataBill: data })
  return (
    <>
      <h2>Top productos y servicios</h2>
      <h3 className='text-center font-bold text-purple-500 text-lg'>Top Productos</h3>
      <div className='flex gap-2 lg:flex-row flex-wrap justify-evenly bg-purple-100 p-2 rounded-md'>
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
      <h3 className='text-center font-bold text-purple-500 text-lg'>Top Servicios</h3>
      <div className='flex gap-2 flex-wrap justify-evenly bg-purple-100 p-2 rounded-md'>
        {topServices.map((p, i) => {
          return (
            <div key={p.id} className='bg-slate-100 rounded-md p-2 flex justify-center items-center gap-2 border-2 border-purple-500'>
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
    </>
  )
}

const ControlStock = ({ data }) => {
  console.log(data)
  return (
    <>
      <h2>Control de stock</h2>

    </>
  )
}

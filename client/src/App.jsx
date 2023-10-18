import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch('http://localhost:4500/prueba')
    .then(res => res.json())
    .then(dat => {
      setData(dat)
      console.log(dat)
    })
  },[])

  return (
    <>
      {
        (typeof data.members === 'undefined')
        ? (<p>Cargando</p>)
        : (data.members.map((member, i) => (
          <p key={i}>{member}</p>
          )
        ))
      }
    </>
  )
}

export default App

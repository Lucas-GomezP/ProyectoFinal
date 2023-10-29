import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../routes/apiUrl'

// export const useFetch = ({ endpoint }) => {
//   const [data, setData] = useState()

//   useEffect(() => {
//     fetch(API_BASE_URL + endpoint)
//       .then(res => res.json())
//       .then(res => { setData(res) })
//   }, [endpoint])
//   return { data }
// }
export const useFetch = ({ endpoint }) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true)
      try {
        const response = await fetch(API_BASE_URL + endpoint)
        if (!response.ok) throw new Error(response.statusText)
        const json = await response.json()
        setIsPending(false)
        setData(json)
        setError(null)
      } catch (error) {
        setError(`${error} Could not Fetch Data `)
        setIsPending(false)
      }
    }
    fetchData()
  }, [endpoint])
  return { data, isPending, error }
}

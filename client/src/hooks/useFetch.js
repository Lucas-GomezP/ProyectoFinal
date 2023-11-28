/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../routes/apiUrl'

export const useFetch = ({ endpoint, requestOptions, body = {} }) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true)
      try {
        let response
        if (body) {
          response = await fetch(API_BASE_URL + endpoint, requestOptions, body)
        } else {
          response = await fetch(API_BASE_URL + endpoint, requestOptions)
        }
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

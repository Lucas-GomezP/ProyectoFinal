/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../routes/apiUrl'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const useFetch = ({ endpoint, requestOptions, body = {} }) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
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
        if (error.message === 'UNAUTHORIZED') {
          toast.success('sesion expirada')
          localStorage.clear()
          return navigate('/')
        }
      }
    }
    fetchData()
  }, [endpoint])
  return { data, isPending, error }
}

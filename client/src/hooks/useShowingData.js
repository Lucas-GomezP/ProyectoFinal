import { useState, useEffect } from 'react'

export const useShowingData = ({ data }) => {
  const [showingData, setShowingData] = useState()
  const [countPagesData, setCountPagesData] = useState([0])
  const [currentPageData, setCurrentPageData] = useState(1)

  const handlePrePage = () => {
    if (currentPageData > 1) {
      const newCurrentPage = currentPageData - 1
      setCurrentPageData(newCurrentPage)
    }
  }

  const handleNextPage = () => {
    if (currentPageData < countPagesData.length) {
      const newCurrentPage = currentPageData + 1
      setCurrentPageData(newCurrentPage)
    }
  }

  const handleSetCurrentPage = (page) => { setCurrentPageData(page) }

  useEffect(() => {
    if (!data) return

    const endData = 10 * currentPageData
    const startData = endData - 10

    const newData = data.slice(startData, endData)

    const newCountPages = Array.from({ length: Math.floor(data.length / 10) + 1 }, (_, i) => i + 1)

    setShowingData(newData)
    setCountPagesData(newCountPages)
  }, [data, currentPageData])

  return { showingData, countPagesData, currentPageData, handlePrePage, handleNextPage, handleSetCurrentPage }
}

import { useState, useEffect } from 'react'


export const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setData(data)
      } catch (error) {
        throw new Error(`Failed to fetch data: ${error}`)
      }
    }

    fetchData()
  }, [url])

  return data
}

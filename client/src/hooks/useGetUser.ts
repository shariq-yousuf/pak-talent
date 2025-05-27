import { useEffect, useState } from 'react'
import type { User } from '../types'

const useGetUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/users/me', {
          method: 'GET',
          credentials: 'include',
        })
        if (!response.ok) {
          setUser(null)
        } else {
          const {
            data: { user },
          } = await response.json()
          setUser(user)
        }
      } catch (error) {
        setUser(null)
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { user, loading }
}

export default useGetUser

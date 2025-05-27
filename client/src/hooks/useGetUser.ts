import { useEffect, useState } from 'react'
import type { User } from '../types'

const useGetUser = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/users/me', {
          method: 'GET',
          credentials: 'include',
        })
        if (!response.ok) {
          throw new Error('Failed to fetch user')
        }

        const {
          data: { user },
        } = await response.json()

        setUser(user)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    fetchUser()
  })

  return user
}

export default useGetUser

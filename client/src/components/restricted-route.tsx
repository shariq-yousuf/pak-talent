import useGetUser from '@/hooks/useGetUser'
import { useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router'

const RestrictedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useGetUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user) {
      navigate('/')
    }
  }, [user, loading])

  if (loading) return <div>Loading...</div>

  return <>{children}</>
}

export default RestrictedRoute

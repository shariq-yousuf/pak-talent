import useGetUser from '@/hooks/useGetUser'
import { useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useGetUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading])

  if (loading || !user) return <div>Loading...</div>

  return <>{children}</>
}

export default ProtectedRoute

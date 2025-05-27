import useGetUser from '@/hooks/useGetUser'
import { useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useGetUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
  }, [user])

  return <>{children}</>
}

export default ProtectedRoute

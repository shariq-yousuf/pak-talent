import { Button } from '@/components/ui/button'
import useGetUser from '@/hooks/useGetUser'
import { useNavigate } from 'react-router'

const Profile = () => {
  const user = useGetUser()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/users/signout', {
        method: 'POST',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to sign out')
      }

      navigate('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <main className="mx-auto my-6 max-w-7xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Profile</h1>

      {user ? (
        <div className="space-y-4">
          <p>
            <strong>Name:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      ) : (
        <p className="text-gray-500">Loading user information...</p>
      )}

      <form onSubmit={handleSubmit} className="mt-6">
        <Button type="submit" className="cursor-pointer">
          Sign Out
        </Button>
      </form>
    </main>
  )
}

export default Profile

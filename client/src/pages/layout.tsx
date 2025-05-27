import { Button } from '@/components/ui/button'
import useGetUser from '@/hooks/useGetUser'
import { Link, Outlet } from 'react-router'

const Layout = () => {
  const { user } = useGetUser()

  return (
    <>
      <nav className="flex justify-between bg-slate-800 px-6 py-2">
        <Link to="/" className="text-xl font-semibold text-slate-300">
          PakHunt
        </Link>

        {user ? (
          <Link to={'/profile'}>
            <Button variant="outline" className="cursor-pointer text-slate-300">
              Profile
            </Button>
          </Link>
        ) : (
          <Link to={'/login'}>
            <Button variant="outline" className="cursor-pointer text-slate-300">
              Login
            </Button>
          </Link>
        )}
      </nav>

      <Outlet />
    </>
  )
}

export default Layout

import { Button } from '@/components/ui/button'
import { Link, Outlet } from 'react-router'

const Layout = () => {
  return (
    <>
      <nav className="flex justify-between bg-slate-800 px-6 py-2">
        <Link to="/" className="text-xl font-semibold text-slate-300">
          PakHunt
        </Link>

        <Link to={'/profile'}>
          <Button variant="outline" className="cursor-pointer text-slate-300">
            Profile
          </Button>
        </Link>
      </nav>

      <Outlet />
    </>
  )
}

export default Layout

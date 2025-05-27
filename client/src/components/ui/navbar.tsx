import useGetUser from '@/hooks/useGetUser'
import { Link } from 'react-router-dom'
import { Button } from './button'

const Navbar = () => {
  const { user } = useGetUser()

  return (
    <nav className="flex justify-between bg-[#171717] px-6 py-2">
      <Link to="/" className="text-xl font-semibold text-slate-300 italic">
        Pak Talent
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
  )
}

export default Navbar

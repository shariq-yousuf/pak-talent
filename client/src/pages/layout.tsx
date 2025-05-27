import Navbar from '@/components/ui/navbar'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Layout

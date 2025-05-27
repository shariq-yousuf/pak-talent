import EmployerScreen from '@/components/screens/employer-screen'
import CandidateScreen from '../components/screens/candidate-screen'
import HomeScreen from '../components/screens/home-screen'
import useGetUser from '../hooks/useGetUser'

function Home() {
  const { user } = useGetUser()

  const screen = {
    admin: <div>Admin Screen</div>,
    candidate: <CandidateScreen />,
    employer: <EmployerScreen />,
  }

  return !user ? <HomeScreen /> : screen[user.role]
}

export default Home

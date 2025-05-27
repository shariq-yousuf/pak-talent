import HomeScreen from './components/screens/home-screen'
import useGetUser from './hooks/useGetUser'

function App() {
  const user = useGetUser()

  return !user && <HomeScreen />
}

export default App

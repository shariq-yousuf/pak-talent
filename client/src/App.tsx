import { useState } from 'react'
import CandidateScreen from './components/screens/candidate-screen'
import HomeScreen from './components/screens/home-screen'
import { AuthProvider } from './context/auth-context'
import useGetUser from './hooks/useGetUser'

function App() {
  const { user } = useGetUser()
  const [authChanged, setAuthChanged] = useState(Date.now())

  const handleAuthChanged = () => {
    console.log('Auth changed')
    setAuthChanged(Date.now())
  }

  const screen = {
    admin: <div>Admin Screen</div>,
    candidate: <CandidateScreen />,
    employer: <div>Employer Screen</div>,
  }

  return (
    <AuthProvider value={{ authChanged, handleAuthChanged }}>
      {!user ? <HomeScreen /> : screen[user.role]}
    </AuthProvider>
  )
}

export default App

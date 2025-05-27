import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import ProtectedRoute from './components/protected-route'
import RestrictedRoute from './components/restricted-route'
import { AuthProvider } from './context/auth-context'
import Apply from './pages/apply'
import Home from './pages/home'
import Layout from './pages/layout'
import Login from './pages/login'
import Profile from './pages/profile'
import Signup from './pages/signup'
import AddJob from './pages/add-job'

function App() {
  const [authChanged, setAuthChanged] = useState(Date.now())

  const handleAuthChanged = () => {
    setAuthChanged(Date.now())
  }

  return (
    <AuthProvider value={{ authChanged, handleAuthChanged }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="signup"
              element={
                <RestrictedRoute>
                  <Signup />
                </RestrictedRoute>
              }
            />
            <Route
              path="login"
              element={
                <RestrictedRoute>
                  <Login />
                </RestrictedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="apply/:jobId"
              element={
                <ProtectedRoute>
                  <Apply />
                </ProtectedRoute>
              }
            />
            <Route
              path="add-job"
              element={
                <ProtectedRoute>
                  <AddJob />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

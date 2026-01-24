import './App.css'
import { Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './context/authContext'
import { Signup } from './components/signup'
import Signin from './components/signin'
import { Accountpage } from './components/accountpage'
import ProtectedRoute from './components/protectedroute'
import VerifyEmail from './components/verify-email'

function App() {


  return (
    <>
      <h1 className='app-heading'>Firebase Authentication</h1>
      <AuthContextProvider>


        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/accountpage" element={<Accountpage />} />
          </Route>
        </Routes>

      </AuthContextProvider>
    </>
  )
}

export default App

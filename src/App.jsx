import './App.css'
import { Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './context/authContext'
import { Signup } from './components/signup'
import Signin from './components/signin'
import { Accountpage } from './components/accountpage'
import ProtectedRoute from './components/protectedroute'
import VerifyEmail from './components/verify-email'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'

function App() {


  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/accountpage" element={<Accountpage />} />
          </Route>
        </Routes>
        <Footer />
      </AuthContextProvider>
    </>
  )
}

export default App

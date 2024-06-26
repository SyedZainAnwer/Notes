import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProtectedRoutes from './components/ProtectedRoutes';

const Logout = () => {
  localStorage.clear();
  return <Navigate to="/login" />
}

const RegisterAndLogout = () => {
  localStorage.clear();
  return <Register />
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />

        <Route path="/login" element={<Login />}/>
        <Route path="/login" element={<Logout />}/>
        <Route path="/register" element={<RegisterAndLogout />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

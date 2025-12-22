import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
 import './index.css'
import App from './App.jsx'
import UserForm from './components/UserForm.jsx';
import Dashboard from './pages/Dashboard.jsx'
import EditUser from './components/EditUser.jsx';
import CreateUser from './components/CreateUser.jsx' 
import LoginUser from './components/LoginUser.jsx'
createRoot(document.getElementById('root')).render(
  
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      {/* <Route path='/' element={<App />} /> */}
      <Route path='/createUser' element={<CreateUser />} />
      <Route path='/createUser' element={<UserForm />} />
      <Route path='*' element={<h2 className="text-3xl font-bold text-red-600 p-5">404: Page Not Found</h2>} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/' element={<Dashboard />} />
      <Route path='/editUser/:id' element={<EditUser />} />
      <Route path='/login' element={<LoginUser />} />
    </Routes>
  </BrowserRouter>      
    
  // </StrictMode>,
)

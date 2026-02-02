import './App.css'
import { createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'


const DefualtRoute = () => {
  const authData = JSON.parse(localStorage.getItem('authData'));
  if(authData){
    return <Navigate to="/Login" replace/>
  }
  return <Navigate to="/Register" replace/>
}
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DefualtRoute />
    },
    {
      path:'/Login',
      element:<Login />
    },
    {
      path: '/Register',
      element:<Register/>
    }
  ])
  return <RouterProvider router={router}/>
}

export default App
